"use client";

const DEVELOPERS = [
  { name: "GODREJ PROPERTIES", count: "42+ Projects" },
  { name: "DLF LIMITED", count: "38+ Projects" },
  { name: "OBEROI REALTY", count: "25+ Projects" },
  { name: "PRESTIGE GROUP", count: "60+ Projects" },
  { name: "SOBHA LIMITED", count: "30+ Projects" },
  { name: "HIRANANDANI", count: "18+ Projects" },
  { name: "LODHA GROUP", count: "55+ Projects" },
  { name: "TATA HOUSING", count: "22+ Projects" },
];

export default function DeveloperPartners() {
  return (
    <section className="border-t border-b border-slate-800/80 bg-slate-950 px-4 py-14">
      <div className="mx-auto max-w-6xl text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-teal-400">
          Official Sales Partners
        </span>
        <h2 className="mt-1 font-serif text-2xl font-bold text-white sm:text-3xl">
          Trusted by India's Premier Developers
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          Direct tie-ups with top builders ensuring zero brokerage and official launch prices.
        </p>

        {/* 4x2 Grid of Developer Logo Cards matching reference image */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {DEVELOPERS.map((dev, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center rounded-xl border border-slate-800 bg-slate-900/50 px-4 py-5 transition-all duration-200 hover:border-teal-500/40 hover:bg-slate-900"
            >
              <span className="font-serif text-sm font-bold tracking-wider text-slate-200">
                {dev.name}
              </span>
              <span className="mt-1 text-[11px] text-teal-400/80 font-medium">
                {dev.count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
