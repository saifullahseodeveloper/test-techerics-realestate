import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { GLOBAL_CITIES } from "@/lib/global-locations";

export const metadata: Metadata = {
  title: "Properties for Sale — Buy Luxury Apartments, Villas & Homes | Tech Erics",
  description: "Browse verified properties for sale across Dubai, Mumbai, London, New York and 100+ global cities. Luxury apartments, villas, penthouses & commercial spaces.",
};

export default async function BuyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const cities = GLOBAL_CITIES.slice(0, 12);

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-16 text-slate-100">
      <div className="mx-auto max-w-6xl">
        <span className="text-xs font-bold uppercase tracking-widest text-teal-400">Buy Property</span>
        <h1 className="mt-2 font-serif text-3xl font-bold text-white sm:text-5xl">
          Properties for Sale Worldwide
        </h1>
        <p className="mt-4 max-w-2xl text-sm text-slate-400 leading-relaxed">
          Find your perfect home or investment property. Browse RERA-verified luxury apartments, sea-facing villas, penthouses, and commercial spaces across 14+ countries.
        </p>

        <h2 className="mt-12 font-serif text-xl font-bold text-white">Browse by City</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cities.map((city) => (
            <Link
              key={city.slug}
              href={`/${locale}/${city.slug}/apartments/for-sale`}
              className="group rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:border-teal-400"
            >
              <span className="text-base font-bold text-white group-hover:text-teal-300">
                📍 Properties for Sale in {city.name}
              </span>
              <span className="mt-1 block text-xs text-slate-500">{city.countryName} · {city.regionName}</span>
            </Link>
          ))}
        </div>

        <h2 className="mt-12 font-serif text-xl font-bold text-white">Browse by Property Type</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {["Apartments", "Villas", "Penthouses", "Townhouses", "Studios", "Plots"].map((type) => (
            <Link
              key={type}
              href={`/${locale}/dubai/${type.toLowerCase()}/for-sale`}
              className="rounded-xl border border-slate-800 bg-slate-900 px-5 py-2.5 text-xs font-semibold text-slate-300 hover:border-teal-400 hover:text-white transition"
            >
              {type} for Sale
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
