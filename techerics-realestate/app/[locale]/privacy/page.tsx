import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Tech Erics",
  description: "Tech Erics privacy policy — how we collect, use, and protect your personal data.",
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-16 text-slate-100">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-serif text-3xl font-bold text-white">Privacy Policy</h1>
        <p className="mt-2 text-xs text-slate-500">Last updated: July 2026</p>
        <div className="mt-8 space-y-6 text-sm leading-relaxed text-slate-300">
          <p>Tech Erics Real Estate Pvt Ltd ("we", "our", "us") is committed to protecting and respecting your privacy. This policy explains what personal data we collect, why we collect it, and how we use it.</p>
          <h2 className="font-serif text-xl font-bold text-white pt-2">Information We Collect</h2>
          <p>We collect information you provide when submitting inquiries (name, email, phone), browsing data via cookies, and property search preferences to personalize your experience.</p>
          <h2 className="font-serif text-xl font-bold text-white pt-2">How We Use Your Data</h2>
          <p>Your data is used to connect you with property developers, send relevant listings, and improve our platform. We never sell your personal data to third parties.</p>
          <h2 className="font-serif text-xl font-bold text-white pt-2">Contact</h2>
          <p>For privacy-related inquiries, contact us at privacy@techerics.com.</p>
        </div>
      </div>
    </main>
  );
}
