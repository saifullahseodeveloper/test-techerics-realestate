import type { Metadata } from "next";
import Link from "next/link";
import { getCountryMarket } from "@/lib/country-data";
import { GLOBAL_CITIES } from "@/lib/global-locations";
import PropertyCard from "@/components/PropertyCard";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import ContextualFooter from "@/components/ContextualFooter";
import LocalizedFaqAccordion from "@/components/seo/LocalizedFaqAccordion";
import EmiCalculator from "@/components/EmiCalculator";
import MapEmbed from "@/components/MapEmbed";
import DynamicSeoBlock from "@/components/DynamicSeoBlock";

export const revalidate = 60;

type Props = {
  params: Promise<{ locale: string; location: string; slug: string[] }>;
};

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

function parsePurpose(slugSegment: string): "SALE" | "RENT" | null {
  const s = slugSegment.toLowerCase();
  if (s.includes("sale") || s.includes("buy")) return "SALE";
  if (s.includes("rent") || s.includes("lease")) return "RENT";
  return null;
}

function parseBedrooms(slugSegment: string): number | null {
  const match = slugSegment.match(/(\d+)-bed/i) || slugSegment.match(/(\d+)-bhk/i);
  return match ? parseInt(match[1], 10) : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, location, slug = [] } = await params;

  let propertyType: string | null = null;
  let purpose: "SALE" | "RENT" | null = null;
  let bedrooms: number | null = null;

  for (const seg of slug) {
    if (!propertyType) propertyType = parsePropertyType(seg);
    if (!purpose) purpose = parsePurpose(seg);
    if (!bedrooms) bedrooms = parseBedrooms(seg);
  }

  const currentPurpose = purpose || "SALE";
  const locationName = slug.length ? slug[0].replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()) : location.toUpperCase();
  const countryName = location.toUpperCase();
  const typeText = propertyType || "Properties";
  const bedText = bedrooms ? `${bedrooms} BHK ` : "";
  const intentText = currentPurpose === "SALE" ? "for Sale" : "for Rent";

  const title = `${bedText}${typeText} ${intentText} in ${locationName}, ${countryName} (2026 Prices) | Tech Erics`;
  const description = `Browse verified ${bedText.toLowerCase()}${typeText.toLowerCase()} ${intentText} in ${locationName}, ${countryName}. RERA approved masterplans, 360° virtual tours, zero commission.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/${location}/${slug.join("/")}`,
    },
    openGraph: {
      title,
      description,
      url: `https://techerics.com/${locale}/${location}/${slug.join("/")}`,
      siteName: "Tech Erics Global Real Estate",
      images: [
        {
          url: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function DynamicLocationMatrixPage({ params }: Props) {
  const { locale, location, slug = [] } = await params;

  const market = getCountryMarket(location.toUpperCase());
  const locationSegment = location.replace(/-/g, " ").toUpperCase();
  const subLocationSegment = slug[0] ? slug[0].replace(/-/g, " ") : null;

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

  // Property detail permalink page
  if (isPropertyDetail) {
    const propTitle = slug[slug.length - 1].replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
    return (
      <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100">
        <div className="mx-auto max-w-6xl">
          <nav aria-label="breadcrumb" className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
            <Link href={`/${locale}`} className="hover:text-teal-400">Home</Link> /{" "}
            <Link href={`/${locale}/${location}`} className="hover:text-teal-400">{locationSegment}</Link> /{" "}
            <span className="text-teal-400">{propTitle}</span>
          </nav>

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
                📍 {subLocationSegment || locationSegment}
              </span>
              <h1 className="mt-2 font-serif text-2xl font-bold text-white sm:text-3xl leading-snug">
                {propTitle}
              </h1>

              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-xs font-semibold uppercase text-slate-400">Price</span>
                <span className="font-serif text-3xl font-extrabold text-amber-300">
                  {market.symbol} {market.currency === "INR" ? "2.95 Cr" : "2,950,000"}
                </span>
              </div>

              {/* Location Scores */}
              <div className="mt-5 grid grid-cols-3 gap-2 border-t border-b border-slate-800 py-3 text-center text-xs">
                <div className="rounded-xl bg-slate-950 p-2">
                  <span className="block text-[10px] uppercase text-slate-500 font-semibold">WalkScore®</span>
                  <span className="font-bold text-teal-400">🚶 88 / 100</span>
                </div>
                <div className="rounded-xl bg-slate-950 p-2">
                  <span className="block text-[10px] uppercase text-slate-500 font-semibold">TransitScore</span>
                  <span className="font-bold text-teal-400">🚆 82 / 100</span>
                </div>
                <div className="rounded-xl bg-slate-950 p-2">
                  <span className="block text-[10px] uppercase text-slate-500 font-semibold">SchoolScore</span>
                  <span className="font-bold text-teal-400">🏫 94 / 100</span>
                </div>
              </div>

              <div className="mt-6">
                <LeadCaptureForm propertyId={slug[slug.length - 1]} />
              </div>
            </div>
          </div>

          <section className="mt-12">
            <EmiCalculator defaultPrice={29500000} />
          </section>

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

  // Matrix Landing Page — Default to SALE if purpose not specified to keep intent distinct
  const currentPurpose = purpose || "SALE";
  const purposeText = currentPurpose === "SALE" ? "for Sale" : "for Rent";

  const h1Title = `${bedrooms ? `${bedrooms} Bedroom ` : ""}${propertyType || "Properties"} ${purposeText} in ${
    subLocationSegment ? `${subLocationSegment}, ` : ""
  }${locationSegment}`;

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100">
      <div className="mx-auto max-w-6xl">
        <nav aria-label="breadcrumb" className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
          <Link href={`/${locale}`} className="hover:text-teal-400">Home</Link> /{" "}
          <Link href={`/${locale}/${location}`} className="hover:text-teal-400">{locationSegment}</Link> /{" "}
          <span className="text-teal-400">{subLocationSegment || "Market"}</span>
        </nav>

        <div className="glass-panel rounded-3xl p-8 sm:p-10 shadow-2xl">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-400">
              {market.flag} Real Estate Directory
            </span>
            <span className={`rounded-full px-3 py-0.5 text-[10px] font-extrabold uppercase backdrop-blur-md ${currentPurpose === "SALE" ? "bg-rose-500/20 text-rose-300 border border-rose-500/30" : "bg-teal-500/20 text-teal-300 border border-teal-500/30"}`}>
              PROPERTIES {currentPurpose === "SALE" ? "FOR SALE" : "FOR RENT"}
            </span>
          </div>

          <h1 className="mt-3 font-serif text-3xl font-extrabold text-white sm:text-5xl leading-tight">
            {h1Title}
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-slate-300 max-w-3xl">
            Explore verified real estate {currentPurpose === "SALE" ? "buy options and developer masterplans" : "rental listings and commercial leases"} in {subLocationSegment || locationSegment}. RERA approved projects with zero commission.
          </p>

          {/* Dedicated Intent Toggle Links with Glassmorphism pills */}
          <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold">
            {["Apartments", "Villas", "Townhouses", "Offices", "Commercial Shops"].map((type) => (
              <Link
                key={type}
                href={`/${locale}/${location}/${subLocationSegment ? `${subLocationSegment.toLowerCase().replace(/\s+/g, "-")}/` : ""}${type.toLowerCase()}/${currentPurpose === "SALE" ? "for-sale" : "for-rent"}`}
                className="glass-pill rounded-xl px-4 py-2 text-slate-300 hover:text-white transition"
              >
                {type} {purposeText} in {subLocationSegment || locationSegment}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <h2 className="font-serif text-2xl font-bold text-white mb-6">
            Available Listings in {subLocationSegment || locationSegment}
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {market.sampleProjects.map((proj) => (
              <div key={proj.id} className="glass-card group overflow-hidden rounded-2xl transition-all duration-300">
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <img src={proj.image} alt={proj.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  <span className={`absolute top-3 left-3 rounded px-2.5 py-1 text-[10px] font-bold text-white ${currentPurpose === "SALE" ? "bg-rose-600" : "bg-teal-600"}`}>
                    FOR {currentPurpose}
                  </span>
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
                      href={`/${locale}/${location}/${proj.id}`}
                      className="rounded-xl bg-teal-500 px-3.5 py-2 text-xs font-bold text-slate-950 hover:bg-teal-400"
                    >
                      View Property →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Programmatic SEO Localized FAQs */}
        <LocalizedFaqAccordion locationName={subLocationSegment || locationSegment} />

        {/* Spider-Mesh Internal Directory */}
        <ContextualFooter currentLocation={locationSegment} />

        {/* Phase 4 Dynamic Content Engine Block */}
        <DynamicSeoBlock
          locationName={subLocationSegment || locationSegment}
          propertyType={propertyType || "Properties"}
          purpose={purpose ? `for ${purpose === "SALE" ? "Sale" : "Rent"}` : "for Sale & Rent"}
          listingCount={market.sampleProjects.length}
          countryName={market.countryName}
        />
      </div>
    </main>
  );
}
