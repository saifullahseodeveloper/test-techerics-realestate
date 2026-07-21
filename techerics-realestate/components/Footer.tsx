import Link from "next/link";
import { prisma } from "@/lib/db";
import SpiderInternalLinks from "@/components/SpiderInternalLinks";

export default async function Footer() {
  let cities: { id: string; name: string; slug: string }[] = [];

  try {
    cities = await prisma.city.findMany({ take: 12, orderBy: { name: "asc" } });
  } catch (err) {
    console.error("Footer database query fallback:", err);
  }

  const defaultCities = [
    { id: "c1", name: "Mumbai", slug: "mumbai" },
    { id: "c2", name: "Delhi NCR", slug: "delhi-ncr" },
    { id: "c3", name: "Bangalore", slug: "bangalore" },
    { id: "c4", name: "Pune", slug: "pune" },
    { id: "c5", name: "Hyderabad", slug: "hyderabad" },
  ];

  const displayCities = cities.length ? cities : defaultCities;

  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 text-xs text-slate-400">
      {/* Interconnected Spider-Mesh Internal Links */}
      <SpiderInternalLinks />

      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-5 px-4 pt-12 pb-10">
        {/* Col 1: Brand & Contact Info */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 text-xl font-bold tracking-tight text-white font-serif">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 font-sans font-black text-slate-950">
              TE
            </div>
            <span>
              Tech<span className="text-teal-400">Erics</span>
            </span>
          </div>

          <p className="mt-3 text-xs leading-relaxed text-slate-400 max-w-sm">
            Enterprise global real estate portal. Verified luxury listings, 360° virtual tours, zero fake data, and direct developer masterplans.
          </p>

          <div className="mt-4 space-y-1.5 text-xs text-slate-300">
            <p>📍 Tech Erics Tower, BKC, Mumbai - 400051</p>
            <p>📞 +91 98765 43210 / +91 22 4000 8000</p>
            <p>✉️ concierge@techerics.com</p>
          </div>
        </div>

        {/* Col 2: Top Cities */}
        <div>
          <h4 className="mb-3 font-semibold uppercase tracking-wider text-slate-200 text-xs">
            Top Real Estate Cities
          </h4>
          <ul className="space-y-2">
            {displayCities.map((c) => (
              <li key={c.id}>
                <Link href={`/${c.slug}`} className="hover:text-teal-400 transition">
                  Properties in {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Property Types */}
        <div>
          <h4 className="mb-3 font-semibold uppercase tracking-wider text-slate-200 text-xs">
            Property Categories
          </h4>
          <ul className="space-y-2">
            <li><Link href="/search?type=VILLA" className="hover:text-teal-400 transition">Luxury Villas</Link></li>
            <li><Link href="/search?type=APARTMENT" className="hover:text-teal-400 transition">Sea-Facing Apartments</Link></li>
            <li><Link href="/search?type=COMMERCIAL" className="hover:text-teal-400 transition">Commercial Offices</Link></li>
            <li><Link href="/search?type=PLOT" className="hover:text-teal-400 transition">Plots & Land</Link></li>
            <li><Link href="/new-projects" className="hover:text-teal-400 transition">New Project Launches</Link></li>
          </ul>
        </div>

        {/* Col 4: Quick Links & Legal */}
        <div>
          <h4 className="mb-3 font-semibold uppercase tracking-wider text-slate-200 text-xs">
            Company & Legal
          </h4>
          <ul className="space-y-2">
            <li><Link href="/about" className="hover:text-teal-400 transition">About Tech Erics</Link></li>
            <li><Link href="/blog" className="hover:text-teal-400 transition">Market Insights</Link></li>
            <li><Link href="/privacy" className="hover:text-teal-400 transition">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-teal-400 transition">Terms of Service</Link></li>
            <li><Link href="/admin/login" className="hover:text-teal-400 transition">Agent Portal Login</Link></li>
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-6xl border-t border-slate-800/80 px-4 py-6 flex flex-col items-center justify-between gap-4 text-[11px] text-slate-500 sm:flex-row">
        <p>© {new Date().getFullYear()} Tech Erics Real Estate Pvt Ltd. All rights reserved. RERA Registered.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-slate-300">Facebook</a>
          <a href="#" className="hover:text-slate-300">Instagram</a>
          <a href="#" className="hover:text-slate-300">LinkedIn</a>
          <a href="#" className="hover:text-slate-300">YouTube</a>
        </div>
      </div>
    </footer>
  );
}
