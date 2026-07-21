"use client";

const FEATURES = [
  {
    icon: "🛡️",
    title: "100% Verified Listings",
    desc: "Every property listing undergoes on-site physical auditing by our certified property officers to ensure zero fake data.",
  },
  {
    icon: "⚖️",
    title: "Legal & Title Security",
    desc: "Complete encumbrance check, RERA compliance verification, and land title due diligence performed before publishing.",
  },
  {
    icon: "💰",
    title: "Zero Brokerage Deals",
    desc: "Access exclusive direct-from-developer inventories with zero buyer commission fees and pre-launch pricing.",
  },
  {
    icon: "📞",
    title: "Dedicated Advisor",
    desc: "Personal real estate strategist assigned to assist you from initial search to site visits, bank loan, and registry.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-slate-900 px-4 py-16 border-t border-b border-slate-800">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-400">
            The Tech Erics Advantage
          </span>
          <h2 className="mt-1 font-serif text-2xl font-bold text-white sm:text-3xl">
            Why Choose Tech Erics?
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Redefining real estate transactions with complete transparency, AI-powered accuracy, and expert advisory.
          </p>
        </div>

        {/* 4-column grid matching reference image section 9 */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((item, idx) => (
            <div
              key={idx}
              className="group rounded-2xl border border-slate-800 bg-slate-950 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-teal-500/50 hover:shadow-xl"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500/10 text-2xl border border-teal-500/30 group-hover:bg-teal-500 group-hover:text-slate-950 transition-colors">
                {item.icon}
              </div>

              <h3 className="mt-4 font-serif text-lg font-bold text-white group-hover:text-teal-300">
                {item.title}
              </h3>

              <p className="mt-2 text-xs leading-relaxed text-slate-400">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
