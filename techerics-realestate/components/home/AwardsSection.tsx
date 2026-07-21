"use client";

const AWARDS = [
  {
    title: "Best Luxury Real Estate Platform 2025",
    organization: "National Real Estate Excellence Summit",
    year: "2025",
    image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Excellence in Digital Innovation & AI",
    organization: "Asia PropTech Awards",
    year: "2024",
    image: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Highest Customer Satisfaction Rating",
    organization: "Indian Realty Consumers Forum",
    year: "2024",
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=400&q=80",
  },
];

export default function AwardsSection() {
  return (
    <section className="bg-slate-950 px-4 py-16">
      <div className="mx-auto max-w-6xl text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-teal-400">
          Recognitions & Excellence
        </span>
        <h2 className="mt-1 font-serif text-2xl font-bold text-white sm:text-3xl">
          Awards & Industry Accolades
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          Recognized nationally for pioneering technology, customer service, and luxury brokerage.
        </p>

        {/* 3 Awards Cards matching section 10 of reference image */}
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {AWARDS.map((award, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center rounded-2xl border border-slate-800 bg-slate-900/60 p-6 text-center transition-all duration-300 hover:border-amber-500/50 hover:bg-slate-900"
            >
              <div className="relative h-28 w-full overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
                <img
                  src={award.image}
                  alt={award.title}
                  className="h-full w-full object-cover opacity-75"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs">
                  <span className="text-3xl">🏆</span>
                </div>
              </div>

              <span className="mt-4 text-xs font-bold tracking-widest text-amber-400">
                {award.year} AWARD
              </span>

              <h3 className="mt-1 text-base font-bold text-white font-serif">
                {award.title}
              </h3>

              <p className="mt-1.5 text-xs text-slate-400">
                {award.organization}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
