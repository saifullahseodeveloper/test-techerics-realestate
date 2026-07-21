"use client";

import Link from "next/link";
import { useCountry } from "@/lib/country-context";

export default function NewProjectsPage() {
  const { market } = useCountry();

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-16 text-slate-100">
      <div className="mx-auto max-w-6xl">
        <span className="text-xs font-bold uppercase tracking-widest text-teal-400">
          {market.flag} New Launches in {market.countryName}
        </span>
        <h1 className="mt-2 font-serif text-3xl font-bold text-white sm:text-5xl">
          New Project Launches & Off-Plan Developments in {market.countryName}
        </h1>
        <p className="mt-4 max-w-2xl text-sm text-slate-400 leading-relaxed">
          Get early access to the latest off-plan and under-construction projects by top developers in {market.countryName}. RERA registered with flexible payment plan options.
        </p>

        {/* Featured Projects for Active Market */}
        <h2 className="mt-12 font-serif text-xl font-bold text-white">
          Featured Off-Plan Projects ({market.countryName})
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {market.sampleProjects.map((proj) => (
            <Link
              key={proj.id}
              href={`/${market.slug}/property/${proj.id}`}
              className="group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-lg transition hover:border-teal-400"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img src={proj.image} alt={proj.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                <span className="absolute top-3 left-3 rounded bg-rose-600 px-2.5 py-1 text-[10px] font-bold text-white">{proj.badge}</span>
              </div>
              <div className="p-5">
                <span className="text-xs text-teal-400 font-semibold">📍 {proj.location}</span>
                <h3 className="mt-1 text-base font-bold text-white group-hover:text-teal-300">{proj.title}</h3>
                <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                  <span>{proj.bhk}</span>
                  <span className="text-base font-extrabold text-amber-300">{proj.price}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Developers in Active Market */}
        <h2 className="mt-14 font-serif text-xl font-bold text-white">
          Top Developers in {market.countryName}
        </h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {market.topDevelopers.map((dev) => (
            <Link
              key={dev.slug}
              href={`/${market.slug}/developers/${dev.slug}`}
              className="rounded-full border border-slate-800 bg-slate-900 px-4 py-2 text-xs font-semibold text-slate-300 hover:border-teal-400 hover:text-white transition"
            >
              {dev.logo} {dev.name} ({dev.projectsCount})
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
