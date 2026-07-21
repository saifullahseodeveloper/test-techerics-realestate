import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GLOBAL_MARKETS, DeveloperData } from "@/lib/country-data";
import PropertyCard from "@/components/PropertyCard";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

function findDeveloper(slug: string) {
  for (const m of Object.values(GLOBAL_MARKETS)) {
    const dev = m.topDevelopers.find((d) => d.slug.toLowerCase() === slug.toLowerCase());
    if (dev) return { dev, market: m };
  }
  return null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const result = findDeveloper(slug);

  if (!result) {
    const cleanName = slug.replace(/-/g, " ").toUpperCase();
    return {
      title: `${cleanName} Projects & Masterplans | Tech Erics Developer Portal`,
      description: `Browse official projects, off-plan launches, and verified real estate developments by ${cleanName}.`,
    };
  }

  const { dev, market } = result;
  return {
    title: `${dev.name} Projects, Masterplans & Off-Plan Launches in ${market.countryName} | Tech Erics`,
    description: `Explore all ${dev.projectsCount} by ${dev.name} in ${market.countryName}. RERA verified luxury apartments, villas, and commercial developments with zero commission.`,
    alternates: { canonical: `/developers/${dev.slug}` },
  };
}

export default async function DeveloperDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  const result = findDeveloper(slug);

  const cleanName = slug.replace(/-/g, " ").toUpperCase();
  const dev = result?.dev || { name: cleanName, projectsCount: "Multiple Projects", logo: "🏗️", slug };
  const market = result?.market || GLOBAL_MARKETS.AE;

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100">
      <div className="mx-auto max-w-6xl">
        <nav aria-label="breadcrumb" className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
          <Link href={`/${locale}`} className="hover:text-teal-400">Home</Link> /{" "}
          <Link href={`/${locale}/developers`} className="hover:text-teal-400">Developers</Link> /{" "}
          <span className="text-teal-400">{dev.name}</span>
        </nav>

        {/* Developer Header Banner */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl backdrop-blur">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-3xl">{dev.logo}</span>
              <h1 className="mt-2 font-serif text-3xl font-bold text-white sm:text-5xl">
                {dev.name}
              </h1>
              <p className="mt-2 text-sm text-slate-300">
                Official Developer Partner · {dev.projectsCount} in {market.countryName}
              </p>
            </div>
            <div className="rounded-2xl border border-teal-500/30 bg-teal-500/10 px-5 py-3 text-center shrink-0">
              <span className="block text-[10px] font-bold uppercase text-teal-400">RERA Status</span>
              <span className="text-sm font-bold text-white">100% Certified Group</span>
            </div>
          </div>

          <p className="mt-6 text-xs leading-relaxed text-slate-400 max-w-3xl border-t border-slate-800 pt-4">
            {dev.name} is one of the premier real estate developers operating across {market.countryName}. Renowned for high-yield architectural masterplans, luxury finishes, and timely project delivery.
          </p>
        </div>

        {/* Developer Projects List */}
        <section className="mt-12">
          <h2 className="font-serif text-2xl font-bold text-white mb-6">
            Featured Projects by {dev.name}
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {market.sampleProjects.map((proj) => (
              <div key={proj.id} className="group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-lg">
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <img src={proj.image} alt={proj.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  <span className="absolute top-3 left-3 rounded bg-rose-600 px-2.5 py-1 text-[10px] font-bold text-white">{proj.badge}</span>
                </div>
                <div className="p-5">
                  <span className="text-xs text-teal-400 font-semibold">📍 {proj.location}</span>
                  <h3 className="mt-1 text-base font-bold text-white group-hover:text-teal-300">{proj.title}</h3>
                  <div className="mt-3 flex items-center justify-between border-t border-b border-slate-800 py-2.5 text-xs text-slate-400">
                    <span>🛏️ {proj.bhk}</span>
                    <span>📐 {proj.sqft}</span>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-base font-extrabold text-amber-300">{proj.price}</span>
                    <Link
                      href={`/${locale}/property/${proj.id}`}
                      className="rounded-xl bg-teal-500 px-3.5 py-2 text-xs font-bold text-slate-950 hover:bg-teal-400"
                    >
                      View Project →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Related Searches */}
        <section className="mt-14 rounded-2xl border border-slate-800 bg-slate-950 p-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Popular Searches for {dev.name}:
          </h3>
          <div className="flex flex-wrap gap-2 text-xs">
            {["Luxury Apartments", "Off-Plan Villas", "Townhouses", "Penthouses"].map((t) => (
              <Link
                key={t}
                href={`/${locale}/${market.slug}/${t.toLowerCase().replace(/\s+/g, "-")}/for-sale`}
                className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-slate-300 hover:border-teal-400 hover:text-white transition"
              >
                {dev.name} {t} in {market.countryName}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
