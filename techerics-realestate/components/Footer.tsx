import Link from "next/link";
import { prisma } from "@/lib/db";

// This footer IS the SEO strategy discussed in research: keyword-rich
// internal links that give Google (and users) a crawlable path into
// every city/locality/budget combination. Data-driven, not hardcoded —
// so it stays accurate as new cities/localities get added.
export default async function Footer() {
  const [cities, localities] = await Promise.all([
    prisma.city.findMany({ take: 20, orderBy: { name: "asc" } }),
    prisma.locality.findMany({
      take: 20,
      orderBy: { name: "asc" },
      include: { city: true },
    }),
  ]);

  const budgets = [
    { label: "Under ₹20 Lakh", slug: "under-20-lakh" },
    { label: "₹20–50 Lakh", slug: "20-50-lakh" },
    { label: "₹50 Lakh – 1 Cr", slug: "50lakh-1cr" },
    { label: "Above ₹1 Cr", slug: "above-1cr" },
  ];

  const propertyTypes = ["1 BHK", "2 BHK", "3 BHK", "Villas", "Plots", "Commercial"];

  return (
    <footer className="mt-16 border-t border-slate-800 bg-navy-900 px-4 py-10 text-sm text-slate-400">
      <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-5">
        <FooterCol title="Popular Cities">
          {cities.map((c) => (
            <Link key={c.id} href={`/${c.slug}`} className="hover:text-teal-400">
              Property in {c.name}
            </Link>
          ))}
        </FooterCol>

        <FooterCol title="Popular Localities">
          {localities.map((l) => (
            <Link key={l.id} href={`/${l.city.slug}/${l.slug}`} className="hover:text-teal-400">
              {l.name}, {l.city.name}
            </Link>
          ))}
        </FooterCol>

        <FooterCol title="By Budget">
          {budgets.map((b) => (
            <Link key={b.slug} href={`/search?budget=${b.slug}`} className="hover:text-teal-400">
              {b.label}
            </Link>
          ))}
        </FooterCol>

        <FooterCol title="Property Type">
          {propertyTypes.map((t) => (
            <Link key={t} href={`/search?type=${t}`} className="hover:text-teal-400">
              {t}
            </Link>
          ))}
        </FooterCol>

        <FooterCol title="Company">
          <Link href="/about" className="hover:text-teal-400">About Us</Link>
          <Link href="/careers" className="hover:text-teal-400">Careers</Link>
          <Link href="/blog" className="hover:text-teal-400">Blog</Link>
          <Link href="/sitemap.xml" className="hover:text-teal-400">Sitemap</Link>
          <Link href="/privacy" className="hover:text-teal-400">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-teal-400">Terms</Link>
        </FooterCol>
      </div>

      <div className="mx-auto mt-8 max-w-6xl border-t border-slate-800 pt-6 text-xs text-slate-500">
        © {new Date().getFullYear()} Tech Erics. All rights reserved. | RERA compliant listings.
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-300">
        {title}
      </h3>
      <div className="flex flex-col gap-1.5">{children}</div>
    </div>
  );
}
