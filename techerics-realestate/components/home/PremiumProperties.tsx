"use client";

import { useState } from "react";
import Link from "next/link";
import { useCountry } from "@/lib/country-context";

export default function PremiumProperties() {
  const { market } = useCountry();
  const [activeTab, setActiveTab] = useState<"ALL" | "VILLA" | "APARTMENT" | "COMMERCIAL">("ALL");

  const filteredListings = market.sampleProperties.filter(
    (item) => activeTab === "ALL" || item.type === activeTab
  );

  return (
    <section className="bg-slate-950 px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-400">
            {market.flag} Exclusive {market.countryName} Properties
          </span>
          <h2 className="mt-1 font-serif text-2xl font-bold text-white sm:text-3xl">
            Premium Residences in {market.countryName}
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Verified luxury apartments, villas, and commercial spaces across prime localities.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {[
            { id: "ALL", label: "All Properties" },
            { id: "VILLA", label: "Luxury Villas" },
            { id: "APARTMENT", label: "Apartments" },
            { id: "COMMERCIAL", label: "Commercial Offices" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`rounded-full px-5 py-2 text-xs font-semibold transition ${
                activeTab === tab.id
                  ? "bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20"
                  : "border border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dynamic Property Grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {filteredListings.map((prop) => {
            const propSlug = prop.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
            return (
              <div
                key={prop.id}
                className="group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-lg transition-all duration-300 hover:border-teal-500/50 hover:shadow-xl sm:flex"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden sm:w-1/2 sm:aspect-auto">
                  <img
                    src={prop.image}
                    alt={prop.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 rounded-md bg-slate-950/80 px-2.5 py-1 text-[10px] font-bold text-teal-300 backdrop-blur border border-teal-500/30">
                    {prop.purpose}
                  </span>
                </div>

                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <span className="text-[11px] font-semibold text-teal-400 uppercase tracking-wider">
                      📍 {prop.location}
                    </span>

                    <h3 className="mt-1 text-base font-bold text-white group-hover:text-teal-300 leading-snug">
                      <Link href={`/projects/${propSlug}`}>{prop.title}</Link>
                    </h3>

                    <div className="mt-3 flex items-center gap-3 text-xs text-slate-400 font-medium">
                      <span>🛏️ {prop.bhk}</span>
                      <span>🛁 {prop.bath}</span>
                      <span>📐 {prop.area}</span>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider text-slate-500">Price ({market.currency})</span>
                      <span className="text-lg font-bold text-teal-300">{prop.price}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={`https://wa.me/919876543210?text=Hi,%20I'm%20interested%20in%20${encodeURIComponent(prop.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-xl bg-emerald-500/10 px-3 py-2 text-xs font-semibold text-emerald-400 transition hover:bg-emerald-500/20"
                      >
                        💬 WhatsApp
                      </a>
                      <Link
                        href={`/projects/${propSlug}`}
                        className="rounded-xl bg-teal-500 px-3.5 py-2 text-xs font-semibold text-slate-950 transition hover:bg-teal-400"
                      >
                        Enquire →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
