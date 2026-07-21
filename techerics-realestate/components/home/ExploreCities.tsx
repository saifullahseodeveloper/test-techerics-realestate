"use client";

import Link from "next/link";
import { useCountry } from "@/lib/country-context";
import { GLOBAL_CITIES } from "@/lib/global-locations";

export default function ExploreCities() {
  const { market } = useCountry();

  const countryCities = GLOBAL_CITIES.filter(
    (c) => c.countryCode.toLowerCase() === market.code.toLowerCase() || c.countryName.toLowerCase() === market.countryName.toLowerCase()
  );

  return (
    <section className="bg-slate-950 px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-400">
            {market.flag} {market.countryName} Real Estate Hubs
          </span>
          <h2 className="mt-1 font-serif text-2xl font-bold text-white sm:text-3xl">
            Explore Properties by City in {market.countryName}
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Click any city to view verified listings, locality guides, and developer launches in {market.countryName}.
          </p>
        </div>

        {/* Dynamic Country City Grid */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {countryCities.map((city) => (
            <Link
              key={city.slug}
              href={`/${market.slug}/${city.slug}`}
              className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-teal-500/50 hover:shadow-2xl p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-2xl font-bold text-white group-hover:text-teal-300">
                    📍 {city.name}
                  </h3>
                  <span className="rounded-full bg-teal-500/20 px-3 py-1 text-xs font-semibold text-teal-300 backdrop-blur border border-teal-500/30">
                    {city.regionName}
                  </span>
                </div>
                <p className="mt-2 text-xs text-slate-400 leading-relaxed truncate">
                  {city.popularLocalities.join(" • ")}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-slate-800/80 pt-4 text-xs font-bold text-teal-400 group-hover:underline">
                <span>View {city.name} Listings</span>
                <span>→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
