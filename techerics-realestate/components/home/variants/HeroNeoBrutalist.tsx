"use client";

import Link from "next/link";

export default function HeroNeoBrutalist() {
  return (
    <section className="relative bg-yellow-50 py-20 border-b-4 border-black text-black">
      <div className="mx-auto max-w-5xl px-4 text-center">
        <span className="inline-block bg-rose-500 px-4 py-2 text-xs font-black uppercase text-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-6">
          ⚡ ZERO COMMISSIONS · REAL ESTATE UNLOCKED
        </span>

        <h1 className="font-sans text-4xl sm:text-7xl font-black uppercase tracking-tight leading-none">
          FIND YOUR SPACE. <br />
          <span className="bg-emerald-300 px-3 border-2 border-black inline-block mt-2">NO BS LISTINGS.</span>
        </h1>

        <p className="mt-6 text-base sm:text-xl font-mono max-w-2xl mx-auto font-bold">
          Verified apartments, brutalist penthouses, and commercial hubs with 360° virtual walkthroughs.
        </p>

        {/* Neo Brutalist Search Box */}
        <div className="mt-10 max-w-xl mx-auto flex flex-col sm:flex-row gap-3 bg-white p-3 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <input
            type="text"
            placeholder="Type city or property slug..."
            className="flex-1 bg-transparent px-3 py-2 text-sm text-black placeholder-slate-500 font-mono font-bold focus:outline-none"
          />
          <Link
            href="/en/search"
            className="bg-rose-500 px-6 py-3 text-xs font-black uppercase text-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
          >
            SEARCH NOW →
          </Link>
        </div>
      </div>
    </section>
  );
}
