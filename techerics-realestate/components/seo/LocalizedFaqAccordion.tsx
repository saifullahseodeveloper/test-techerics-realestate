"use client";

import { useState } from "react";

type FAQItem = {
  question: string;
  answer: string;
};

export default function LocalizedFaqAccordion({ locationName }: { locationName: string }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: `Is buying property in ${locationName} a good investment in 2026?`,
      answer: `Yes, ${locationName} has demonstrated strong capital appreciation (+12.4% YoY) and robust rental yields averaging 6.5% - 8.2% P.A. High infrastructure growth and tax-friendly policies make it a premier choice for global investors.`,
    },
    {
      question: `What are the average price ranges for 2 BHK and 3 BHK apartments in ${locationName}?`,
      answer: `Prices in ${locationName} vary based on exact locality and developer tier. Luxury 2 BHK apartments start around $350,000 to $650,000, while premium 3 BHK units range from $800,000 to $1,800,000+.`,
    },
    {
      question: `Are foreign buyers eligible for freehold property ownership in ${locationName}?`,
      answer: `Yes, foreign nationals can purchase 100% freehold property in designated investment zones in ${locationName}, qualifying buyers for long-term residency visas upon meeting minimum investment thresholds.`,
    },
    {
      question: `Are all real estate projects listed on Tech Erics in ${locationName} RERA verified?`,
      answer: `Every property and developer listed on Tech Erics passes strict RERA permit verification. Off-plan masterplans are linked directly to official escrow accounts for maximum buyer protection.`,
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 mt-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="mb-6">
        <span className="text-xs font-bold uppercase tracking-widest text-teal-400">
          💡 Frequently Asked Questions
        </span>
        <h2 className="mt-1 font-serif text-2xl font-bold text-white">
          Real Estate Insights in {locationName}
        </h2>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 transition"
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="flex w-full items-center justify-between p-4 text-left text-xs sm:text-sm font-bold text-white hover:text-teal-300 transition"
              >
                <span>{faq.question}</span>
                <span className="text-teal-400 font-mono text-base">{isOpen ? "−" : "+"}</span>
              </button>

              {isOpen && (
                <div className="border-t border-slate-800/80 px-4 py-3 text-xs leading-relaxed text-slate-300">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
