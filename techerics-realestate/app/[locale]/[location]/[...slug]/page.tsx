import type { Metadata } from "next";
import Link from "next/link";
import { getCountryMarket } from "@/lib/country-data";
import { GLOBAL_CITIES } from "@/lib/global-locations";
import PropertyCard from "@/components/PropertyCard";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import EmiCalculator from "@/components/EmiCalculator";
import MapEmbed from "@/components/MapEmbed";

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
  const locationName = slug.length ? slug[slug.length - 1].replace(/-/g, " ").toUpperCase() : location.toUpperCase();

  return {
    title: `${locationName} Real Estate & Properties | Tech Erics`,
    description: `Browse verified luxury apartments, villas, and commercial properties in ${locationName}. Best prices & RERA verified listings.`,
    alternates: {
      canonical: `/${locale}/${location}/${slug.join("/")}`,
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

  // Matrix Landing Page
  const h1Title = `${bedrooms ? `${bedrooms} Bedroom ` : ""}${propertyType || "Properties"} ${
    purpose ? `for ${purpose === "SALE" ? "Sale" : "Rent"}` : "for Sale & Rent"
  } in ${subLocationSegment ? `${subLocationSegment}, ` : ""}${locationSegment}`;

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100">
      <div className="mx-auto max-w-6xl">
        <nav aria-label="breadcrumb" className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
          <Link href={`/${locale}`} className="hover:text-teal-400">Home</Link> /{" "}
          <Link href={`/${locale}/${location}`} className="hover:text-teal-400">{locationSegment}</Link> /{" "}
          <span className="text-teal-400">{subLocationSegment || "Market"}</span>
        </nav>

        <div className="rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 p-8 shadow-2xl">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-400">
            {market.flag} Real Estate Directory
          </span>

          <h1 className="mt-2 font-serif text-3xl font-extrabold text-white sm:text-4xl">
            {h1Title}
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-slate-300 max-w-3xl">
            Explore verified real estate listings in {subLocationSegment || locationSegment}. RERA approved projects, developer masterplans, and zero commission deals.
          </p>

          <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold">
            {["Apartments", "Villas", "Townhouses", "Offices", "Commercial Shops"].map((type) => (
              <Link
                key={type}
                href={`/${locale}/${location}/${type.toLowerCase()}/for-sale`}
                className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-2 text-slate-300 hover:border-teal-400 hover:text-white transition"
              >
                {type} in {locationSegment}
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
      </div>
    </main>
  );
}
