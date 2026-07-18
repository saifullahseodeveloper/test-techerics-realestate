import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import PropertyCard from "@/components/PropertyCard";
import type { Prisma, PropertyType } from "@prisma/client";

type SearchParams = {
  q?: string;
  purpose?: "SALE" | "RENT";
  type?: string;
  budget?: string;
  bedrooms?: string;
};

// Filtered/search URLs are intentionally noindexed (see robots.ts —
// disallow: /*?*sort=, /*?*page=) to protect crawl budget; this page's
// canonical logic keeps that consistent so Google doesn't waste crawl
// budget on the near-infinite combinations of filters.
export const metadata: Metadata = {
  title: "Search Properties",
  robots: { index: false, follow: true },
};

const BUDGET_RANGES: Record<string, [number, number]> = {
  "under-20-lakh": [0, 2_000_000],
  "20-50-lakh": [2_000_000, 5_000_000],
  "50lakh-1cr": [5_000_000, 10_000_000],
  "above-1cr": [10_000_000, Number.MAX_SAFE_INTEGER],
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { q, purpose, type, budget, bedrooms } = await searchParams;

  const where: Prisma.PropertyWhereInput = {};

  if (q) {
    where.OR = [
      { title: { contains: q, mode: "insensitive" } },
      { city: { name: { contains: q, mode: "insensitive" } } },
      { locality: { name: { contains: q, mode: "insensitive" } } },
    ];
  }
  if (type) where.propertyType = type as PropertyType;
  if (bedrooms) where.bedrooms = Number(bedrooms);
  if (purpose || budget) {
    where.listings = {
      some: {
        ...(purpose ? { purpose } : {}),
        ...(budget && BUDGET_RANGES[budget]
          ? { price: { gte: BUDGET_RANGES[budget][0], lte: BUDGET_RANGES[budget][1] } }
          : {}),
      },
    };
  }

  const properties = await prisma.property.findMany({
    where,
    take: 30,
    orderBy: { createdAt: "desc" },
    include: { media: { take: 1 }, listings: { take: 1, orderBy: { listedAt: "desc" } } },
  });

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-1 text-xl font-semibold text-slate-100">
        {q ? `Results for "${q}"` : "Search Properties"}
      </h1>
      <p className="mb-6 text-sm text-slate-400">{properties.length} properties found</p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {properties.map((p) => (
          <PropertyCard key={p.id} property={p} />
        ))}
        {!properties.length && (
          <p className="col-span-full text-slate-500">
            No properties match your filters. Try broadening your search.
          </p>
        )}
      </div>
    </main>
  );
}
