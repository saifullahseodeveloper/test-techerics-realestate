"use client";

import Link from "next/link";
import { useCountry } from "@/lib/country-context";
import { GLOBAL_CITIES } from "@/lib/global-locations";

export default function SpiderInternalLinks() {
  const { market, countryCode } = useCountry();

  const citiesInMarket = GLOBAL_CITIES.filter(
    (c) => c.countryCode === countryCode || c.countryName.toLowerCase() === market.countryName.toLowerCase()
  );

  return (
    <section className="border-t border-slate-800/80 bg-slate-950 py-12 text-slate-300">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-6">
          <span className="text-[10px] font-bold uppercase tracking-widest text-teal-400">
            🕷️ Interconnected SEO Index
          </span>
          <h3 className="font-serif text-xl font-bold text-white">
            Explore {market.countryName} Real Estate Directory
          </h3>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Popular Cities */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3 border-b border-slate-800 pb-2">
              📍 Popular Cities in {market.countryName}
            </h4>
            <ul className="space-y-1.5 text-xs">
              {citiesInMarket.slice(0, 6).map((city) => (
                <li key={city.slug}>
                  <Link
                    href={`/${market.slug}/${city.slug}`}
                    className="text-slate-400 hover:text-teal-300 transition"
                  >
                    Properties in {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Property Types for Sale */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3 border-b border-slate-800 pb-2">
              🏠 Properties for Sale
            </h4>
            <ul className="space-y-1.5 text-xs">
              {["apartments", "villas", "townhouses", "penthouses", "commercial-offices"].map((type) => (
                <li key={type}>
                  <Link
                    href={`/${market.slug}/all/${type}/for-sale`}
                    className="text-slate-400 hover:text-teal-300 transition capitalize"
                  >
                    {type.replace("-", " ")} for Sale in {market.countryName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Properties for Rent */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3 border-b border-slate-800 pb-2">
              🔑 Properties for Rent
            </h4>
            <ul className="space-y-1.5 text-xs">
              {["apartments", "villas", "offices", "shops", "warehouses"].map((type) => (
                <li key={type}>
                  <Link
                    href={`/${market.slug}/all/${type}/for-rent`}
                    className="text-slate-400 hover:text-teal-300 transition capitalize"
                  >
                    {type.replace("-", " ")} for Rent in {market.countryName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Top Developers */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3 border-b border-slate-800 pb-2">
              🏗️ Featured Developers
            </h4>
            <ul className="space-y-1.5 text-xs">
              {market.topDevelopers.slice(0, 6).map((dev) => (
                <li key={dev.slug}>
                  <Link
                    href={`/${market.slug}/search?developer=${dev.slug}`}
                    className="text-slate-400 hover:text-teal-300 transition"
                  >
                    {dev.name} ({dev.projectsCount})
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
