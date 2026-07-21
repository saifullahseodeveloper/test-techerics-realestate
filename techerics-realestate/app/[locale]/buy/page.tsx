"use client";

import Link from "next/link";
import { useCountry } from "@/lib/country-context";
import { GLOBAL_CITIES } from "@/lib/global-locations";

export default function BuyPage() {
  const { market } = useCountry();

  // Filter cities for active country market
  const countryCities = GLOBAL_CITIES.filter(
    (c) => c.countryCode.toLowerCase() === market.code.toLowerCase() || c.countryName.toLowerCase() === market.countryName.toLowerCase()
  );

  const displayCities = countryCities.length ? countryCities : GLOBAL_CITIES.slice(0, 6);
  const primaryCitySlug = displayCities[0]?.slug || "dubai";

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-16 text-slate-100">
      <div className="mx-auto max-w-6xl">
        <span className="text-xs font-bold uppercase tracking-widest text-teal-400">
          {market.flag} Buy Property in {market.countryName}
        </span>
        <h1 className="mt-2 font-serif text-3xl font-bold text-white sm:text-5xl">
          Properties for Sale in {market.countryName}
        </h1>
        <p className="mt-4 max-w-2xl text-sm text-slate-400 leading-relaxed">
          Find your dream home or high-yield investment property in {market.countryName}. Browse verified luxury apartments, sea-facing villas, penthouses, and commercial spaces.
        </p>

        {/* Browse Cities in Active Country */}
        <h2 className="mt-12 font-serif text-xl font-bold text-white">
          Browse Cities in {market.countryName}
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {displayCities.map((city) => (
            <Link
              key={city.slug}
              href={`/${market.slug}/${city.slug}`}
              className="group rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:border-teal-400"
            >
              <span className="text-base font-bold text-white group-hover:text-teal-300">
                📍 Properties for Sale in {city.name}
              </span>
              <span className="mt-1 block text-xs text-slate-500">{city.countryName} · {city.regionName}</span>
            </Link>
          ))}
        </div>

        {/* Property Types linked specifically for Active Country & Primary City */}
        <h2 className="mt-12 font-serif text-xl font-bold text-white">
          Browse by Property Type in {market.countryName}
        </h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {["Apartments", "Villas", "Penthouses", "Townhouses", "Studios", "Plots"].map((type) => (
            <Link
              key={type}
              href={`/${market.slug}/${primaryCitySlug}/${type.toLowerCase()}/for-sale`}
              className="rounded-xl border border-slate-800 bg-slate-900 px-5 py-2.5 text-xs font-semibold text-slate-300 hover:border-teal-400 hover:text-white transition"
            >
              {type} for Sale in {displayCities[0]?.name || market.countryName}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
