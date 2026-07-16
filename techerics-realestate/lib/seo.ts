// ============================================================
// AUTO-SEO ENGINE
// Har property/city/locality page ke liye JSON-LD schema aur
// meta tags automatically generate karta hai — agent ko manually
// kuch nahi karna padta, bas property data save hote hi ye
// function chal jaata hai (Prisma hook / API route se call hoga).
// ============================================================

import type { Property, City, Locality, Media, Agent } from "@prisma/client";

type FullProperty = Property & {
  city: City;
  locality: Locality;
  media: Media[];
  agent: Agent | null;
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://techerics.com";

/**
 * Generates schema.org RealEstateListing + Offer + PostalAddress + GeoCoordinates
 * JSON-LD for a single property page.
 */
export function generatePropertySchema(
  p: FullProperty,
  price: number,
  currency: string,
  purpose: "SALE" | "RENT"
) {
  const images = p.media.filter((m) => m.type === "PHOTO").map((m) => m.url);
  const videos = p.media.filter((m) => m.type === "VIDEO" || m.type === "TOUR_360");

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: p.title,
    description: p.description,
    url: `${SITE_URL}/property/${p.slug}`,
    datePosted: p.createdAt.toISOString(),
    image: images,
    address: {
      "@type": "PostalAddress",
      streetAddress: p.addressLine ?? undefined,
      addressLocality: p.locality.name,
      addressRegion: p.city.name,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: p.latitude,
      longitude: p.longitude,
    },
    offers: {
      "@type": "Offer",
      price,
      priceCurrency: currency,
      availability:
        purpose === "RENT"
          ? "https://schema.org/InStock"
          : "https://schema.org/InStock",
      businessFunction:
        purpose === "RENT" ? "https://schema.org/LeaseOut" : "https://schema.org/Sell",
    },
    numberOfRooms: p.bedrooms ?? undefined,
    floorSize: p.areaSqft
      ? { "@type": "QuantitativeValue", value: p.areaSqft, unitCode: "FTK" }
      : undefined,
  };

  if (videos.length) {
    schema.video = videos.map((v) => ({
      "@type": "VideoObject",
      name: `${p.title} - Video Tour`,
      contentUrl: v.url,
      thumbnailUrl: images[0],
      uploadDate: p.createdAt.toISOString(),
    }));
  }

  if (p.agent) {
    schema.provider = {
      "@type": "RealEstateAgent",
      name: p.agent.name,
      telephone: p.agent.phone,
    };
  }

  return schema;
}

/** Breadcrumb schema — Home > City > Locality > Property */
export function generateBreadcrumbSchema(p: FullProperty) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: p.city.name,
        item: `${SITE_URL}/${p.city.slug}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: p.locality.name,
        item: `${SITE_URL}/${p.city.slug}/${p.locality.slug}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: p.title,
        item: `${SITE_URL}/property/${p.slug}`,
      },
    ],
  };
}

/** Auto meta title/description — used as fallback if AI-generated copy isn't set yet */
export function generateMeta(p: FullProperty, price: number, currency: string) {
  const priceFmt = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);

  const title = `${p.bedrooms ? p.bedrooms + " BHK " : ""}${p.propertyType.replace(
    "_",
    " "
  )} in ${p.locality.name}, ${p.city.name} — ${priceFmt} | Tech Erics`;

  const description = `${p.title} in ${p.locality.name}, ${p.city.name}. ${
    p.areaSqft ? p.areaSqft + " sqft. " : ""
  }View photos, 360° tour, price & contact details. ${priceFmt}.`;

  return {
    title: title.slice(0, 60),
    description: description.slice(0, 160),
  };
}

/** Auto alt-text generator for property images (image SEO) */
export function generateImageAlt(p: FullProperty, index: number) {
  return `${p.title} - ${p.locality.name} ${p.city.name} - Photo ${index + 1}`;
}
