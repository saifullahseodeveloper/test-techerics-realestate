import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { getCountryMarket, GLOBAL_MARKETS } from "@/lib/country-data";
import { GLOBAL_CITIES, GLOBAL_COUNTRIES, generateCitySchema } from "@/lib/global-locations";
import PropertyCard from "@/components/PropertyCard";
import DeveloperPartners from "@/components/home/DeveloperPartners";
import FaqSchema from "@/components/FaqSchema";

export const revalidate = 3600;

type Props = { params: Promise<{ locale: string; location: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, location: locSlug } = await params;

  // Check if country match
  const countryConfig = Object.values(GLOBAL_MARKETS).find(
    (m) => m.slug.toLowerCase() === locSlug.toLowerCase() || m.code.toLowerCase() === locSlug.toLowerCase()
  );

  if (countryConfig) {
    return {
      title: `${countryConfig.countryName} Real Estate, Properties for Sale & Rent | Tech Erics`,
      description: `Explore top real estate developments, luxury apartments, villas, and commercial properties in ${countryConfig.countryName}. RERA approved projects by top developers.`,
      alternates: { canonical: `/${locale}/${locSlug.toLowerCase()}` },
    };
  }

  // City match
  const globalCity = GLOBAL_CITIES.find((c) => c.slug.toLowerCase() === locSlug.toLowerCase());
  const name = globalCity?.name || locSlug.replace(/-/g, " ").toUpperCase();
  const desc = globalCity?.seoDescription || `Browse verified real estate properties for sale & rent in ${name}. Penthouses, luxury villas, commercial offices & apartments.`;

  return {
    title: `Properties for Sale & Rent in ${name} | Tech Erics Global`,
    description: desc,
    alternates: { canonical: `/${locale}/${locSlug.toLowerCase()}` },
  };
}

export default async function LocationPage({ params }: Props) {
  const { locale, location: locSlug } = await params;

  // Check if country match
  const countryConfig = Object.values(GLOBAL_MARKETS).find(
    (m) => m.slug.toLowerCase() === locSlug.toLowerCase() || m.code.toLowerCase() === locSlug.toLowerCase()
  );

  if (countryConfig) {
    const countryCities = GLOBAL_CITIES.filter(
      (c) => c.countryCode.toLowerCase() === countryConfig.code.toLowerCase() || c.countryName.toLowerCase() === countryConfig.countryName.toLowerCase()
    );

    return (
      <main className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100">
        <div className="mx-auto max-w-6xl">
          {/* Country Hero Header */}
          <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
            <div className="relative z-10">
              <span className="rounded-md bg-teal-500/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-teal-300 border border-teal-500/30">
                {countryConfig.flag} Official {countryConfig.countryName} Real Estate Portal
              </span>

              <h1 className="mt-4 font-serif text-3xl font-extrabold text-white sm:text-5xl">
                Real Estate & Properties in <span className="text-teal-400">{countryConfig.countryName}</span>
              </h1>

              <p className="mt-3 text-base text-slate-300 max-w-2xl leading-relaxed">
                Find luxury apartments, villas, townhouses, and commercial spaces. Verified RERA listings, developer masterplans, and zero commission deals.
              </p>

              {/* Country Stats Bar */}
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 border-t border-slate-800 pt-6 text-xs font-semibold">
                <div className="rounded-xl bg-slate-950 p-3">
                  <span className="block text-[10px] text-slate-500 uppercase">Top Cities</span>
                  <span className="text-white text-sm font-bold">{countryCities.length || 5}+ Major Hubs</span>
                </div>
                <div className="rounded-xl bg-slate-950 p-3">
                  <span className="block text-[10px] text-slate-500 uppercase">Currency</span>
                  <span className="text-amber-300 text-sm font-bold">{countryConfig.currency} ({countryConfig.symbol})</span>
                </div>
                <div className="rounded-xl bg-slate-950 p-3">
                  <span className="block text-[10px] text-slate-500 uppercase">Featured Developers</span>
                  <span className="text-white text-sm font-bold">{countryConfig.topDevelopers.length}+ Group Partners</span>
                </div>
                <div className="rounded-xl bg-slate-950 p-3">
                  <span className="block text-[10px] text-slate-500 uppercase">RERA Compliance</span>
                  <span className="text-teal-400 text-sm font-bold">100% Verified</span>
                </div>
              </div>
            </div>
          </div>

          {/* Explore Cities in Country */}
          <section className="mt-12">
            <h2 className="font-serif text-2xl font-bold text-white mb-6">
              Popular Cities & Regions in {countryConfig.countryName}
            </h2>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {countryCities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/${locale}/${city.slug}`}
                  className="group flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:border-teal-400 shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-base font-bold text-white group-hover:text-teal-300">
                        📍 {city.name}
                      </span>
                      <span className="text-xs text-slate-500">{city.regionName}</span>
                    </div>
                    <p className="mt-2 text-xs text-slate-400 leading-relaxed truncate">
                      {city.popularLocalities.join(" • ")}
                    </p>
                  </div>
                  <div className="mt-4 text-xs font-bold text-teal-400 group-hover:underline">
                    Browse {city.name} Properties →
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-12">
            <DeveloperPartners />
          </section>
        </div>
      </main>
    );
  }

  // City rendering fallback
  const globalCity = GLOBAL_CITIES.find((c) => c.slug.toLowerCase() === locSlug.toLowerCase());
  const cityName = globalCity?.name || locSlug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  const countryName = globalCity?.countryName || "Global";
  const seoText = globalCity?.seoDescription || `Find luxury properties for sale and rent in ${cityName}.`;
  const localities = globalCity?.popularLocalities || ["Downtown", "Central Hub", "Waterfront Promenade"];

  const faqs = [
    {
      q: `What types of real estate properties are available in ${cityName}?`,
      a: `Tech Erics offers verified luxury apartments, sea-facing villas, penthouses, gated townships, and commercial spaces in ${cityName}.`,
    },
    {
      q: `Which are the top investment localities in ${cityName}?`,
      a: `${localities.slice(0, 5).join(", ")} are among the highest-demand residential and commercial hubs in ${cityName}.`,
    },
  ];

  const citySchema = globalCity ? generateCitySchema(globalCity) : null;

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100">
      <FaqSchema faqs={faqs} />
      {citySchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(citySchema) }}
        />
      )}

      <div className="mx-auto max-w-6xl">
        <nav className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Home / {countryName} / <span className="text-teal-400">{cityName}</span>
        </nav>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-10 shadow-2xl backdrop-blur">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-400">
            Global Real Estate Hub
          </span>
          <h1 className="mt-2 font-serif text-3xl font-bold text-white sm:text-5xl">
            Properties for Sale & Rent in {cityName}
          </h1>

          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-300">
            {seoText}
          </p>

          <div className="mt-8">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Popular Localities in {cityName}:
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {localities.map((loc, idx) => (
                <Link
                  key={idx}
                  href={`/${locale}/${locSlug}/${loc.toLowerCase().replace(/\s+/g, "-")}`}
                  className="rounded-full border border-slate-700 bg-slate-950 px-4 py-1.5 text-xs font-semibold text-slate-200 transition hover:border-teal-400 hover:text-teal-300"
                >
                  📍 {loc}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
