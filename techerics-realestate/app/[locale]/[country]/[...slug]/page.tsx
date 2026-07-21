import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCountryMarket, GLOBAL_MARKETS } from "@/lib/country-data";
import { GLOBAL_CITIES, GLOBAL_COUNTRIES } from "@/lib/global-locations";
import PropertyCard from "@/components/PropertyCard";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import EmiCalculator from "@/components/EmiCalculator";
import MapEmbed from "@/components/MapEmbed";

export const revalidate = 60;

type Props = {
  params: Promise<{ locale: string; country: string; slug: string[] }>;
};

/** Normalizes property types from URL slug to standard format */
function parsePropertyType(slugSegment: string): string | null {
  const s = slugSegment.toLowerCase();
  if (s.includes("apartment") || s.includes("flat")) return "Apartment";
  if (s.includes("villa") || s.includes("house")) return "Villa";
  if (s.includes("townhouse")) return "Townhouse";
  if (s.includes("office") || s.includes("commercial")) return "Commercial Office";
  if (s.includes("shop") || s.includes("retail")) return "Commercial Shop";
  if (s.includes("warehouse")) return "Warehouse";
  if (s.includes("penthouse")) return "Penthouse";
  if (s.includes("studio")) return "Studio";
  return null;
}

/** Normalizes listing purpose from URL slug */
function parsePurpose(slugSegment: string): "SALE" | "RENT" | null {
  const s = slugSegment.toLowerCase();
  if (s.includes("sale") || s.includes("buy")) return "SALE";
  if (s.includes("rent") || s.includes("lease")) return "RENT";
  return null;
}

/** Normalizes bedroom count from URL slug */
function parseBedrooms(slugSegment: string): number | null {
  const match = slugSegment.match(/(\d+)-bed/i) || slugSegment.match(/(\d+)-bhk/i) || slugSegment.match(/(\d+)\s*bed/i);
  return match ? parseInt(match[1], 10) : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, country, slug } = await params;
  const countryConfig = getCountryMarket(country.toUpperCase());
  const locationName = slug ? slug[slug.length - 1].replace(/-/g, " ").toUpperCase() : countryConfig.countryName;

  const title = `${locationName} Real Estate & Properties | Tech Erics`;
  const description = `Browse verified luxury apartments, villas, and commercial properties in ${locationName}, ${countryConfig.countryName}. Best prices, zero commission deals & RERA verified listings.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/${country.toLowerCase()}/${slug ? slug.join("/") : ""}`,
      languages: {
        en: `/en/${country.toLowerCase()}/${slug ? slug.join("/") : ""}`,
        ar: `/ar/${country.toLowerCase()}/${slug ? slug.join("/") : ""}`,
        hi: `/hi/${country.toLowerCase()}/${slug ? slug.join("/") : ""}`,
      },
    },
  };
}

export default async function DynamicMatrixPage({ params }: Props) {
  const { locale, country, slug = [] } = await params;

  const countryConfig = getCountryMarket(country.toUpperCase());
  const isArabic = locale === "ar";
  const isHindi = locale === "hi";

  // Parse path segments
  const locationSegment = slug[0] ? slug[0].replace(/-/g, " ") : countryConfig.countryName;
  const subLocationSegment = slug[1] ? slug[1].replace(/-/g, " ") : null;

  // Extract filter intents
  let propertyType: string | null = null;
  let purpose: "SALE" | "RENT" | null = null;
  let bedrooms: number | null = null;
  let isPropertyDetail = false;

  for (const seg of slug) {
    if (!propertyType) propertyType = parsePropertyType(seg);
    if (!purpose) purpose = parsePurpose(seg);
    if (!bedrooms) bedrooms = parseBedrooms(seg);
    if (seg.includes("property") || seg.length > 30) isPropertyDetail = true;
  }

  // Find matching cities/localities
  const matchedCity = GLOBAL_CITIES.find(
    (c) => c.slug.toLowerCase() === slug[0]?.toLowerCase() || c.name.toLowerCase() === locationSegment.toLowerCase()
  );

  // If this is a single property permalink, render complete Bayut/Zillow detail layout
  if (isPropertyDetail) {
    const propTitle = slug[slug.length - 1].replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
    return (
      <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100">
        <div className="mx-auto max-w-6xl">
          {/* Breadcrumbs */}
          <nav aria-label="breadcrumb" className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
            <Link href={`/${locale}`} className="hover:text-teal-400">Home</Link> /{" "}
            <Link href={`/${locale}/${country.toLowerCase()}`} className="hover:text-teal-400">{countryConfig.countryName}</Link> /{" "}
            <span className="text-teal-400">{propTitle}</span>
          </nav>

          {/* Top Hero Section */}
          <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-7">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"
                  alt={propTitle}
                  className="h-full w-full object-cover"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="rounded-md bg-rose-500/90 px-3 py-1 text-xs font-bold text-white shadow backdrop-blur">
                    FOR {purpose || "SALE"}
                  </span>
                  <span className="rounded-md bg-teal-500/90 px-3 py-1 text-xs font-bold text-slate-950 shadow backdrop-blur">
                    VERIFIED RERA
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl backdrop-blur-md">
              <span className="text-xs font-bold uppercase tracking-widest text-teal-400">
                📍 {subLocationSegment || locationSegment}, {countryConfig.countryName}
              </span>
              <h1 className="mt-2 font-serif text-2xl font-bold text-white sm:text-3xl leading-snug">
                {propTitle}
              </h1>

              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-xs font-semibold uppercase text-slate-400">Price</span>
                <span className="font-serif text-3xl font-extrabold text-amber-300">
                  {countryConfig.symbol} {countryConfig.currency === "INR" ? "2.95 Cr" : "2,950,000"}
                </span>
              </div>

              {/* Location Scores Bar */}
              <div className="mt-5 grid grid-cols-3 gap-2 border-t border-b border-slate-800 py-3 text-center text-xs">
                <div className="rounded-xl bg-slate-950 p-2">
                  <span className="block text-[10px] uppercase text-slate-500">WalkScore®</span>
                  <span className="font-bold text-teal-400">🚶 88 / 100</span>
                </div>
                <div className="rounded-xl bg-slate-950 p-2">
                  <span className="block text-[10px] uppercase text-slate-500">TransitScore</span>
                  <span className="font-bold text-teal-400">🚆 82 / 100</span>
                </div>
                <div className="rounded-xl bg-slate-950 p-2">
                  <span className="block text-[10px] uppercase text-slate-500">SchoolScore</span>
                  <span className="font-bold text-teal-400">🏫 94 / 100</span>
                </div>
              </div>

              <div className="mt-6">
                <LeadCaptureForm propertyId={slug[slug.length - 1]} />
              </div>
            </div>
          </div>

          {/* EMI & Mortgage Calculator */}
          <section className="mt-12">
            <EmiCalculator defaultPrice={29500000} />
          </section>

          {/* Map & POIs */}
          <section className="mt-12 rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
            <h2 className="font-serif text-2xl font-bold text-white">Location & Nearby Amenities</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-4 text-xs font-medium text-slate-300">
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">✈️ International Airport: 12 Mins</div>
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">🚆 Metro Station: 4 Mins</div>
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">🏫 Top Rated Academy: 6 Mins</div>
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">🛍️ Luxury Shopping Mall: 8 Mins</div>
            </div>
            <div className="mt-6">
              <MapEmbed latitude={25.2048} longitude={55.2708} label={propTitle} />
            </div>
          </section>
        </div>
      </main>
    );
  }

  // Render Programmatic Matrix / Search Landing Page
  const h1Title = `${bedrooms ? `${bedrooms} Bedroom ` : ""}${propertyType || "Properties"} ${
    purpose ? `for ${purpose === "SALE" ? "Sale" : "Rent"}` : "for Sale & Rent"
  } in ${subLocationSegment ? `${subLocationSegment}, ` : ""}${locationSegment}`;

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100">
      <div className="mx-auto max-w-6xl">
        {/* Breadcrumb Trail */}
        <nav aria-label="breadcrumb" className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
          <Link href={`/${locale}`} className="hover:text-teal-400">Home</Link> /{" "}
          <Link href={`/${locale}/${country.toLowerCase()}`} className="hover:text-teal-400">{countryConfig.countryName}</Link> /{" "}
          <span className="text-teal-400">{locationSegment}</span>
        </nav>

        {/* Header Title & Market Summary */}
        <div className="rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 p-8 shadow-2xl">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-teal-400">
            <span>{countryConfig.flag}</span>
            <span>{countryConfig.countryName} Real Estate Market</span>
          </div>

          <h1 className="mt-2 font-serif text-3xl font-extrabold text-white sm:text-4xl">
            {h1Title}
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-slate-300 max-w-3xl">
            Explore verified listings in {locationSegment}, {countryConfig.countryName}. Compare developer prices, floor plans, RERA approvals, and market trends across top communities.
          </p>

          {/* Quick Category Filters */}
          <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold">
            {["Apartments", "Villas", "Townhouses", "Offices", "Commercial Shops"].map((type) => (
              <Link
                key={type}
                href={`/${locale}/${country.toLowerCase()}/${slug[0] || "all"}/${type.toLowerCase()}/for-sale`}
                className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-2 text-slate-300 hover:border-teal-400 hover:text-white transition"
              >
                {type} in {locationSegment}
              </Link>
            ))}
          </div>
        </div>

        {/* Property Grid */}
        <div className="mt-10">
          <h2 className="font-serif text-2xl font-bold text-white mb-6">
            Available Properties ({countryConfig.sampleProjects.length + countryConfig.sampleProperties.length})
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {countryConfig.sampleProjects.map((proj) => {
              const pSlug = proj.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
              return (
                <div key={proj.id} className="group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-lg">
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <img src={proj.image} alt={proj.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                    <span className="absolute top-3 left-3 rounded bg-rose-600 px-2.5 py-1 text-[10px] font-bold text-white">{proj.badge}</span>
                  </div>
                  <div className="p-5">
                    <span className="text-xs text-teal-400 font-semibold">📍 {proj.location}</span>
                    <h3 className="mt-1 text-base font-bold text-white group-hover:text-teal-300">{proj.title}</h3>
                    <div className="mt-3 flex items-center justify-between border-t border-b border-slate-800 py-2.5 text-xs text-slate-400">
                      <span>🛏️ {proj.bhk}</span>
                      <span>📐 {proj.sqft}</span>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-base font-extrabold text-amber-300">{proj.price}</span>
                      <Link
                        href={`/${locale}/${country.toLowerCase()}/${slug[0] || "city"}/${pSlug}`}
                        className="rounded-xl bg-teal-500 px-3.5 py-2 text-xs font-bold text-slate-950 hover:bg-teal-400"
                      >
                        View Property →
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SEO FAQs */}
        <section className="mt-14 rounded-3xl border border-slate-800 bg-slate-900/40 p-8">
          <h2 className="font-serif text-2xl font-bold text-white mb-4">
            Frequently Asked Questions — {locationSegment} Real Estate
          </h2>
          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
              <h3 className="text-sm font-bold text-amber-300">What is the average price of properties in {locationSegment}?</h3>
              <p className="mt-1 text-xs text-slate-400">Prices start from {countryConfig.symbol} {countryConfig.currency === "INR" ? "30 Lakh" : "500,000"} up to luxury penthouses.</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
              <h3 className="text-sm font-bold text-amber-300">Are properties in {locationSegment} RERA approved?</h3>
              <p className="mt-1 text-xs text-slate-400">Yes, all featured developments are registered with official municipal and RERA authorities.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
