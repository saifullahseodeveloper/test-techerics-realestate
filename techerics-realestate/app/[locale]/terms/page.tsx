import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Tech Erics",
  description: "Tech Erics terms of service — the rules and guidelines governing your use of our platform.",
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-16 text-slate-100">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-serif text-3xl font-bold text-white">Terms of Service</h1>
        <p className="mt-2 text-xs text-slate-500">Last updated: July 2026</p>
        <div className="mt-8 space-y-6 text-sm leading-relaxed text-slate-300">
          <p>By using Tech Erics ("the Platform"), you agree to these terms. The Platform is operated by Tech Erics Real Estate Pvt Ltd.</p>
          <h2 className="font-serif text-xl font-bold text-white pt-2">Use of Platform</h2>
          <p>The Platform is provided for informational purposes. Property listings are sourced from developers and verified agents. While we verify RERA registration numbers, we do not guarantee the accuracy of all listing details.</p>
          <h2 className="font-serif text-xl font-bold text-white pt-2">User Responsibilities</h2>
          <p>Users agree to provide accurate information when submitting inquiries or registering accounts. Misuse of the platform, including scraping, spamming, or fraudulent listings, will result in immediate account termination.</p>
          <h2 className="font-serif text-xl font-bold text-white pt-2">Limitation of Liability</h2>
          <p>Tech Erics acts as an intermediary platform and is not party to any transaction between property seekers and developers. We are not liable for any disputes arising from property transactions.</p>
          <h2 className="font-serif text-xl font-bold text-white pt-2">Contact</h2>
          <p>For legal inquiries, contact us at legal@techerics.com.</p>
        </div>
      </div>
    </main>
  );
}
