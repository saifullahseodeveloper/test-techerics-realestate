import type { Metadata } from "next";
import Link from "next/link";
import { GLOBAL_MARKETS } from "@/lib/country-data";

export const metadata: Metadata = {
  title: "Top Real Estate Developers Worldwide | Tech Erics",
  description: "Explore official developer portals for EMAAR, DAMAC, Godrej, DLF, Sobha, Aldar, Oberoi and top real estate groups worldwide.",
};

export default async function DevelopersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const markets = Object.values(GLOBAL_MARKETS);

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-16 text-slate-100">
      <div className="mx-auto max-w-6xl">
        <span className="text-xs font-bold uppercase tracking-widest text-teal-400">
          Official Developer Directory
        </span>
        <h1 className="mt-2 font-serif text-3xl font-bold text-white sm:text-5xl">
          Top Real Estate Developers Worldwide
        </h1>
        <p className="mt-4 max-w-2xl text-sm text-slate-400 leading-relaxed">
          Browse verified real estate developer masterplans, off-plan projects, RERA credentials, and active developments across key global markets.
        </p>

        <div className="mt-12 space-y-12">
          {markets.map((m) => (
            <div key={m.code}>
              <h2 className="font-serif text-xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                <span>{m.flag}</span> Top Developers in {m.countryName}
              </h2>

              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {m.topDevelopers.map((dev) => (
                  <Link
                    key={dev.slug}
                    href={`/${locale}/developers/${dev.slug}`}
                    className="group flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:border-teal-400 shadow-md"
                  >
                    <div>
                      <span className="text-2xl">{dev.logo}</span>
                      <h3 className="mt-3 text-base font-bold text-white group-hover:text-teal-300">
                        {dev.name}
                      </h3>
                      <span className="mt-1 block text-xs text-slate-500">{dev.projectsCount}</span>
                    </div>
                    <div className="mt-4 text-xs font-bold text-teal-400 group-hover:underline">
                      View Projects & Masterplans →
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
