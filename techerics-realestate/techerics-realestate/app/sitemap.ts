import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://techerics.com";
const LOCALES = ["en", "hi", "ar"];

// Next.js is file ko khud /sitemap.xml pe serve karta hai.
// 50,000 URL se zyada hone par Next.js automatically sitemap
// index + chunked sitemaps bana deta hai (Zillow jaisa pattern).
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [properties, cities, localities] = await Promise.all([
    prisma.property.findMany({ select: { slug: true, updatedAt: true } }),
    prisma.city.findMany({ select: { slug: true } }),
    prisma.locality.findMany({
      select: { slug: true, city: { select: { slug: true } } },
    }),
  ]);

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    entries.push({
      url: `${SITE_URL}/${locale}`,
      changeFrequency: "daily",
      priority: 1,
    });

    for (const p of properties) {
      entries.push({
        url: `${SITE_URL}/${locale}/property/${p.slug}`,
        lastModified: p.updatedAt,
        changeFrequency: "daily",
        priority: 0.8,
      });
    }

    for (const c of cities) {
      entries.push({
        url: `${SITE_URL}/${locale}/${c.slug}`,
        changeFrequency: "daily",
        priority: 0.9,
      });
    }

    for (const l of localities) {
      entries.push({
        url: `${SITE_URL}/${locale}/${l.city.slug}/${l.slug}`,
        changeFrequency: "daily",
        priority: 0.7,
      });
    }
  }

  return entries;
}
