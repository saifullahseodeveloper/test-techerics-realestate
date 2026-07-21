import type { Metadata } from "next";
import Link from "next/link";
import { getCountryMarket } from "@/lib/country-data";
import { GLOBAL_CITIES, GLOBAL_COUNTRIES } from "@/lib/global-locations";
import PropertyCard from "@/components/PropertyCard";
import DeveloperPartners from "@/components/home/DeveloperPartners";

export const revalidate = 60;

type Props = {
  params: Promise<{ locale: string; country: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, country } = await params;
  const market = getCountryMarket(country.toUpperCase());

  return {
    title: `${market.countryName} Real Estate, Properties for Sale & Rent | Tech Erics`,
    description: `Explore top real estate developments, luxury apartments, villas, and commercial properties in ${market.countryName}. RERA approved projects by top developers.`,
    alternates: {
      canonical: `/${locale}/${country.toLowerCase()}`,
      languages: {
        en: `/en/${country.toLowerCase()}`,
        ar: `/ar/${country.toLowerCase()}`,
        hi: `/hi/${country.toLowerCase()}`,
      },
    },
  };
}

export default async function CountryHomePage({ params }: Props) {
  const { locale, country } = await params;
  const market = getCountryMarket(country.toUpperCase());

  const countryCities = GLOBAL_CITIES.filter((c) => c.countryCode.toLowerCase() === country.toLowerCase() || c.countryName.toLowerCase() === market.countryName.toLowerCase());

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100">
      <div className="mx-auto max-w-6xl">
        {/* Country Hero Header */}
        <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
          <div className="relative z-10">
            <span className="rounded-md bg-teal-500/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-teal-300 border border-teal-500/30">
              {market.flag} Official {market.countryName} Real Estate Portal
            </span>

            <h1 className="mt-4 font-serif text-3xl font-extrabold text-white sm:text-5xl">
              Real Estate & Properties in <span className="text-teal-400">{market.countryName}</span>
            </h1>

            <p className="mt-3 text-base text-slate-300 max-w-2xl leading-relaxed">
              Find luxury apartments, villas, townhouses, and commercial spaces. Verified RERA listings, developer masterplans, and zero commission deals.
            </p>

            {/* Quick Country Stats Bar */}
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 border-t border-slate-800 pt-6 text-xs font-semibold">
              <div className="rounded-xl bg-slate-950 p-3">
                <span className="block text-[10px] text-slate-500 uppercase">Top Cities</span>
                <span className="text-white text-sm font-bold">{countryCities.length || 5}+ Major Hubs</span>
              </div>
              <div className="rounded-xl bg-slate-950 p-3">
                <span className="block text-[10px] text-slate-500 uppercase">Currency</span>
                <span className="text-amber-300 text-sm font-bold">{market.currency} ({market.symbol})</span>
              </div>
              <div className="rounded-xl bg-slate-950 p-3">
                <span className="block text-[10px] text-slate-500 uppercase">Featured Developers</span>
                <span className="text-white text-sm font-bold">{market.topDevelopers.length}+ Group Partners</span>
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
            Popular Cities & Regions in {market.countryName}
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {countryCities.map((city) => (
              <Link
                key={city.slug}
                href={`/${locale}/${country.toLowerCase()}/${city.slug}`}
                className="group flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:border-teal-400 hover:bg-slate-850 shadow-md"
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

        {/* Developer Partners Grid */}
        <section className="mt-12">
          <DeveloperPartners />
        </section>
      </div>
    </main>
  );
}
