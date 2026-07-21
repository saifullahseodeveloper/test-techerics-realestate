"use client";

import Link from "next/link";
import { useCountry } from "@/lib/country-context";
import { GLOBAL_CITIES } from "@/lib/global-locations";

export default function CommercialPage() {
  const { market } = useCountry();

  const countryCities = GLOBAL_CITIES.filter(
    (c) => c.countryCode.toLowerCase() === market.code.toLowerCase() || c.countryName.toLowerCase() === market.countryName.toLowerCase()
  );

  const displayCities = countryCities.length ? countryCities : GLOBAL_CITIES.slice(0, 6);
  const primaryCitySlug = displayCities[0]?.slug || "dubai";

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-16 text-slate-100">
      <div className="mx-auto max-w-6xl">
        <span className="text-xs font-bold uppercase tracking-widest text-teal-400">
          {market.flag} Commercial Real Estate in {market.countryName}
        </span>
        <h1 className="mt-2 font-serif text-3xl font-bold text-white sm:text-5xl">
          Commercial Properties in {market.countryName}
        </h1>
        <p className="mt-4 max-w-2xl text-sm text-slate-400 leading-relaxed">
          Premium commercial spaces in {market.countryName} — Grade-A offices, retail shops, warehouses, and co-working hubs. RERA verified with direct developer masterplans.
        </p>

        {/* Commercial by Type */}
        <h2 className="mt-12 font-serif text-xl font-bold text-white">Commercial Categories</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { label: "Office Spaces", slug: "offices", icon: "🏢" },
            { label: "Retail Shops", slug: "shops", icon: "🛍️" },
            { label: "Warehouses", slug: "warehouses", icon: "📦" },
          ].map((item) => (
            <Link
              key={item.slug}
              href={`/${market.slug}/${primaryCitySlug}/${item.slug}/for-sale`}
              className="group rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-teal-400"
            >
              <span className="text-2xl">{item.icon}</span>
              <h3 className="mt-2 text-lg font-bold text-white group-hover:text-teal-300">{item.label}</h3>
              <span className="mt-1 block text-xs text-slate-500">For Sale & Lease in {market.countryName}</span>
            </Link>
          ))}
        </div>

        {/* Commercial in Cities */}
        <h2 className="mt-12 font-serif text-xl font-bold text-white">Commercial Cities in {market.countryName}</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {displayCities.map((city) => (
            <Link
              key={city.slug}
              href={`/${market.slug}/${city.slug}`}
              className="rounded-full border border-slate-800 bg-slate-900 px-4 py-2 text-xs font-semibold text-slate-300 hover:border-teal-400 hover:text-white transition"
            >
              Offices in {city.name}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
