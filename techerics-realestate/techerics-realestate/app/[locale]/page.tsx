import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";
import SearchBar from "@/components/SearchBar";
import PropertyCard from "@/components/PropertyCard";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Find Verified Properties for Sale & Rent | Tech Erics",
  description:
    "Search apartments, villas, plots & commercial properties with 360° tours, verified listings, and direct WhatsApp contact — across every major city.",
};

export default async function HomePage() {
  const [featured, cities] = await Promise.all([
    prisma.property.findMany({
      take: 8,
      orderBy: { createdAt: "desc" },
      include: { media: { take: 1 }, listings: { take: 1, orderBy: { listedAt: "desc" } } },
    }),
    prisma.city.findMany({ take: 12 }),
  ]);

  return (
    <main>
      {/* Hero */}
      <section className="bg-hero-gradient px-4 py-20 text-center">
        <h1 className="animate-fade-up text-3xl font-semibold text-slate-100 sm:text-4xl">
          Find your next home,{" "}
          <span className="bg-gradient-to-r from-teal-400 to-violet-400 bg-clip-text text-transparent">
            without the guesswork
          </span>
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-slate-400">
          Verified listings, 360° virtual tours, and instant WhatsApp contact —
          across every major city.
        </p>
        <div className="mt-8">
          <SearchBar />
        </div>
      </section>

      {/* Cities grid */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="mb-4 text-lg font-medium text-slate-200">Explore by City</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-6">
          {cities.map((c) => (
            <Link
              key={c.id}
              href={`/${c.slug}`}
              className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-4 text-center text-sm text-slate-300 transition hover:border-teal-500/50 hover:text-teal-400"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Featured listings */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="mb-4 text-lg font-medium text-slate-200">Featured Properties</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
          {!featured.length && (
            <p className="col-span-full text-slate-500">
              No properties yet — add your first listing from the admin dashboard.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
