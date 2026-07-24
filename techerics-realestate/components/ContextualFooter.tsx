"use client";

import Link from "next/link";
import { useCountry } from "@/lib/country-context";
import { getCountryMarket } from "@/lib/country-data";
import { GLOBAL_CITIES, GLOBAL_COUNTRIES } from "@/lib/global-locations";

export default function ContextualFooter({ currentLocation }: { currentLocation?: string } = {}) {
  const contextCountry = useCountry();

  // If currentLocation is provided, use its market config; otherwise fallback to context
  const market = currentLocation ? getCountryMarket(currentLocation) : contextCountry.market;
  const countryCode = currentLocation ? market.code : contextCountry.countryCode;

  // Filter cities specifically for the active page country
  const countryCities = GLOBAL_CITIES.filter(
    (c) => c.countryCode.toLowerCase() === countryCode.toLowerCase() || c.countryName.toLowerCase() === market.countryName.toLowerCase()
  );

  const displayCities = countryCities.length ? countryCities : GLOBAL_CITIES.slice(0, 5);

  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 text-xs text-slate-400">
      {/* 1. Contextual Spider-Mesh Internal Links (Adapts to Active Country) */}
      <div className="border-b border-slate-800/60 py-10 bg-slate-950/80">
        <div className="mx-auto max-w-6xl px-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-teal-400">
            {market.flag} Contextual Internal Link Graph ({market.countryName})
          </span>
          <h3 className="font-serif text-lg font-bold text-white mt-1 mb-6">
            Real Estate Search Directory in {market.countryName}
          </h3>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Dynamic Column 1: Popular Cities in Selected Country */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3 border-b border-slate-800 pb-2">
                📍 Popular Cities in {market.countryName}
              </h4>
              <ul className="space-y-1.5 text-xs">
                {displayCities.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/${market.slug}/${c.slug}`} className="hover:text-teal-300 transition">
                      Properties in {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Dynamic Column 2: Buy Permutations in Selected Country */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3 border-b border-slate-800 pb-2">
                🏠 Properties for Sale in {market.countryName}
              </h4>
              <ul className="space-y-1.5 text-xs">
                {["apartments", "villas", "townhouses", "penthouses", "studios"].map((type) => (
                  <li key={type}>
                    <Link
                      href={`/${market.slug}/all/${type}/for-sale`}
                      className="hover:text-teal-300 transition capitalize"
                    >
                      {type} for Sale in {market.countryName}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Dynamic Column 3: Rent Permutations in Selected Country */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3 border-b border-slate-800 pb-2">
                🔑 Properties for Rent in {market.countryName}
              </h4>
              <ul className="space-y-1.5 text-xs">
                {["apartments", "villas", "offices", "shops", "warehouses"].map((type) => (
                  <li key={type}>
                    <Link
                      href={`/${market.slug}/all/${type}/for-rent`}
                      className="hover:text-teal-300 transition capitalize"
                    >
                      {type} for Rent in {market.countryName}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Dynamic Column 4: Top Developers in Selected Country */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3 border-b border-slate-800 pb-2">
                🏗️ Top Developers ({market.countryName})
              </h4>
              <ul className="space-y-1.5 text-xs">
                {market.topDevelopers.slice(0, 6).map((dev) => (
                  <li key={dev.slug}>
                    <Link
                      href={`/${market.slug}/developers/${dev.slug}`}
                      className="hover:text-teal-300 transition"
                    >
                      {dev.name} Projects
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Footer Content & Country Localized Office Contact */}
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-5 px-4 pt-10 pb-10">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 text-xl font-bold tracking-tight text-white font-serif">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 font-sans font-black text-slate-950">
              TE
            </div>
            <span>
              Tech<span className="text-teal-400">Erics</span>
            </span>
          </div>

          <p className="mt-3 text-xs leading-relaxed text-slate-400 max-w-sm">
            Official {market.flag} {market.countryName} real estate portal. Verified luxury listings, 360° virtual tours, zero fake data, and direct developer masterplans.
          </p>

          <div className="mt-4 space-y-1.5 text-xs text-slate-300">
            <p>📍 {market.officeAddress}</p>
            <p>📞 {market.officePhone}</p>
            <p>✉️ {market.officeEmail}</p>
          </div>
        </div>

        <div>
          <h4 className="mb-3 font-semibold uppercase tracking-wider text-slate-200 text-xs">
            Quick Hubs
          </h4>
          <ul className="space-y-2">
            <li><Link href={`/${market.slug}/buy`} className="hover:text-teal-400 transition">Buy Property</Link></li>
            <li><Link href={`/${market.slug}/rent`} className="hover:text-teal-400 transition">Rent Property</Link></li>
            <li><Link href={`/${market.slug}/new-projects`} className="hover:text-teal-400 transition">New Project Launches</Link></li>
            <li><Link href={`/${market.slug}/commercial`} className="hover:text-teal-400 transition">Commercial Spaces</Link></li>
            <li><Link href={`/${market.slug}/developers`} className="hover:text-teal-400 transition">Developer Directory</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 font-semibold uppercase tracking-wider text-slate-200 text-xs">
            Global Countries
          </h4>
          <ul className="space-y-2">
            {GLOBAL_COUNTRIES.slice(0, 5).map((c) => (
              <li key={c.slug}>
                <Link href={`/${c.slug}`} className="hover:text-teal-400 transition">
                  {c.flag} Real Estate in {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-3 font-semibold uppercase tracking-wider text-slate-200 text-xs">
            Company & Legal
          </h4>
          <ul className="space-y-2">
            <li><Link href={`/${market.slug}/about`} className="hover:text-teal-400 transition">About Tech Erics</Link></li>
            <li><Link href={`/${market.slug}/blog`} className="hover:text-teal-400 transition">Market Insights & Blog</Link></li>
            <li><Link href={`/${market.slug}/post-property`} className="hover:text-teal-400 transition">List Your Property Free</Link></li>
            <li><Link href={`/${market.slug}/privacy`} className="hover:text-teal-400 transition">Privacy Policy</Link></li>
            <li><Link href={`/${market.slug}/terms`} className="hover:text-teal-400 transition">Terms of Service</Link></li>
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-6xl border-t border-slate-800/80 px-4 py-6 flex flex-col items-center justify-between gap-4 text-[11px] text-slate-500 sm:flex-row">
        <p>© {new Date().getFullYear()} Tech Erics Real Estate Pvt Ltd. All rights reserved. Registered in {market.countryName}.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-slate-300">Facebook</a>
          <a href="#" className="hover:text-slate-300">Instagram</a>
          <a href="#" className="hover:text-slate-300">LinkedIn</a>
          <a href="#" className="hover:text-slate-300">YouTube</a>
        </div>
      </div>
    </footer>
  );
}
