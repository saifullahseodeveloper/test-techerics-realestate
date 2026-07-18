import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://techerics.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Filtered/duplicate URLs ko crawl budget waste na karne den
        disallow: ["/api/", "/admin/", "/*?*sort=", "/*?*page="],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
