import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Tech Erics — Global Real Estate Portal",
  description: "Tech Erics is an enterprise global real estate portal offering verified luxury listings, 360° virtual tours, and direct developer partnerships across 14+ countries.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-16 text-slate-100">
      <div className="mx-auto max-w-4xl">
        <span className="text-xs font-bold uppercase tracking-widest text-teal-400">About Us</span>
        <h1 className="mt-2 font-serif text-3xl font-bold text-white sm:text-5xl">
          About Tech Erics
        </h1>
        <div className="mt-8 space-y-6 text-sm leading-relaxed text-slate-300">
          <p>
            Tech Erics is an enterprise-grade global real estate platform connecting property seekers with verified luxury listings across 14+ countries including UAE, India, United States, United Kingdom, Canada, Australia, Singapore, and Saudi Arabia.
          </p>
          <p>
            Our platform features direct developer partnerships with industry leaders like EMAAR Properties, DAMAC, Godrej Properties, DLF Limited, Sobha Realty, and Aldar Properties. Every listing on our platform is RERA-verified, ensuring complete transparency and regulatory compliance.
          </p>
          <h2 className="font-serif text-xl font-bold text-white pt-4">Our Mission</h2>
          <p>
            To democratize access to premium real estate information worldwide. We believe every property seeker deserves accurate pricing data, 360° virtual tours, WalkScore® location intelligence, and direct access to developers — without intermediary markups.
          </p>
          <h2 className="font-serif text-xl font-bold text-white pt-4">What Sets Us Apart</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>100% Verified Listings</strong> — Every property undergoes RERA registration verification</li>
            <li><strong>360° Virtual Tours</strong> — Explore properties from anywhere in the world</li>
            <li><strong>AI-Powered Market Insights</strong> — Real-time pricing trends, rental yields, and investment analytics</li>
            <li><strong>Direct Developer Access</strong> — Zero middlemen, zero commission overhead</li>
            <li><strong>Multi-Lingual Support</strong> — Available in English, Arabic, and Hindi</li>
          </ul>
          <h2 className="font-serif text-xl font-bold text-white pt-4">Contact</h2>
          <p>📍 Tech Erics Tower, BKC, Mumbai — 400051, India</p>
          <p>📞 +91 98765 43210</p>
          <p>✉️ concierge@techerics.com</p>
        </div>
      </div>
    </main>
  );
}
