import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db";
import { GLOBAL_CITIES, GLOBAL_COUNTRIES } from "@/lib/global-locations";
import { GLOBAL_MARKETS } from "@/lib/country-data";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://techerics.com";
const LOCALES = ["en", "hi", "ar"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let dbProperties: { slug: string; updatedAt: Date }[] = [];
  let dbCities: { slug: string }[] = [];

  try {
    [dbProperties, dbCities] = await Promise.all([
      prisma.property.findMany({ select: { slug: true, updatedAt: true } }),
      prisma.city.findMany({ select: { slug: true } }),
    ]);
  } catch (err) {
    console.error("Sitemap DB fetch fallback:", err);
  }

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    // 1. Homepage per locale
    entries.push({
      url: `${SITE_URL}/${locale}`,
      changeFrequency: "daily",
      priority: 1.0,
    });

    // 2. Global Countries
    for (const country of GLOBAL_COUNTRIES) {
      const cSlug = country.slug.toLowerCase();
      entries.push({
        url: `${SITE_URL}/${locale}/${cSlug}`,
        changeFrequency: "daily",
        priority: 0.9,
      });

      // 3. Matrix landing pages per country (Apartments, Villas, Offices for sale & rent)
      for (const type of ["apartments", "villas", "offices"]) {
        for (const purpose of ["for-sale", "for-rent"]) {
          entries.push({
            url: `${SITE_URL}/${locale}/${cSlug}/${type}/${purpose}`,
            changeFrequency: "daily",
            priority: 0.8,
          });
        }
      }
    }

    // 4. Global Cities & Permalinks
    const allCitySlugs = Array.from(
      new Set([...dbCities.map((c) => c.slug), ...GLOBAL_CITIES.map((c) => c.slug)])
    );

    for (const slug of allCitySlugs) {
      entries.push({
        url: `${SITE_URL}/${locale}/${slug}`,
        changeFrequency: "daily",
        priority: 0.85,
      });
    }

    // 5. Property & Project Permalinks
    const sampleSlugs = [
      "sunteck-beach-residences",
      "damac-lagoons-nice",
      "palm-jumeirah-penthouse",
      "godrej-horizon-bandra",
      "dlf-the-camellias",
      "manhattan-hudson-yards",
    ];

    const allPropertySlugs = Array.from(
      new Set([...dbProperties.map((p) => p.slug), ...sampleSlugs])
    );

    for (const slug of allPropertySlugs) {
      entries.push({
        url: `${SITE_URL}/${locale}/projects/${slug}`,
        changeFrequency: "daily",
        priority: 0.8,
      });
      entries.push({
        url: `${SITE_URL}/${locale}/property/${slug}`,
        changeFrequency: "daily",
        priority: 0.8,
      });
    }
  }

  return entries;
}
