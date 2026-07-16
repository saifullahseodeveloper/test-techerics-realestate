import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { generatePropertySeoContent, generateAltTextBatch } from "@/lib/ai-seo-writer";
import { generatePropertySchema, generateBreadcrumbSchema } from "@/lib/seo";
import { publishPropertyReel, publishPropertyPhoto } from "@/lib/instagram";

// ============================================================
// This is the heart of the "auto-SEO" system: agent just fills raw
// property facts in the admin dashboard, hits Save, and this route
// does everything an SEO expert would do manually:
//  1. AI-writes unique title/description/meta tags
//  2. Generates URL slug
//  3. Pre-builds & caches JSON-LD schema
//  4. Auto-generates image alt text for every uploaded photo
//  5. Marks the city/locality pages for revalidation
// ============================================================

function slugify(title: string, locality: string, city: string, id: string) {
  const base = `${title}-${locality}-${city}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return `${base}-${id.slice(-6)}`;
}

export async function POST(req: Request) {
  const input = await req.json();

  const city = await prisma.city.findUnique({ where: { id: input.cityId } });
  const locality = await prisma.locality.findUnique({ where: { id: input.localityId } });
  if (!city || !locality) {
    return NextResponse.json({ error: "Invalid city/locality" }, { status: 400 });
  }

  // 1) AI-generated SEO content — agent doesn't write a single SEO word
  const seo = await generatePropertySeoContent({
    propertyType: input.propertyType,
    bedrooms: input.bedrooms,
    bathrooms: input.bathrooms,
    areaSqft: input.areaSqft,
    cityName: city.name,
    localityName: locality.name,
    amenities: input.amenities ?? [],
    rawNotes: input.rawNotes ?? "",
  });

  const tempId = crypto.randomUUID();
  const slug = slugify(seo.title, locality.name, city.name, tempId);

  // 2) Create property with AI-written content
  const property = await prisma.property.create({
    data: {
      slug,
      title: seo.title,
      description: seo.description,
      metaTitle: seo.metaTitle,
      metaDescription: seo.metaDescription,
      propertyType: input.propertyType,
      bedrooms: input.bedrooms,
      bathrooms: input.bathrooms,
      areaSqft: input.areaSqft,
      cityId: city.id,
      localityId: locality.id,
      addressLine: input.addressLine,
      latitude: input.latitude,
      longitude: input.longitude,
      agentId: input.agentId,
    },
    include: { city: true, locality: true, media: true, agent: true },
  });

  // 3) Auto alt-text for every uploaded photo, then bulk-create Media rows
  if (input.photoUrls?.length) {
    const altTexts = await generateAltTextBatch(
      property.title,
      locality.name,
      city.name,
      input.photoUrls.length
    );
    await prisma.media.createMany({
      data: input.photoUrls.map((url: string, i: number) => ({
        propertyId: property.id,
        type: "PHOTO" as const,
        url,
        altText: altTexts[i],
        order: i,
      })),
    });
  }

  // 4) Create the initial listing (price/status)
  await prisma.listing.create({
    data: {
      propertyId: property.id,
      purpose: input.purpose ?? "SALE",
      price: input.price,
      currency: input.currency ?? "INR",
    },
  });

  // 5) Pre-generate & cache JSON-LD (avoids recomputation on every page view)
  const fullProperty = await prisma.property.findUniqueOrThrow({
    where: { id: property.id },
    include: { city: true, locality: true, media: true, agent: true },
  });
  const schema = generatePropertySchema(fullProperty, Number(input.price), input.currency ?? "INR", input.purpose ?? "SALE");
  const breadcrumb = generateBreadcrumbSchema(fullProperty);
  await prisma.property.update({
    where: { id: property.id },
    data: { schemaJsonLd: JSON.stringify({ schema, breadcrumb }) },
  });

  // 6) Auto-post to Instagram — fire-and-forget (never blocks or fails the
  // property save; Instagram publishing is a nice-to-have marketing channel,
  // not core functionality). A Reel is preferred (better organic reach);
  // falls back to a single photo post if no reel was uploaded.
  const priceLabel = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: input.currency ?? "INR",
    maximumFractionDigits: 0,
  }).format(Number(input.price));

  const reelUrl = input.videoUrls?.find((v: { kind: string }) => v.kind === "reel")?.url;
  const firstPhoto = input.photoUrls?.[0];

  if (reelUrl) {
    publishPropertyReel({
      videoUrl: reelUrl,
      coverImageUrl: firstPhoto,
      propertyTitle: property.title,
      locality: locality.name,
      city: city.name,
      price: priceLabel,
    }).catch((err) => console.error("Instagram reel auto-post failed:", err));
  } else if (firstPhoto) {
    publishPropertyPhoto({
      imageUrl: firstPhoto,
      propertyTitle: property.title,
      locality: locality.name,
      city: city.name,
      price: priceLabel,
    }).catch((err) => console.error("Instagram photo auto-post failed:", err));
  }

  return NextResponse.json({ success: true, slug: property.slug });
}
