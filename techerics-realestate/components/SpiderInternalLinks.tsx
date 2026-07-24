"use client";

import Link from "next/link";
import { GLOBAL_CITIES, GLOBAL_COUNTRIES } from "@/lib/global-locations";

type SpiderProps = {
  localityName: string;
  cityName: string;
  countrySlug?: string;
  propertyType?: string;
  priceFormatted?: string;
};

export default function SpiderInternalLinks({
  localityName,
  cityName,
  countrySlug = "india",
  propertyType = "Apartment",
  priceFormatted = "₹ 2.5 Cr",
}: SpiderProps) {
  const citySlug = cityName.toLowerCase().replace(/\s+/g, "-");
  const locSlug = localityName.toLowerCase().replace(/\s+/g, "-");

  // Sample dynamic spider mesh categories
  const propertyTypes = ["apartments", "villas", "penthouses", "townhouses", "commercial-offices", "plots"];
  const priceRanges = ["under-1-cr", "1-to-3-cr", "3-to-5-cr", "above-5-cr", "luxury-collection"];
  const bedFilters = ["1-bhk", "2-bhk", "3-bhk", "4-bhk", "5-bhk-penthouse"];
  const investmentGuides = [
    `Top 10 Investment High-Yield Areas in ${cityName}`,
    `Rental Yield Analysis 2026: ${localityName}`,
    `RERA Compliance & Escrow Guide for ${cityName} Buyers`,
    `Property Appreciation Trends in ${localityName} (24 Month Data)`,
    `NRI Property Investment & Tax Exemption Guide`,
  ];
  const nearbyHubs = [
    `Properties Near ${cityName} International Airport`,
    `Properties Near ${localityName} Metro Station`,
    `Luxury Real Estate Near International Schools in ${cityName}`,
    `Waterfront & Sea-Facing Properties in ${cityName}`,
    `Ready to Move RERA Verified Projects in ${localityName}`,
  ];

  return (
    <section className="glass-panel rounded-3xl p-6 sm:p-8 mt-12 overflow-hidden border border-white/10">
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-400">
            🌐 AI Knowledge Graph & Spider-Mesh Directory
          </span>
          <span className="rounded-full bg-teal-500/20 px-3 py-0.5 text-[10px] font-extrabold text-teal-300 border border-teal-500/30">
            100+ CONNECTED ENTITIES
          </span>
        </div>
        <h3 className="font-serif text-2xl font-bold text-white mt-1">
          Real Estate Knowledge Network: {localityName}, {cityName}
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Explore interconnected properties, developer projects, transit hubs, and market yield reports.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 border-t border-slate-800/80 pt-6">
        {/* Column 1: Property Types in Locality */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-teal-300 mb-3 border-b border-slate-800 pb-2">
            🏠 Property Types in {localityName}
          </h4>
          <ul className="space-y-1.5 text-xs">
            {propertyTypes.map((type) => (
              <li key={type}>
                <Link
                  href={`/${countrySlug}/${citySlug}/${locSlug}/${type}/for-sale`}
                  className="text-slate-400 hover:text-teal-300 transition capitalize"
                >
                  {type.replace("-", " ")} for Sale in {localityName}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 2: Budget & Bedroom Tiers */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-teal-300 mb-3 border-b border-slate-800 pb-2">
            💰 Price Tiers & Bedrooms ({cityName})
          </h4>
          <ul className="space-y-1.5 text-xs">
            {bedFilters.map((bed) => (
              <li key={bed}>
                <Link
                  href={`/${countrySlug}/${citySlug}/${bed}/properties`}
                  className="text-slate-400 hover:text-teal-300 transition uppercase"
                >
                  {bed.replace("-", " ")} {propertyType}s in {cityName}
                </Link>
              </li>
            ))}
            {priceRanges.map((pr) => (
              <li key={pr}>
                <Link
                  href={`/${countrySlug}/${citySlug}/price/${pr}`}
                  className="text-slate-400 hover:text-teal-300 transition capitalize"
                >
                  Properties {pr.replace(/-/g, " ")} in {cityName}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Transit & Nearby Landmark Hubs */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-teal-300 mb-3 border-b border-slate-800 pb-2">
            🚆 Transit & Landmark Proximity
          </h4>
          <ul className="space-y-1.5 text-xs">
            {nearbyHubs.map((hub, idx) => (
              <li key={idx}>
                <Link
                  href={`/${countrySlug}/${citySlug}/search?q=${encodeURIComponent(hub)}`}
                  className="text-slate-400 hover:text-teal-300 transition"
                >
                  {hub}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Market Reports & Investment Guides */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-teal-300 mb-3 border-b border-slate-800 pb-2">
            📈 Market Reports & Yield Guides
          </h4>
          <ul className="space-y-1.5 text-xs">
            {investmentGuides.map((guide, idx) => (
              <li key={idx}>
                <Link
                  href={`/${countrySlug}/blog/${guide.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                  className="text-slate-400 hover:text-teal-300 transition"
                >
                  {guide}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Global Countries & Cities Footer Mesh */}
      <div className="mt-8 border-t border-slate-800/80 pt-6">
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block mb-3">
          🌐 Global Real Estate Network
        </span>
        <div className="flex flex-wrap gap-2 text-xs">
          {GLOBAL_COUNTRIES.map((c) => (
            <Link
              key={c.slug}
              href={`/${c.slug}`}
              className="glass-pill rounded-full px-3 py-1 text-[11px] text-slate-300 hover:text-teal-300"
            >
              {c.flag} {c.name} Real Estate
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
