const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://techerics.com";

/**
 * Global Schema component — Injects Google Knowledge Graph Organization schema
 * and Google Sitelinks SearchBox WebSite schema into the layout.
 */
export default function GlobalSchema() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Tech Erics",
    url: SITE_URL,
    description: "Enterprise Global Real Estate Portal — Verified Luxury Listings, 360° Virtual Tours, and Direct Developer Masterplans.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/en/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Tech Erics Real Estate",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
    telephone: "+91 98765 43210",
    email: "concierge@techerics.com",
    priceRange: "$$$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Tech Erics Tower, BKC",
      addressLocality: "Mumbai",
      addressRegion: "Maharashtra",
      postalCode: "400051",
      addressCountry: "IN",
    },
    sameAs: [
      "https://facebook.com/techerics",
      "https://instagram.com/techerics",
      "https://linkedin.com/company/techerics",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
    </>
  );
}
