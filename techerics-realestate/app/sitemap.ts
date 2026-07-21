import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db";
import { GLOBAL_CITIES, GLOBAL_COUNTRIES } from "@/lib/global-locations";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://techerics.com";
const LOCALES = ["en", "hi", "ar"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let dbProperties: { slug: string; updatedAt: Date }[] = [];
  let dbCities: { slug: string }[] = [];
  let dbLocalities: { slug: string; city: { slug: string } }[] = [];

  try {
    [dbProperties, dbCities, dbLocalities] = await Promise.all([
      prisma.property.findMany({ select: { slug: true, updatedAt: true } }),
      prisma.city.findMany({ select: { slug: true } }),
      prisma.locality.findMany({
        select: { slug: true, city: { select: { slug: true } } },
      }),
    ]);
  } catch (err) {
    console.error("Sitemap DB fetch fallback:", err);
  }

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    // 1. Homepage for each locale
    entries.push({
      url: `${SITE_URL}/${locale}`,
      changeFrequency: "daily",
      priority: 1.0,
    });

    // 2. Global Countries
    for (const country of GLOBAL_COUNTRIES) {
      entries.push({
        url: `${SITE_URL}/${locale}/search?country=${country.code}`,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }

    // 3. Global Cities (merged DB + predefined)
    const allCitySlugs = Array.from(
      new Set([...dbCities.map((c) => c.slug), ...GLOBAL_CITIES.map((c) => c.slug)])
    );

    for (const slug of allCitySlugs) {
      entries.push({
        url: `${SITE_URL}/${locale}/${slug}`,
        changeFrequency: "daily",
        priority: 0.9,
      });
    }

    // 4. Localities
    for (const l of dbLocalities) {
      entries.push({
        url: `${SITE_URL}/${locale}/${l.city.slug}/${l.slug}`,
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }

    // 5. Properties
    for (const p of dbProperties) {
      entries.push({
        url: `${SITE_URL}/${locale}/property/${p.slug}`,
        lastModified: p.updatedAt,
        changeFrequency: "daily",
        priority: 0.8,
      });
    }
  }

  return entries;
}
