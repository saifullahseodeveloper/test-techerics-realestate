import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { GLOBAL_COUNTRIES, GLOBAL_CITIES } from "@/lib/global-locations";
import { PropertyType, ListingPurpose } from "@prisma/client";
import { generatePropertySchema, generateBreadcrumbSchema } from "@/lib/seo";

const ALL_PROPERTY_TYPES: PropertyType[] = [
  "APARTMENT",
  "VILLA",
  "TOWNHOUSE",
  "PENTHOUSE",
  "STUDIO",
  "COMMERCIAL_OFFICE",
  "COMMERCIAL_SHOP",
  "WAREHOUSE",
  "PLOT",
  "INDEPENDENT_HOUSE",
];

const SAMPLE_IMAGES = [
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
];

export async function POST() {
  try {
    // 1) Delete all old properties cleanly
    await prisma.aiOptimizationAudit.deleteMany({});
    await prisma.media.deleteMany({});
    await prisma.listing.deleteMany({});
    await prisma.propertyAmenity.deleteMany({});
    await prisma.propertyTranslation.deleteMany({});
    await prisma.property.deleteMany({});

    let createdCount = 0;

    // 2) Seed Countries & Cities
    for (const cData of GLOBAL_COUNTRIES) {
      const country = await prisma.country.upsert({
        where: { code: cData.code },
        update: { name: cData.name, slug: cData.slug },
        create: { code: cData.code, slug: cData.slug, name: cData.name, defaultCurrency: cData.currency, currencySymbol: cData.symbol },
      });

      const region = await prisma.region.upsert({
        where: { countryId_slug: { countryId: country.id, slug: cData.slug } },
        update: {},
        create: { name: `${cData.name} Region`, slug: cData.slug, countryId: country.id },
      });

      const matchingCities = GLOBAL_CITIES.filter((city) => city.countryCode === cData.code);
      const citiesToProcess = matchingCities.length ? matchingCities : [
        {
          name: `${cData.name} Capital`,
          slug: `${cData.slug}-capital`,
          countryCode: cData.code,
          countryName: cData.name,
          regionName: "Capital Region",
          latitude: 25.0,
          longitude: 55.0,
          popularLocalities: ["Downtown Central", "Marina Bay", "Financial District"],
          seoDescription: `Explore prime real estate in ${cData.name}.`,
        },
      ];

      for (const cityItem of citiesToProcess) {
        const city = await prisma.city.upsert({
          where: { slug: cityItem.slug },
          update: { seoContent: cityItem.seoDescription },
          create: {
            name: cityItem.name,
            slug: cityItem.slug,
            regionId: region.id,
            latitude: cityItem.latitude,
            longitude: cityItem.longitude,
            seoContent: cityItem.seoDescription,
          },
        });

        let primaryLocality = null;

        for (const locName of cityItem.popularLocalities) {
          const locSlug = locName.toLowerCase().replace(/\s+/g, "-");
          const locality = await prisma.locality.upsert({
            where: { cityId_slug: { cityId: city.id, slug: locSlug } },
            update: {},
            create: { name: locName, slug: locSlug, cityId: city.id, avgPricePerSqft: 15000 },
          });

          if (!primaryLocality) primaryLocality = locality;
        }

        if (!primaryLocality) continue;

        // 3) Create ONE property for EVERY PropertyType in this Country & City
        for (let pIdx = 0; pIdx < ALL_PROPERTY_TYPES.length; pIdx++) {
          const type = ALL_PROPERTY_TYPES[pIdx];
          const isRent = type === "STUDIO" || type === "COMMERCIAL_OFFICE" || type === "WAREHOUSE";
          const purpose: ListingPurpose = isRent ? "RENT" : "SALE";
          const bedrooms = type === "PLOT" || type === "COMMERCIAL_OFFICE" || type === "COMMERCIAL_SHOP" || type === "WAREHOUSE" ? null : (pIdx % 4) + 1;
          const bathrooms = bedrooms ? bedrooms : null;
          const areaSqft = (pIdx + 1) * 650;
          const price = isRent ? 150000 : (pIdx + 1) * 12500000;

          const typeFormatted = type.replace(/_/g, " ").toLowerCase();
          const title = `[DEMO] Luxury ${type.replace(/_/g, " ")} in ${primaryLocality.name}, ${city.name}`;
          const slug = `${typeFormatted}-${primaryLocality.slug}-${city.slug}-${cData.slug}-demo-${pIdx + 1}`;

          const property = await prisma.property.create({
            data: {
              slug,
              title,
              description: `Official verified ${typeFormatted} located in ${primaryLocality.name}, ${city.name}, ${cData.name}. Designed with high-end architecture, panoramic city views, and 24/7 security concierge. Ideal for buyers and real estate investors targeting prime yields.`,
              propertyType: type,
              bedrooms,
              bathrooms,
              areaSqft,
              walkScore: 88,
              transitScore: 82,
              schoolScore: 90,
              countryId: country.id,
              cityId: city.id,
              localityId: primaryLocality.id,
              addressLine: `${primaryLocality.name}, ${city.name}`,
              latitude: city.latitude || 19.076,
              longitude: city.longitude || 72.8777,
              metaTitle: `${title} | Verified Listing`,
              metaDescription: `Explore ${title}. RERA approved with verified price and 360 tour.`,
            },
          });

          await prisma.media.create({
            data: {
              propertyId: property.id,
              type: "PHOTO",
              url: SAMPLE_IMAGES[pIdx % SAMPLE_IMAGES.length],
              altText: title,
              order: 0,
            },
          });

          await prisma.listing.create({
            data: {
              propertyId: property.id,
              purpose,
              price,
              currency: cData.currency,
            },
          });

          const fullProp = await prisma.property.findUniqueOrThrow({
            where: { id: property.id },
            include: { city: true, locality: true, media: true, agent: true },
          });

          const schema = generatePropertySchema(fullProp, price, cData.currency, purpose);
          const breadcrumb = generateBreadcrumbSchema(fullProp);

          await prisma.property.update({
            where: { id: property.id },
            data: { schemaJsonLd: JSON.stringify({ schema, breadcrumb }) },
          });

          createdCount++;
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: `Cleaned database & seeded ${createdCount} structured properties across ${GLOBAL_COUNTRIES.length} countries for all property types!`,
      createdCount,
    });
  } catch (err: any) {
    console.error("Seed API error:", err);
    return NextResponse.json({ error: err.message || "Failed to seed database" }, { status: 500 });
  }
}
