"use client";

import { useState } from "react";
import Link from "next/link";

type ListingItem = {
  id: string;
  title: string;
  location: string;
  price: string;
  type: string;
  bhk: string;
  bath: string;
  area: string;
  image: string;
  tag: string;
  purpose: "FOR SALE" | "FOR RENT";
};

const SAMPLE_LISTINGS: ListingItem[] = [
  {
    id: "prop-1",
    title: "Sea-Facing Modern Villa with Private Garden",
    location: "Bandra West, Mumbai",
    price: "₹ 7.50 Cr",
    type: "VILLA",
    bhk: "4 BHK",
    bath: "4 Bath",
    area: "3,400 sqft",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
    tag: "FEATURED VILLA",
    purpose: "FOR SALE",
  },
  {
    id: "prop-2",
    title: "Luxury Duplex Penthouse in Golf Course Road",
    location: "DLF Phase 5, Gurgaon",
    price: "₹ 5.20 Cr",
    type: "APARTMENT",
    bhk: "3 BHK",
    bath: "3 Bath",
    area: "2,600 sqft",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
    tag: "SUPER LUXURY",
    purpose: "FOR SALE",
  },
  {
    id: "prop-3",
    title: "Grade-A Commercial Office Space in Financial District",
    location: "BKC, Mumbai",
    price: "₹ 2.80 Lakh / mo",
    type: "COMMERCIAL",
    bhk: "Furnished",
    bath: "2 Restrooms",
    area: "1,850 sqft",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    tag: "COMMERCIAL HUB",
    purpose: "FOR RENT",
  },
  {
    id: "prop-4",
    title: "Gated Community Contemporary Family Residence",
    location: "Koregaon Park, Pune",
    price: "₹ 3.15 Cr",
    type: "VILLA",
    bhk: "3 BHK",
    bath: "3 Bath",
    area: "2,200 sqft",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    tag: "READY TO MOVE",
    purpose: "FOR SALE",
  },
];

export default function PremiumProperties() {
  const [activeTab, setActiveTab] = useState<"ALL" | "VILLA" | "APARTMENT" | "COMMERCIAL">("ALL");

  const filteredListings = SAMPLE_LISTINGS.filter(
    (item) => activeTab === "ALL" || item.type === activeTab
  );

  return (
    <section className="bg-slate-950 px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-400">
            Exclusive Residences
          </span>
          <h2 className="mt-1 font-serif text-2xl font-bold text-white sm:text-3xl">
            Premium Properties
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Verified luxury apartments, villas, and commercial spaces across prime localities.
          </p>
        </div>

        {/* Category Tabs matching section 5 of reference image */}
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

        {/* Property Grid matching section 5 of reference image */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {filteredListings.map((prop) => (
            <div
              key={prop.id}
              className="group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-lg transition-all duration-300 hover:border-teal-500/50 hover:shadow-xl sm:flex"
            >
              {/* Left Image */}
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

              {/* Right Content */}
              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  <span className="text-[11px] font-semibold text-teal-400 uppercase tracking-wider">
                    📍 {prop.location}
                  </span>

                  <h3 className="mt-1 text-base font-bold text-white group-hover:text-teal-300 leading-snug">
                    {prop.title}
                  </h3>

                  <div className="mt-3 flex items-center gap-3 text-xs text-slate-400 font-medium">
                    <span>🛏️ {prop.bhk}</span>
                    <span>🛁 {prop.bath}</span>
                    <span>📐 {prop.area}</span>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-slate-500">Price</span>
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
                      href={`/search?q=${encodeURIComponent(prop.location)}`}
                      className="rounded-xl bg-teal-500 px-3 py-2 text-xs font-semibold text-slate-950 transition hover:bg-teal-400"
                    >
                      Enquire
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
