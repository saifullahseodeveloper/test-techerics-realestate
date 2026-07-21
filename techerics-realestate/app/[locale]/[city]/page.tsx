import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";
import PropertyCard from "@/components/PropertyCard";
import FaqSchema from "@/components/FaqSchema";

export const revalidate = 3600;

type Props = { params: Promise<{ locale: string; city: string }> };

async function getCityData(citySlug: string) {
  return prisma.city.findFirst({
    where: { slug: citySlug },
    include: {
      localities: { take: 30 },
      properties: {
        include: { media: { take: 1 }, listings: { take: 1, orderBy: { listedAt: "desc" } } },
        take: 24,
        orderBy: { createdAt: "desc" },
      },
    },
  });
}

export async function generateStaticParams() {
  const cities = await prisma.city.findMany({ select: { slug: true } });
  return cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = await getCityData(citySlug);
  if (!city) return {};

  return {
    title: `Property for Sale & Rent in ${city.name} | Tech Erics`,
    description: `Browse ${city.properties.length}+ verified properties in ${city.name}. Apartments, villas, plots & commercial spaces with 360° tours and direct WhatsApp contact.`,
    alternates: { canonical: `/${citySlug}` },
  };
}

export default async function CityPage({ params }: Props) {
  const { city: citySlug } = await params;
  const city = await getCityData(citySlug);
  if (!city) notFound();

  const avgPrice =
    city.localities.filter((l) => l.avgPricePerSqft).reduce((sum, l) => sum + (l.avgPricePerSqft ?? 0), 0) /
    (city.localities.filter((l) => l.avgPricePerSqft).length || 1);

  const faqs = [
    {
      q: `What is the average property price in ${city.name}?`,
      a: `The average price across localities in ${city.name} is approximately ₹${Math.round(avgPrice) || "N/A"} per sqft, based on current active listings.`,
    },
    {
      q: `Which localities are most popular in ${city.name}?`,
      a: `${city.localities.slice(0, 5).map((l) => l.name).join(", ")} are among the most searched localities in ${city.name}.`,
    },
  ];

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <FaqSchema faqs={faqs} />
      <nav className="mb-4 text-sm text-slate-400">Home / {city.name}</nav>
      <h1 className="text-2xl font-semibold text-slate-100">
        Properties for Sale & Rent in {city.name}
      </h1>
      {city.seoContent && <p className="mt-3 max-w-3xl text-slate-300">{city.seoContent}</p>}

      <section className="mt-6">
        <h2 className="mb-2 text-sm font-medium text-slate-300">Explore Localities</h2>
        <div className="flex flex-wrap gap-2">
          {city.localities.map((l) => (
            <Link
              key={l.id}
              href={`/${city.slug}/${l.slug}`}
              className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300 hover:border-teal-500 hover:text-teal-400"
            >
              {l.name}
            </Link>
          ))}
        </div>
      </section>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {city.properties.map((p) => (
          <PropertyCard key={p.id} property={p} />
        ))}
      </div>

      <section className="mt-12">
        <h2 className="text-lg font-semibold text-slate-100">Frequently Asked Questions</h2>
        {faqs.map((f) => (
          <details key={f.q} className="mt-2 rounded border border-slate-700 p-3">
            <summary className="cursor-pointer text-slate-200">{f.q}</summary>
            <p className="mt-2 text-slate-400">{f.a}</p>
          </details>
        ))}
      </section>
    </main>
  );
}
