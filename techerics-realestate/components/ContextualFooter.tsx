import Link from "next/link";
import { prisma } from "@/lib/db";
import { GLOBAL_CITIES, GLOBAL_COUNTRIES } from "@/lib/global-locations";
import { GLOBAL_MARKETS } from "@/lib/country-data";

type Props = {
  locationSlug?: string;
  developerSlug?: string;
  propertyType?: string;
};

export default async function ContextualFooter({ locationSlug, developerSlug, propertyType }: Props) {
  // Fetch real cities from DB or fallback
  let cities: { id: string; name: string; slug: string }[] = [];
  try {
    cities = await prisma.city.findMany({ take: 10, orderBy: { name: "asc" } });
  } catch (err) {
    // Silent fallback
  }

  const displayCities = cities.length
    ? cities
    : GLOBAL_CITIES.slice(0, 10).map((c) => ({ id: c.slug, name: c.name, slug: c.slug }));

  // Determine dynamic footer sections based on page context
  const activeMarket = Object.values(GLOBAL_MARKETS).find(
    (m) => m.slug.toLowerCase() === (locationSlug || "uae").toLowerCase()
  ) || GLOBAL_MARKETS.AE;

  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 text-xs text-slate-400">
      {/* 1. Contextual Spider-Mesh Internal Links */}
      <div className="border-b border-slate-800/60 py-10 bg-slate-950/80">
        <div className="mx-auto max-w-6xl px-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-teal-400">
            🔗 Contextual Internal Link Graph
          </span>
          <h3 className="font-serif text-lg font-bold text-white mt-1 mb-6">
            {locationSlug
              ? `Real Estate Directory in ${locationSlug.replace(/-/g, " ").toUpperCase()}`
              : developerSlug
              ? `Official Masterplans & Projects by ${developerSlug.replace(/-/g, " ").toUpperCase()}`
              : "Global Real Estate Search Directory"}
          </h3>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Dynamic Column 1: Related Locations */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3 border-b border-slate-800 pb-2">
                📍 Popular Cities
              </h4>
              <ul className="space-y-1.5 text-xs">
                {displayCities.map((c) => (
                  <li key={c.id}>
                    <Link href={`/en/${c.slug}`} className="hover:text-teal-300 transition">
                      Properties in {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Dynamic Column 2: Buy Permutations */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3 border-b border-slate-800 pb-2">
                🏠 Properties for Sale
              </h4>
              <ul className="space-y-1.5 text-xs">
                {["apartments", "villas", "townhouses", "penthouses", "studios"].map((type) => (
                  <li key={type}>
                    <Link
                      href={`/en/${locationSlug || "dubai"}/${type}/for-sale`}
                      className="hover:text-teal-300 transition capitalize"
                    >
                      {type} for Sale in {locationSlug ? locationSlug.replace(/-/g, " ") : "Dubai"}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Dynamic Column 3: Rent Permutations */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3 border-b border-slate-800 pb-2">
                🔑 Properties for Rent
              </h4>
              <ul className="space-y-1.5 text-xs">
                {["apartments", "villas", "offices", "shops", "warehouses"].map((type) => (
                  <li key={type}>
                    <Link
                      href={`/en/${locationSlug || "dubai"}/${type}/for-rent`}
                      className="hover:text-teal-300 transition capitalize"
                    >
                      {type} for Rent in {locationSlug ? locationSlug.replace(/-/g, " ") : "Dubai"}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Dynamic Column 4: Developers */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3 border-b border-slate-800 pb-2">
                🏗️ Top Developers
              </h4>
              <ul className="space-y-1.5 text-xs">
                {activeMarket.topDevelopers.slice(0, 6).map((dev) => (
                  <li key={dev.slug}>
                    <Link
                      href={`/en/developers/${dev.slug}`}
                      className="hover:text-teal-300 transition"
                    >
                      {dev.name} Projects
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Footer Footer Content & Legal */}
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-5 px-4 pt-10 pb-10">
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

        <div>
          <h4 className="mb-3 font-semibold uppercase tracking-wider text-slate-200 text-xs">
            Quick Hubs
          </h4>
          <ul className="space-y-2">
            <li><Link href="/en/buy" className="hover:text-teal-400 transition">Buy Property</Link></li>
            <li><Link href="/en/rent" className="hover:text-teal-400 transition">Rent Property</Link></li>
            <li><Link href="/en/new-projects" className="hover:text-teal-400 transition">New Project Launches</Link></li>
            <li><Link href="/en/commercial" className="hover:text-teal-400 transition">Commercial Spaces</Link></li>
            <li><Link href="/en/developers" className="hover:text-teal-400 transition">Developer Directory</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 font-semibold uppercase tracking-wider text-slate-200 text-xs">
            Global Countries
          </h4>
          <ul className="space-y-2">
            {GLOBAL_COUNTRIES.slice(0, 5).map((c) => (
              <li key={c.slug}>
                <Link href={`/en/${c.slug}`} className="hover:text-teal-400 transition">
                  {c.flag} Real Estate in {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-3 font-semibold uppercase tracking-wider text-slate-200 text-xs">
            Company & Legal
          </h4>
          <ul className="space-y-2">
            <li><Link href="/en/about" className="hover:text-teal-400 transition">About Tech Erics</Link></li>
            <li><Link href="/en/blog" className="hover:text-teal-400 transition">Market Insights & Blog</Link></li>
            <li><Link href="/en/post-property" className="hover:text-teal-400 transition">List Your Property Free</Link></li>
            <li><Link href="/en/privacy" className="hover:text-teal-400 transition">Privacy Policy</Link></li>
            <li><Link href="/en/terms" className="hover:text-teal-400 transition">Terms of Service</Link></li>
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
