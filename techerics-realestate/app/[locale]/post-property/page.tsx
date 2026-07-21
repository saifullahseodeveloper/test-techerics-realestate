import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Post Your Property — List for Free | Tech Erics",
  description: "List your property for free on Tech Erics. Reach millions of buyers and renters across 14+ countries. RERA verified, zero commission, instant WhatsApp leads.",
  robots: { index: true, follow: true },
};

export default function PostPropertyPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-16 text-slate-100">
      <div className="mx-auto max-w-3xl text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-teal-400">For Property Owners & Agents</span>
        <h1 className="mt-2 font-serif text-3xl font-bold text-white sm:text-5xl">
          Post Your Property for Free
        </h1>
        <p className="mt-4 max-w-xl mx-auto text-sm text-slate-400 leading-relaxed">
          List your property on Tech Erics and reach millions of verified buyers and renters across Dubai, Mumbai, London, New York and 100+ global cities. Zero listing fees. Instant WhatsApp leads.
        </p>

        <div className="mt-10 rounded-3xl border border-slate-800 bg-slate-900 p-8 text-left">
          <h2 className="font-serif text-xl font-bold text-white">Why List with Tech Erics?</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-300">
            <li>✅ <strong>Zero Commission</strong> — No brokerage fees, ever</li>
            <li>✅ <strong>RERA Verified Badge</strong> — Build instant buyer trust</li>
            <li>✅ <strong>360° Virtual Tours</strong> — Showcase your property remotely</li>
            <li>✅ <strong>Instant WhatsApp Leads</strong> — Get buyer inquiries directly on your phone</li>
            <li>✅ <strong>AI-Powered SEO</strong> — Your listing ranks on Google automatically</li>
            <li>✅ <strong>Multi-Lingual Reach</strong> — Visible to English, Arabic & Hindi audiences</li>
          </ul>

          <div className="mt-8 rounded-2xl border border-teal-500/30 bg-teal-500/10 p-6 text-center">
            <p className="text-sm font-bold text-teal-300">Ready to list your property?</p>
            <a
              href="https://wa.me/919876543210?text=Hi%20Tech%20Erics,%20I%20want%20to%20list%20my%20property."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block rounded-xl bg-teal-500 px-8 py-3 text-sm font-bold text-slate-950 transition hover:bg-teal-400"
            >
              💬 Contact Us on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
