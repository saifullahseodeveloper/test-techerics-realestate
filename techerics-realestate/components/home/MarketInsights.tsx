"use client";

type Article = {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  readTime: string;
};

const ARTICLES: Article[] = [
  {
    id: "art-1",
    category: "MARKET REPORT",
    title: "Mumbai Real Estate Outlook 2026: Top Localities for High Capital Appreciation",
    excerpt: "Comprehensive analysis of price trends across Bandra, BKC, Worli, and emerging infrastructure corridors.",
    date: "July 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "art-2",
    category: "BUYER GUIDE",
    title: "Complete Home Loan & Tax Benefit Guide for First-Time Luxury Buyers",
    excerpt: "Everything you need to know about Section 80C, capital gains exemptions, and stamp duty concessions.",
    date: "June 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "art-3",
    category: "INVESTMENT",
    title: "Commercial vs Residential Real Estate: Which Yields Higher Rental Returns in 2026?",
    excerpt: "Evaluating gross rental yields, REIT performance, and commercial lease lock-in clauses.",
    date: "May 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
  },
];

export default function MarketInsights() {
  return (
    <section className="bg-slate-950 px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-teal-400">
              Knowledge Hub
            </span>
            <h2 className="mt-1 font-serif text-2xl font-bold text-white sm:text-3xl">
              Property Guides & Market Updates
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Stay ahead with expert market intelligence, legal advice, and investment strategies.
            </p>
          </div>

          <a
            href="/blog"
            className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-slate-800"
          >
            View All Articles →
          </a>
        </div>

        {/* 3 Article Cards matching section 12 of reference image */}
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {ARTICLES.map((article) => (
            <div
              key={article.id}
              className="group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 transition-all duration-300 hover:-translate-y-1 hover:border-teal-500/50 hover:shadow-xl"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
                <img
                  src={article.image}
                  alt={article.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 rounded-md bg-teal-500/90 px-2.5 py-1 text-[10px] font-bold text-slate-950 shadow-md backdrop-blur">
                  {article.category}
                </span>
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>📅 {article.date}</span>
                  <span>⏱️ {article.readTime}</span>
                </div>

                <h3 className="mt-2 text-base font-semibold text-white group-hover:text-teal-300 leading-snug">
                  {article.title}
                </h3>

                <p className="mt-2 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {article.excerpt}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-teal-400">
                  <span>Read Article</span>
                  <span>→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
