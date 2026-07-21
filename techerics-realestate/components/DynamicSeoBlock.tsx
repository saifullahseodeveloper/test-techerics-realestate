import Link from "next/link";
import FaqSchema from "@/components/FaqSchema";

type Props = {
  locationName: string;
  propertyType?: string;
  purpose?: string;
  listingCount?: number;
  countryName?: string;
};

export default function DynamicSeoBlock({
  locationName,
  propertyType = "Properties",
  purpose = "for Sale & Rent",
  listingCount = 12,
  countryName = "UAE",
}: Props) {
  const formattedLocation = locationName.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

  const faqs = [
    {
      q: `What is the average price of ${propertyType.toLowerCase()} in ${formattedLocation}?`,
      a: `The average starting price for ${propertyType.toLowerCase()} in ${formattedLocation} ranges based on luxury specifications and developer tier, offering strong ROI and high rental yields.`,
    },
    {
      q: `Are properties in ${formattedLocation} available for international investors?`,
      a: `Yes, ${formattedLocation} in ${countryName} offers prime freehold and leasehold real estate opportunities for global investors with zero foreign ownership restrictions in designated zones.`,
    },
    {
      q: `What nearby transport and amenities are available near ${formattedLocation}?`,
      a: `${formattedLocation} features world-class infrastructure including rapid metro connectivity, top-rated international schools, multi-specialty hospitals, and luxury shopping centers within 10-15 minutes.`,
    },
  ];

  return (
    <div className="mt-14 space-y-10 border-t border-slate-800/80 pt-10">
      <FaqSchema faqs={faqs} />

      {/* Market Overview & Intelligence */}
      <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-10 shadow-xl backdrop-blur">
        <span className="text-xs font-bold uppercase tracking-widest text-teal-400">
          📍 Neighborhood & Market Intelligence
        </span>
        <h2 className="mt-2 font-serif text-2xl font-bold text-white sm:text-3xl">
          Overview of {propertyType} in {formattedLocation}
        </h2>

        <div className="mt-4 grid gap-6 sm:grid-cols-2 text-sm text-slate-300 leading-relaxed">
          <div>
            <p>
              {formattedLocation} is one of the most sought-after residential and commercial hubs in {countryName}. 
              Whether you are looking to invest in luxury waterfront villas, modern high-rise apartments, or commercial office spaces, 
              this area provides unmatched capital appreciation and steady rental yields.
            </p>
            <p className="mt-3">
              With over {listingCount}+ verified listings currently active on Tech Erics, buyers and tenants can explore RERA-compliant 
              developments backed by premier masterplan developers.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
            <h3 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              📊 Market Highlights for {formattedLocation}:
            </h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex justify-between border-b border-slate-800/60 pb-1.5">
                <span>YoY Capital Growth:</span>
                <span className="font-bold text-teal-400">+14.2% YoY</span>
              </li>
              <li className="flex justify-between border-b border-slate-800/60 pb-1.5">
                <span>Estimated Rental Yield:</span>
                <span className="font-bold text-amber-300">6.8% - 8.2% P.A.</span>
              </li>
              <li className="flex justify-between border-b border-slate-800/60 pb-1.5">
                <span>Regulatory Compliance:</span>
                <span className="font-bold text-teal-400">100% RERA Approved</span>
              </li>
              <li className="flex justify-between">
                <span>Ownership Type:</span>
                <span className="font-bold text-white">Freehold Zone</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Nearby Infrastructure & Lifestyle */}
      <section className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8">
        <h3 className="font-serif text-xl font-bold text-white">
          Nearby Connectivity & Infrastructure in {formattedLocation}
        </h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-4 text-xs text-slate-300 font-medium">
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
            <span className="block text-base mb-1">✈️ Transport</span>
            <span className="text-slate-400">International Airport within 15-20 mins</span>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
            <span className="block text-base mb-1">🏫 Schools</span>
            <span className="text-slate-400">Top International IB Academies nearby</span>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
            <span className="block text-base mb-1">🏥 Hospitals</span>
            <span className="text-slate-400">Multi-specialty JCI Accredited Medical Centers</span>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
            <span className="block text-base mb-1">🛍️ Shopping</span>
            <span className="text-slate-400">Luxury Malls & Waterfront Dining</span>
          </div>
        </div>
      </section>

      {/* Dynamic FAQs Section */}
      <section className="rounded-3xl border border-slate-800 bg-slate-950 p-6 sm:p-8">
        <h3 className="font-serif text-xl font-bold text-white mb-6">
          Frequently Asked Questions ({formattedLocation})
        </h3>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
              <h4 className="font-bold text-sm text-teal-300">Q: {faq.q}</h4>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
