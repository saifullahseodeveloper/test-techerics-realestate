import type { Metadata } from "next";
import Link from "next/link";
import { GLOBAL_CITIES } from "@/lib/global-locations";

export const metadata: Metadata = {
  title: "Properties for Rent — Luxury Apartments, Villas & Office Spaces | Tech Erics",
  description: "Find verified properties for rent across Dubai, Mumbai, London, New York and 100+ cities. Luxury apartments, furnished villas, commercial offices & warehouses.",
};

export default async function RentPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const cities = GLOBAL_CITIES.slice(0, 12);

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-16 text-slate-100">
      <div className="mx-auto max-w-6xl">
        <span className="text-xs font-bold uppercase tracking-widest text-teal-400">Rent Property</span>
        <h1 className="mt-2 font-serif text-3xl font-bold text-white sm:text-5xl">
          Properties for Rent Worldwide
        </h1>
        <p className="mt-4 max-w-2xl text-sm text-slate-400 leading-relaxed">
          Discover furnished apartments, executive villas, commercial offices, and warehouse spaces available for lease across 14+ countries.
        </p>

        <h2 className="mt-12 font-serif text-xl font-bold text-white">Browse Rentals by City</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cities.map((city) => (
            <Link
              key={city.slug}
              href={`/${locale}/${city.slug}/apartments/for-rent`}
              className="group rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:border-teal-400"
            >
              <span className="text-base font-bold text-white group-hover:text-teal-300">
                🔑 Rentals in {city.name}
              </span>
              <span className="mt-1 block text-xs text-slate-500">{city.countryName}</span>
            </Link>
          ))}
        </div>

        <h2 className="mt-12 font-serif text-xl font-bold text-white">Rent by Type</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {["Apartments", "Villas", "Offices", "Shops", "Warehouses", "Studios"].map((type) => (
            <Link
              key={type}
              href={`/${locale}/dubai/${type.toLowerCase()}/for-rent`}
              className="rounded-xl border border-slate-800 bg-slate-900 px-5 py-2.5 text-xs font-semibold text-slate-300 hover:border-teal-400 hover:text-white transition"
            >
              {type} for Rent
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
