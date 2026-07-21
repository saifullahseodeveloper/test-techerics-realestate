import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";
import PropertyCard from "@/components/PropertyCard";
import FaqSchema from "@/components/FaqSchema";
import { GLOBAL_CITIES, generateCitySchema } from "@/lib/global-locations";

export const revalidate = 3600;

type Props = { params: Promise<{ locale: string; city: string }> };

async function getCityData(citySlug: string) {
  try {
    const dbCity = await prisma.city.findFirst({
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

    if (dbCity) return { dbCity, globalCity: null };
  } catch (err) {
    console.error("City DB fetch fallback:", err);
  }

  const globalCity = GLOBAL_CITIES.find((c) => c.slug === citySlug);
  return { dbCity: null, globalCity };
}

export async function generateStaticParams() {
  try {
    const cities = await prisma.city.findMany({ select: { slug: true } });
    const dbSlugs = cities.map((c) => ({ city: c.slug }));
    const globalSlugs = GLOBAL_CITIES.map((c) => ({ city: c.slug }));
    return [...dbSlugs, ...globalSlugs];
  } catch {
    return GLOBAL_CITIES.map((c) => ({ city: c.slug }));
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: citySlug } = await params;
  const { dbCity, globalCity } = await getCityData(citySlug);

  const name = dbCity?.name || globalCity?.name || citySlug.replace(/-/g, " ");
  const desc =
    dbCity?.seoContent ||
    globalCity?.seoDescription ||
    `Browse verified real estate properties for sale & rent in ${name}. Penthouses, luxury villas, commercial offices & apartments.`;

  return {
    title: `Properties for Sale & Rent in ${name} | Tech Erics Global`,
    description: desc,
    alternates: { canonical: `/${citySlug}` },
  };
}

export default async function CityPage({ params }: Props) {
  const { city: citySlug } = await params;
  const { dbCity, globalCity } = await getCityData(citySlug);

  if (!dbCity && !globalCity) notFound();

  const cityName = dbCity?.name || globalCity?.name || citySlug;
  const countryName = globalCity?.countryName || "Global";
  const seoText = dbCity?.seoContent || globalCity?.seoDescription;

  const localities = dbCity?.localities.map((l) => l.name) || globalCity?.popularLocalities || [];

  const faqs = [
    {
      q: `What types of real estate properties are available in ${cityName}?`,
      a: `Tech Erics offers verified luxury apartments, sea-facing villas, penthouses, gated townships, and commercial spaces in ${cityName}.`,
    },
    {
      q: `Which are the top investment localities in ${cityName}?`,
      a: `${localities.slice(0, 5).join(", ")} are among the highest-demand residential and commercial hubs in ${cityName}.`,
    },
  ];

  const citySchema = globalCity ? generateCitySchema(globalCity) : null;

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100">
      <FaqSchema faqs={faqs} />
      {citySchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(citySchema) }}
        />
      )}

      <div className="mx-auto max-w-6xl">
        <nav className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Home / {countryName} / <span className="text-teal-400">{cityName}</span>
        </nav>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-10 shadow-2xl backdrop-blur">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-400">
            Global Real Estate Hub
          </span>
          <h1 className="mt-2 font-serif text-3xl font-bold text-white sm:text-5xl">
            Properties for Sale & Rent in {cityName}
          </h1>

          {seoText && (
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-300">
              {seoText}
            </p>
          )}

          {/* Popular Localities Pills */}
          <div className="mt-8">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Popular Localities in {cityName}:
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {localities.map((loc, idx) => (
                <Link
                  key={idx}
                  href={`/${citySlug}/${loc.toLowerCase().replace(/\s+/g, "-")}`}
                  className="rounded-full border border-slate-700 bg-slate-950 px-4 py-1.5 text-xs font-semibold text-slate-200 transition hover:border-teal-400 hover:text-teal-300"
                >
                  📍 {loc}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="mt-12">
          <h2 className="font-serif text-2xl font-bold text-white">
            Available Listings in {cityName}
          </h2>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {dbCity?.properties.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}

            {(!dbCity?.properties || !dbCity.properties.length) && (
              <div className="col-span-full rounded-2xl border border-slate-800 bg-slate-900/50 p-8 text-center">
                <span className="text-3xl">🏛️</span>
                <h3 className="mt-2 text-lg font-bold text-white">
                  Exclusive Concierge Listings in {cityName}
                </h3>
                <p className="mt-1 text-xs text-slate-400">
                  Off-market villas and penthouses available upon request. Contact our global strategist for immediate private access.
                </p>
                <a
                  href={`https://wa.me/919876543210?text=Hi,%20I'm%20looking%20for%20properties%20in%20${encodeURIComponent(cityName)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-xs font-bold text-slate-950 transition hover:bg-emerald-400"
                >
                  💬 Inquire on WhatsApp for {cityName} Deals
                </a>
              </div>
            )}
          </div>
        </div>

        {/* FAQ Section */}
        <section className="mt-14 rounded-3xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8">
          <h2 className="font-serif text-xl font-bold text-white">
            Frequently Asked Questions — {cityName} Real Estate
          </h2>
          <div className="mt-4 space-y-3">
            {faqs.map((f, i) => (
              <details key={i} className="group rounded-2xl border border-slate-800 bg-slate-950 p-4">
                <summary className="cursor-pointer text-sm font-semibold text-slate-200 group-open:text-teal-300">
                  {f.q}
                </summary>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
