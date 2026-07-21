"use client";

import { useState } from "react";
import Link from "next/link";

type ProjectItem = {
  id: string;
  title: string;
  location: string;
  developer: string;
  price: string;
  status: string;
  bhk: string;
  sqft: string;
  image: string;
  badge: string;
};

const SAMPLE_PROJECTS: ProjectItem[] = [
  {
    id: "proj-1",
    title: "The Grand Horizon Luxury Estates",
    location: "Bandra West, Mumbai",
    developer: "Oberoi Realty",
    price: "₹ 4.85 Cr Onwards",
    status: "FOR SALE",
    bhk: "3 & 4 BHK",
    sqft: "1,850 - 2,900 sqft",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    badge: "HOT LAUNCH",
  },
  {
    id: "proj-2",
    title: "Palais Royale Skyline Penthouses",
    location: "Worli, Mumbai",
    developer: "LODHA Group",
    price: "₹ 8.50 Cr Onwards",
    status: "FOR SALE",
    bhk: "4 & 5 BHK",
    sqft: "3,200 - 5,100 sqft",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
    badge: "EXCLUSIVE",
  },
  {
    id: "proj-3",
    title: "Verdant Greens Golf Villas",
    location: "Golf Course Road, Gurgaon",
    developer: "DLF Limited",
    price: "₹ 6.20 Cr Onwards",
    status: "FOR SALE",
    bhk: "4 BHK Villa",
    sqft: "4,100 sqft",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    badge: "READY TO MOVE",
  },
];

export default function FeaturedProjects() {
  const [filter, setFilter] = useState<"ALL" | "SALE" | "RENT">("ALL");

  return (
    <section className="bg-slate-900 px-4 py-16">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-teal-400">
              Top New Launches
            </span>
            <h2 className="mt-1 font-serif text-2xl font-bold text-white sm:text-3xl">
              Featured Real Estate Developments
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Discover premier gated communities and sea-facing architectural marvels.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-950/80 p-1 text-xs">
            {(["ALL", "SALE", "RENT"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setFilter(mode)}
                className={`rounded-lg px-4 py-2 font-medium transition ${
                  filter === mode
                    ? "bg-teal-500 text-slate-950 shadow"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {mode === "ALL" ? "All Projects" : mode === "SALE" ? "For Sale" : "For Rent"}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid matching reference image card layout */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SAMPLE_PROJECTS.map((project) => (
            <div
              key={project.id}
              className="group overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950 transition-all duration-300 hover:-translate-y-1 hover:border-teal-500/50 hover:shadow-xl hover:shadow-teal-500/10"
            >
              {/* Image & Badge */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                
                {/* Badge top-left */}
                <span className="absolute top-3 left-3 rounded-md bg-rose-500/90 px-2.5 py-1 text-[10px] font-bold tracking-wider text-white shadow-md backdrop-blur">
                  {project.badge}
                </span>

                {/* Developer Tag top-right */}
                <span className="absolute top-3 right-3 rounded-md bg-slate-900/90 px-2.5 py-1 text-[11px] font-medium text-slate-200 backdrop-blur border border-slate-700">
                  {project.developer}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-5">
                <div className="flex items-center justify-between text-xs text-teal-400">
                  <span>📍 {project.location}</span>
                  <span className="font-semibold">{project.status}</span>
                </div>

                <h3 className="mt-2 text-lg font-semibold text-white group-hover:text-teal-300">
                  {project.title}
                </h3>

                <div className="mt-3 flex items-center justify-between border-t border-b border-slate-800/80 py-2.5 text-xs text-slate-400">
                  <span>🛏️ {project.bhk}</span>
                  <span>📐 {project.sqft}</span>
                </div>

                {/* Price and CTA */}
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <span className="block text-[11px] uppercase tracking-wider text-slate-500">Starting From</span>
                    <span className="text-base font-bold text-teal-300">{project.price}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`https://wa.me/919876543210?text=Hi,%20I'm%20interested%20in%20${encodeURIComponent(project.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl bg-emerald-500/10 p-2 text-emerald-400 transition hover:bg-emerald-500/20"
                      title="Enquire on WhatsApp"
                    >
                      💬
                    </a>
                    <Link
                      href={`/search?q=${encodeURIComponent(project.location)}`}
                      className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-teal-500 hover:text-slate-950"
                    >
                      View Details
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
