"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCountry } from "@/lib/country-context";
import { GLOBAL_CITIES } from "@/lib/global-locations";

export default function HeroSection() {
  const router = useRouter();
  const { market } = useCountry();
  const [activeTab, setActiveTab] = useState<"BUY" | "RENT" | "COMMERCIAL" | "PLOTS">("BUY");
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("ALL");
  const [budget, setBudget] = useState("ALL");

  const countryCities = GLOBAL_CITIES.filter(
    (c) => c.countryCode.toLowerCase() === market.code.toLowerCase() || c.countryName.toLowerCase() === market.countryName.toLowerCase()
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set("country", market.code);
    params.set("purpose", activeTab === "RENT" ? "RENT" : "SALE");
    if (location) params.set("q", location);
    if (propertyType !== "ALL") params.set("type", propertyType);
    if (budget !== "ALL") params.set("budget", budget);
    router.push(`/search?${params.toString()}`);
  };

  return (
    <section className="relative min-h-[90vh] w-full overflow-hidden bg-slate-950 px-4 py-16 md:py-24">
      {/* Dynamic Background Image per selected Country */}
      <div className="absolute inset-0 z-0">
        <img
          src={market.heroImage}
          alt={market.countryName}
          className="h-full w-full object-cover object-center opacity-40 filter brightness-90 saturate-110 transition-opacity duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl text-center">
        {/* Country Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-teal-300 backdrop-blur-md">
          <span className="text-base">{market.flag}</span>
          Official {market.countryName} Real Estate Portal
        </div>

        {/* Headline */}
        <h1 className="mt-6 font-serif text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl leading-tight">
          {market.heroHeadline}
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-base text-slate-300 sm:text-lg">
          {market.heroSubheadline}
        </p>

        {/* Multi-Tab Glassmorphism Search Box */}
        <div className="mx-auto mt-10 max-w-4xl rounded-2xl border border-white/10 bg-slate-900/80 p-4 shadow-2xl backdrop-blur-xl sm:p-6">
          <div className="flex flex-wrap items-center gap-2 border-b border-slate-800/80 pb-4">
            {(
              [
                { id: "BUY", label: "Buy Property" },
                { id: "RENT", label: "Rent / Lease" },
                { id: "COMMERCIAL", label: "Commercial" },
                { id: "PLOTS", label: "Plots & Land" },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-xl px-5 py-2.5 text-xs font-semibold transition-all duration-200 sm:text-sm ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 shadow-lg shadow-teal-500/20"
                    : "text-slate-400 hover:bg-slate-800/60 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Inputs */}
          <form onSubmit={handleSearch} className="mt-4 grid gap-3 sm:grid-cols-4">
            <div className="flex flex-col text-left">
              <label className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                City / Locality in {market.countryName}
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder={market.searchPlaceholder}
                className="w-full rounded-xl border border-slate-700/80 bg-slate-950/70 px-3.5 py-3 text-sm text-white placeholder:text-slate-500 focus:border-teal-400 focus:outline-none"
              />
            </div>

            <div className="flex flex-col text-left">
              <label className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Property Type
              </label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full rounded-xl border border-slate-700/80 bg-slate-950/70 px-3.5 py-3 text-sm text-white focus:border-teal-400 focus:outline-none"
              >
                <option value="ALL">All Property Types</option>
                <option value="APARTMENT">Apartments & Penthouses</option>
                <option value="VILLA">Luxury Villas</option>
                <option value="COMMERCIAL">Commercial Offices</option>
                <option value="PLOT">Residential Plots</option>
              </select>
            </div>

            <div className="flex flex-col text-left">
              <label className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Budget ({market.currency})
              </label>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full rounded-xl border border-slate-700/80 bg-slate-950/70 px-3.5 py-3 text-sm text-white focus:border-teal-400 focus:outline-none"
              >
                <option value="ALL">Any Budget</option>
                <option value="low">Standard Luxury</option>
                <option value="mid">High End Luxury</option>
                <option value="high">Super Prime Ultra Luxury</option>
              </select>
            </div>

            <div className="flex flex-col justify-end">
              <button
                type="submit"
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-400 to-emerald-400 py-3 px-6 font-semibold text-slate-950 transition hover:opacity-90 hover:shadow-lg hover:shadow-teal-500/25 active:scale-95"
              >
                🔍 Search {market.countryName}
              </button>
            </div>
          </form>
        </div>

        {/* Popular Tags */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400">
          <span className="font-semibold text-slate-300">Top Locations in {market.countryName}:</span>
          {countryCities.map((city, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => router.push(`/${market.slug}/${city.slug}`)}
              className="rounded-full border border-slate-800 bg-slate-900/60 px-3 py-1 hover:border-teal-500/40 hover:text-teal-300"
            >
              📍 {city.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
