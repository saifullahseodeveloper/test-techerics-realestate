"use client";

import { useCountry } from "@/lib/country-context";

export default function TestimonialsSection() {
  const { market } = useCountry();

  const testimonials = market.testimonials && market.testimonials.length
    ? market.testimonials
    : [
        {
          quote: `Buying a property in ${market.countryName} through Tech Erics was seamless. 100% legal clarity and direct developer access!`,
          name: "Alex & Emma Thompson",
          role: "Homeowners",
          location: `Bought Property in ${market.countryName}`,
          rating: 5,
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
        },
        {
          quote: "The 360° virtual tours saved me weeks of travel. Secured a high-yield investment property with zero commission.",
          name: "David Chen",
          role: "Global Investor",
          location: `Invested in ${market.countryName}`,
          rating: 5,
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
        },
      ];

  return (
    <section className="bg-slate-900 px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-400">
            {market.flag} Verified Reviews in {market.countryName}
          </span>
          <h2 className="mt-1 font-serif text-2xl font-bold text-white sm:text-3xl">
            Real Stories from Happy Homeowners in {market.countryName}
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Join over 5,000+ satisfied families and investors who trusted Tech Erics for their property journey in {market.countryName}.
          </p>
        </div>

        {/* Dynamic Grid of Testimonial Cards for Selected Country */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-950 p-6 shadow-md transition-all duration-300 hover:border-teal-500/40 hover:shadow-xl"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-400 text-sm">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>

                <p className="mt-3 text-sm italic text-slate-300 leading-relaxed">
                  "{t.quote}"
                </p>
              </div>

              <div className="mt-6 flex items-center gap-3 border-t border-slate-800/80 pt-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="h-10 w-10 rounded-full object-cover border border-teal-500/50"
                />
                <div>
                  <h4 className="text-sm font-semibold text-white">{t.name}</h4>
                  <p className="text-xs text-teal-400 font-medium">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
