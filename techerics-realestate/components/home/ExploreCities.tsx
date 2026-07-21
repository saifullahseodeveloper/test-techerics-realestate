"use client";

import Link from "next/link";
import { useCountry } from "@/lib/country-context";

export default function ExploreCities() {
  const { market } = useCountry();

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
          {market.topCities.map((city) => (
            <Link
              key={city.slug}
              href={`/${city.slug}`}
              className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-teal-500/50 hover:shadow-2xl"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <img
                  src={city.image}
                  alt={city.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
              </div>

              <div className="absolute inset-0 flex flex-col justify-end p-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-2xl font-bold text-white group-hover:text-teal-300">
                    {city.name}
                  </h3>
                  <span className="rounded-full bg-teal-500/20 px-3 py-1 text-xs font-semibold text-teal-300 backdrop-blur border border-teal-500/30">
                    {city.count}
                  </span>
                </div>
                <p className="mt-1.5 text-xs text-slate-300 line-clamp-2">
                  {city.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
