import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { discoverWebsiteListingUrls, scrapeSinglePropertyUrl } from "@/lib/scraper";
import { generatePropertySeoContent, generateAltTextBatch } from "@/lib/ai-seo-writer";
import { generatePropertySchema, generateBreadcrumbSchema } from "@/lib/seo";

function slugify(title: string, locality: string, city: string, id: string) {
  const base = `${title}-${locality}-${city}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return `${base}-${id.slice(-6)}`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { mode, url, urls } = body;

    // ---------------- MODE 1: DISCOVER ALL LISTINGS ON SITE ----------------
    if (mode === "discover") {
      if (!url) {
        return NextResponse.json({ error: "Target URL is required" }, { status: 400 });
      }
      const listingUrls = await discoverWebsiteListingUrls(url);
      return NextResponse.json({ success: true, count: listingUrls.length, urls: listingUrls });
    }

    // ---------------- MODE 2: SCRAPE, AI REWRITE & IMPORT LISTING(S) ----------------
    if (mode === "import") {
      const targetUrls: string[] = urls || (url ? [url] : []);
      if (!targetUrls.length) {
        return NextResponse.json({ error: "At least one URL is required for import" }, { status: 400 });
      }

      const importedProperties = [];

      for (const targetUrl of targetUrls) {
        try {
          // 1) Scrape raw details from URL
          const raw = await scrapeSinglePropertyUrl(targetUrl);

          // 2) Auto-find or create Country, City, Locality in DB
          let country = await prisma.country.findFirst({ where: { code: "IN" } });
          if (!country) {
            country = await prisma.country.create({
              data: { code: "IN", slug: "india", name: "India", defaultCurrency: "INR", currencySymbol: "₹" },
            });
          }

          let city = await prisma.city.findFirst({
            where: { slug: raw.cityName?.toLowerCase().replace(/\s+/g, "-") || "mumbai" },
          });

          if (!city) {
            city = await prisma.city.create({
              data: {
                name: raw.cityName || "Mumbai",
                slug: (raw.cityName || "mumbai").toLowerCase().replace(/\s+/g, "-"),
                latitude: 19.076,
                longitude: 72.8777,
              },
            });
          }

          let locality = await prisma.locality.findFirst({
            where: {
              cityId: city.id,
              slug: (raw.localityName || "bandra-west").toLowerCase().replace(/\s+/g, "-"),
            },
          });

          if (!locality) {
            locality = await prisma.locality.create({
              data: {
                name: raw.localityName || "Bandra West",
                slug: (raw.localityName || "bandra-west").toLowerCase().replace(/\s+/g, "-"),
                cityId: city.id,
                latitude: 19.0544,
                longitude: 72.82,
                avgPricePerSqft: 18500,
              },
            });
          }

          // 3) AI Copyright Protection — Rewrite title, description & meta tags
          const seo = await generatePropertySeoContent({
            propertyType: raw.propertyType || "APARTMENT",
            bedrooms: raw.bedrooms,
            bathrooms: raw.bathrooms,
            areaSqft: raw.areaSqft,
            cityName: city.name,
            localityName: locality.name,
            amenities: raw.amenities,
            rawNotes: `${raw.rawTitle}. ${raw.rawDescription}`,
          });

          const tempId = crypto.randomUUID();
          const slug = slugify(seo.title, locality.name, city.name, tempId);

          // 4) Upsert Property with AI-written text
          const property = await prisma.property.create({
            data: {
              slug,
              title: seo.title,
              description: seo.description,
              metaTitle: seo.metaTitle,
              metaDescription: seo.metaDescription,
              propertyType: (raw.propertyType as any) || "APARTMENT",
              bedrooms: raw.bedrooms,
              bathrooms: raw.bathrooms,
              areaSqft: raw.areaSqft,
              countryId: country.id,
              cityId: city.id,
              localityId: locality.id,
              addressLine: raw.addressLine,
              latitude: raw.latitude || 19.0544,
              longitude: raw.longitude || 72.82,
            },
          });

          // 5) Auto alt-text generation & Media save
          if (raw.photoUrls.length) {
            const altTexts = await generateAltTextBatch(
              property.title,
              locality.name,
              city.name,
              raw.photoUrls.length
            );

            await prisma.media.createMany({
              data: raw.photoUrls.map((photoUrl: string, idx: number) => ({
                propertyId: property.id,
                type: "PHOTO" as const,
                url: photoUrl,
                altText: altTexts[idx] || property.title,
                order: idx,
              })),
            });
          }

          // 6) Create Listing Price entry
          await prisma.listing.create({
            data: {
              propertyId: property.id,
              purpose: raw.purpose || "SALE",
              price: raw.price || 25000000,
              currency: raw.currency || "INR",
            },
          });

          // 7) Pre-cache JSON-LD Schema
          const fullProperty = await prisma.property.findUniqueOrThrow({
            where: { id: property.id },
            include: { city: true, locality: true, media: true, agent: true },
          });

          const schema = generatePropertySchema(fullProperty, Number(raw.price || 25000000), raw.currency || "INR", raw.purpose || "SALE");
          const breadcrumb = generateBreadcrumbSchema(fullProperty);

          await prisma.property.update({
            where: { id: property.id },
            data: { schemaJsonLd: JSON.stringify({ schema, breadcrumb }) },
          });

          importedProperties.push({
            id: property.id,
            slug: property.slug,
            title: property.title,
            sourceUrl: targetUrl,
          });
        } catch (err: any) {
          console.error(`Scrape failed for URL ${targetUrl}:`, err);
        }
      }

      return NextResponse.json({
        success: true,
        importedCount: importedProperties.length,
        properties: importedProperties,
      });
    }

    return NextResponse.json({ error: "Invalid mode specified" }, { status: 400 });
  } catch (err: any) {
    console.error("Scraper API error:", err);
    return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 });
  }
}
