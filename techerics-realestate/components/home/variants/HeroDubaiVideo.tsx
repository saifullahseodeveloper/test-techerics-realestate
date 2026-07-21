"use client";

import Link from "next/link";

export default function HeroDubaiVideo() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden border-b border-amber-500/20 bg-black text-amber-50">
      {/* Background Video / Skyline Overlay */}
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-luminosity">
        <img
          src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1920&q=80"
          alt="Dubai Skyline Night"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center py-20">
        <span className="inline-block rounded-full bg-amber-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-300 border border-amber-500/30 mb-6">
          👑 Private Concierge Real Estate
        </span>

        <h1 className="font-serif text-4xl sm:text-7xl font-bold tracking-wide text-white leading-tight">
          Ultra-Luxury Estates <br />
          <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent">
            In Dubai & World Capitals
          </span>
        </h1>

        <p className="mt-6 text-sm sm:text-lg text-amber-100/80 max-w-2xl mx-auto font-sans leading-relaxed">
          Access off-market penthouses, private island villas, and high-yield EMAAR & DAMAC masterplan developments.
        </p>

        {/* Dubai Gold Search Box */}
        <div className="mt-10 max-w-2xl mx-auto flex flex-col sm:flex-row items-center gap-3 rounded-3xl bg-zinc-950/90 p-3 border border-amber-500/30 shadow-2xl backdrop-blur-xl">
          <input
            type="text"
            placeholder="Search Palm Jumeirah, Downtown Dubai, BKC..."
            className="flex-1 bg-transparent px-4 py-3 text-sm text-amber-50 placeholder-amber-200/40 focus:outline-none font-sans"
          />
          <Link
            href="/en/search"
            className="w-full sm:w-auto rounded-2xl bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 px-8 py-3.5 text-xs font-extrabold text-black shadow-lg shadow-amber-500/20 transition hover:opacity-90"
          >
            Explore Off-Market →
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="mt-16 grid grid-cols-3 gap-4 max-w-xl mx-auto text-center border-t border-amber-500/20 pt-8">
          <div>
            <span className="block font-serif text-2xl sm:text-3xl font-extrabold text-amber-300">$10B+</span>
            <span className="text-[10px] uppercase font-bold text-amber-200/60">Portfolio Value</span>
          </div>
          <div>
            <span className="block font-serif text-2xl sm:text-3xl font-extrabold text-amber-300">8.4%</span>
            <span className="text-[10px] uppercase font-bold text-amber-200/60">Avg Rental Yield</span>
          </div>
          <div>
            <span className="block font-serif text-2xl sm:text-3xl font-extrabold text-amber-300">100%</span>
            <span className="text-[10px] uppercase font-bold text-amber-200/60">RERA Compliant</span>
          </div>
        </div>
      </div>
    </section>
  );
}
