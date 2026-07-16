import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import PropertyCard from "@/components/PropertyCard";
import FaqSchema from "@/components/FaqSchema";

// Programmatic SEO page — ek hi template se har locality ke liye
// automatically unique page ban jaata hai (Zillow/Backlinko pattern).
export const revalidate = 3600; // 1 ghante me revalidate — naye listings reflect honge

type Props = { params: Promise<{ locale: string; city: string; locality: string }> };

async function getLocalityData(citySlug: string, localitySlug: string) {
  const locality = await prisma.locality.findFirst({
    where: { slug: localitySlug, city: { slug: citySlug } },
    include: {
      city: true,
      properties: {
        include: { media: { take: 1 }, listings: { take: 1, orderBy: { listedAt: "desc" } } },
        take: 24,
      },
    },
  });
  return locality;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: citySlug, locality: localitySlug } = await params;
  const locality = await getLocalityData(citySlug, localitySlug);
  if (!locality) return {};

  return {
    title: `Property for Sale & Rent in ${locality.name}, ${locality.city.name} | Tech Erics`,
    description: `Explore ${locality.properties.length}+ verified properties in ${locality.name}, ${locality.city.name}. Avg price ₹${locality.avgPricePerSqft ?? "N/A"}/sqft. Photos, 360° tours & direct WhatsApp contact.`,
    alternates: {
      canonical: `/${citySlug}/${localitySlug}`,
    },
  };
}

export default async function LocalityPage({ params }: Props) {
  const { city: citySlug, locality: localitySlug } = await params;
  const locality = await getLocalityData(citySlug, localitySlug);
  if (!locality) notFound();

  // FAQ content — dynamically built from real data (E-E-A-T ke liye
  // generic placeholder text nahi, actual numbers use kiye)
  const faqs = [
    {
      q: `What is the average property price in ${locality.name}?`,
      a: `The average price in ${locality.name}, ${locality.city.name} is approximately ₹${locality.avgPricePerSqft ?? "N/A"} per sqft based on current active listings.`,
    },
    {
      q: `How many properties are available in ${locality.name} right now?`,
      a: `There are currently ${locality.properties.length} verified listings available in ${locality.name}.`,
    },
  ];

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <FaqSchema faqs={faqs} />
      <nav className="mb-4 text-sm text-slate-400">
        Home / {locality.city.name} / {locality.name}
      </nav>
      <h1 className="text-2xl font-semibold text-slate-100">
        Properties for Sale & Rent in {locality.name}, {locality.city.name}
      </h1>
      {locality.seoContent && (
        <p className="mt-3 max-w-3xl text-slate-300">{locality.seoContent}</p>
      )}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {locality.properties.map((p) => (
          <PropertyCard key={p.id} property={p} />
        ))}
      </div>

      <section className="mt-12">
        <h2 className="text-lg font-semibold text-slate-100">
          Frequently Asked Questions
        </h2>
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
