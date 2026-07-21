"use client";

import Link from "next/link";

export default function HeroAppleMinimal() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32 border-b border-slate-200">
      <div className="mx-auto max-w-5xl px-4 text-center">
        <span className="inline-block rounded-full bg-slate-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-slate-800 border border-slate-200 mb-6">
          Introducing Modern Architectural Living
        </span>

        <h1 className="font-sans text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
          Elegance in every detail. <br />
          <span className="text-slate-500 font-normal">Designed for exceptional life.</span>
        </h1>

        <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Discover handpicked luxury penthouses, oceanfront estates, and architectural masterpieces across world-class locations.
        </p>

        {/* Apple Minimal Search Bar */}
        <div className="mt-10 max-w-xl mx-auto flex items-center gap-2 rounded-2xl bg-white p-2 border border-slate-300 shadow-lg">
          <input
            type="text"
            placeholder="Search location, developer or project..."
            className="flex-1 bg-transparent px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none font-sans"
          />
          <Link
            href="/en/search"
            className="rounded-xl bg-slate-900 px-6 py-3 text-xs font-semibold text-white transition hover:bg-slate-800"
          >
            Search
          </Link>
        </div>

        {/* Product Showcase Image */}
        <div className="mt-16 overflow-hidden rounded-3xl border border-slate-200 bg-white p-3 shadow-2xl">
          <div className="relative aspect-[21/9] w-full overflow-hidden rounded-2xl">
            <img
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80"
              alt="Apple Minimal Estate"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
