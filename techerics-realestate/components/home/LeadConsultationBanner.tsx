"use client";

import { useState } from "react";

export default function LeadConsultationBanner() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "Mumbai",
    propertyType: "Apartment",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          message: `Interested in ${formData.propertyType} in ${formData.city}`,
        }),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    }
  };

  return (
    <section className="bg-slate-900 px-4 py-16">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 sm:p-10 shadow-2xl">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          {/* Left Column Text */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-3.5 py-1 text-xs font-semibold text-teal-300">
              ⚡ Free VIP Concierge Service
            </span>

            <h2 className="mt-4 font-serif text-3xl font-bold tracking-tight text-white sm:text-4xl leading-tight">
              Get Free Consultation <br />
              <span className="bg-gradient-to-r from-teal-400 to-amber-300 bg-clip-text text-transparent">
                With Expert Property Advisors
              </span>
            </h2>

            <p className="mt-3 text-sm text-slate-300 leading-relaxed">
              Looking for your dream home or high-yield investment? Speak with our senior advisors for curated options, off-market deals, and best price negotiations.
            </p>

            {/* Benefit Checkpoints matching reference image */}
            <div className="mt-6 space-y-3 text-xs font-medium text-slate-200">
              {[
                "Personalized portfolio shortlisting based on budget & ROI",
                "Complimentary chauffeured & 360° virtual site visits",
                "Direct developer price negotiation & registration assistance",
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-500/20 text-teal-400 text-xs font-bold">
                    ✓
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column Form Box matching reference image */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-6 shadow-xl backdrop-blur-md">
            {submitted ? (
              <div className="py-8 text-center">
                <span className="text-4xl">🎉</span>
                <h3 className="mt-2 text-xl font-bold text-white">Callback Scheduled!</h3>
                <p className="mt-1 text-xs text-slate-400">
                  Our senior real estate strategist will get in touch with you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-serif text-lg font-bold text-white">
                  Schedule Your Free Callback
                </h3>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Full Name
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your full name"
                    className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-teal-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Phone / WhatsApp Number
                  </label>
                  <input
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-teal-400 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      City
                    </label>
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2.5 text-sm text-white focus:border-teal-400 focus:outline-none"
                    >
                      <option value="Mumbai">Mumbai</option>
                      <option value="Delhi NCR">Delhi NCR</option>
                      <option value="Bangalore">Bangalore</option>
                      <option value="Pune">Pune</option>
                      <option value="Hyderabad">Hyderabad</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      Property Type
                    </label>
                    <select
                      value={formData.propertyType}
                      onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2.5 text-sm text-white focus:border-teal-400 focus:outline-none"
                    >
                      <option value="Apartment">Apartment</option>
                      <option value="Villa">Luxury Villa</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Plot">Plot / Land</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-2 w-full rounded-xl bg-gradient-to-r from-teal-400 to-emerald-400 py-3 font-semibold text-slate-950 transition hover:opacity-95 hover:shadow-lg hover:shadow-teal-500/25"
                >
                  Request Instant Callback
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
