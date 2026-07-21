import type { Metadata } from "next";
import Link from "next/link";
import { GLOBAL_MARKETS } from "@/lib/country-data";

export const metadata: Metadata = {
  title: "New Project Launches — Off-Plan & Under Construction Properties | Tech Erics",
  description: "Discover the latest new project launches and off-plan developments by EMAAR, DAMAC, Godrej, DLF and top developers across Dubai, India, London & worldwide.",
};

export default async function NewProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const allDevs = Object.values(GLOBAL_MARKETS).flatMap((m) =>
    m.topDevelopers.map((d) => ({ ...d, country: m.countryName, countrySlug: m.slug }))
  );
  const allProjects = Object.values(GLOBAL_MARKETS).flatMap((m) =>
    m.sampleProjects.map((p) => ({ ...p, country: m.countryName, symbol: m.symbol }))
  );

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-16 text-slate-100">
      <div className="mx-auto max-w-6xl">
        <span className="text-xs font-bold uppercase tracking-widest text-teal-400">New Launches</span>
        <h1 className="mt-2 font-serif text-3xl font-bold text-white sm:text-5xl">
          New Project Launches & Off-Plan Developments
        </h1>
        <p className="mt-4 max-w-2xl text-sm text-slate-400 leading-relaxed">
          Get early access to the latest off-plan and under-construction projects by top developers worldwide. RERA registered with payment plan options.
        </p>

        {/* Featured Projects */}
        <h2 className="mt-12 font-serif text-xl font-bold text-white">Featured New Projects</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {allProjects.map((proj) => (
            <Link
              key={proj.id}
              href={`/${locale}/property/${proj.id}`}
              className="group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-lg transition hover:border-teal-400"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img src={proj.image} alt={proj.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                <span className="absolute top-3 left-3 rounded bg-rose-600 px-2.5 py-1 text-[10px] font-bold text-white">{proj.badge}</span>
              </div>
              <div className="p-5">
                <span className="text-xs text-teal-400 font-semibold">📍 {proj.location}</span>
                <h3 className="mt-1 text-base font-bold text-white group-hover:text-teal-300">{proj.title}</h3>
                <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                  <span>{proj.bhk}</span>
                  <span className="text-base font-extrabold text-amber-300">{proj.price}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Developers */}
        <h2 className="mt-14 font-serif text-xl font-bold text-white">Top Developers</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {allDevs.slice(0, 16).map((dev) => (
            <Link
              key={dev.slug}
              href={`/${locale}/developers/${dev.slug}`}
              className="rounded-full border border-slate-800 bg-slate-900 px-4 py-2 text-xs font-semibold text-slate-300 hover:border-teal-400 hover:text-white transition"
            >
              {dev.logo} {dev.name}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
