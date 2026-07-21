"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"BUY" | "RENT" | "COMMERCIAL" | "PLOTS">("BUY");
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("ALL");
  const [budget, setBudget] = useState("ALL");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set("purpose", activeTab === "RENT" ? "RENT" : "SALE");
    if (location) params.set("q", location);
    if (propertyType !== "ALL") params.set("type", propertyType);
    if (budget !== "ALL") params.set("budget", budget);
    router.push(`/search?${params.toString()}`);
  };

  return (
    <section className="relative min-h-[90vh] w-full overflow-hidden bg-slate-950 px-4 py-16 md:py-24">
      {/* Background Image with Ambient Glow and Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=80"
          alt="Luxury Architecture"
          className="h-full w-full object-cover object-center opacity-40 filter brightness-90 saturate-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40" />
        <div className="absolute inset-0 bg-radial-vignette opacity-80" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-teal-300 backdrop-blur-md">
          <span className="flex h-2 w-2 rounded-full bg-teal-400 animate-pulse" />
          India's Premier Luxury Real Estate Platform
        </div>

        {/* Main Headline matching reference */}
        <h1 className="mt-6 font-serif text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl leading-tight">
          Find your next <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-white via-slate-200 to-amber-200 bg-clip-text text-transparent">
            premium property.
          </span>
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-base text-slate-300 sm:text-lg">
          Search top luxury villas, modern apartments, commercial spaces, and verified plots with trusted real estate experts.
        </p>

        {/* Multi-Tab Glassmorphism Search Box */}
        <div className="mx-auto mt-10 max-w-4xl rounded-2xl border border-white/10 bg-slate-900/80 p-4 shadow-2xl backdrop-blur-xl sm:p-6">
          {/* Tabs */}
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

          {/* Form */}
          <form onSubmit={handleSearch} className="mt-4 grid gap-3 sm:grid-cols-4">
            {/* Location Input */}
            <div className="flex flex-col text-left">
              <label className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Location / City
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Bandra, Mumbai, BKC"
                  className="w-full rounded-xl border border-slate-700/80 bg-slate-950/70 px-3.5 py-3 text-sm text-white placeholder:text-slate-500 focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-400"
                />
              </div>
            </div>

            {/* Property Type Dropdown */}
            <div className="flex flex-col text-left">
              <label className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Property Type
              </label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full rounded-xl border border-slate-700/80 bg-slate-950/70 px-3.5 py-3 text-sm text-white focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-400"
              >
                <option value="ALL">All Property Types</option>
                <option value="APARTMENT">Apartments & Penthouses</option>
                <option value="VILLA">Luxury Villas</option>
                <option value="COMMERCIAL">Commercial Offices</option>
                <option value="PLOT">Residential Plots</option>
              </select>
            </div>

            {/* Budget Dropdown */}
            <div className="flex flex-col text-left">
              <label className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Budget Range
              </label>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full rounded-xl border border-slate-700/80 bg-slate-950/70 px-3.5 py-3 text-sm text-white focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-400"
              >
                <option value="ALL">Any Price</option>
                <option value="50lakh-1cr">₹50 Lakh – ₹1 Cr</option>
                <option value="1cr-3cr">₹1 Cr – ₹3 Cr</option>
                <option value="above-3cr">₹3 Cr + (Super Luxury)</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="flex flex-col justify-end">
              <button
                type="submit"
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-400 to-emerald-400 py-3 px-6 font-semibold text-slate-950 transition hover:opacity-90 hover:shadow-lg hover:shadow-teal-500/25 active:scale-95"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                </svg>
                Search Properties
              </button>
            </div>
          </form>
        </div>

        {/* Quick Popular Pills */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400">
          <span className="font-semibold text-slate-300">Popular:</span>
          {[
            { label: "Luxury Villas in Bandra", url: "/search?q=Bandra&type=VILLA" },
            { label: "Sea-Facing Flats", url: "/search?q=Sea+Facing" },
            { label: "Commercial Offices BKC", url: "/search?q=BKC&type=COMMERCIAL" },
            { label: "Plots in Pune", url: "/search?q=Pune&type=PLOT" },
          ].map((tag, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => router.push(tag.url)}
              className="rounded-full border border-slate-800 bg-slate-900/60 px-3 py-1 hover:border-teal-500/40 hover:text-teal-300"
            >
              {tag.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
