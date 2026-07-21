"use client";

import Link from "next/link";

type CardProps = {
  id: string;
  title: string;
  location: string;
  price: string;
  image: string;
  bedrooms: number;
  slug: string;
  purpose?: string;
};

export default function CardDubaiGold({
  title,
  location,
  price,
  image,
  bedrooms,
  slug,
  purpose = "SALE",
}: CardProps) {
  return (
    <div className="group overflow-hidden rounded-3xl bg-zinc-950 border border-amber-500/20 shadow-2xl transition-all duration-300 hover:border-amber-400 hover:shadow-amber-500/10 text-amber-50">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-3 left-3 rounded-full bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 px-3 py-1 text-[10px] font-black text-black uppercase tracking-widest shadow">
          👑 FOR {purpose} · RERA VERIFIED
        </span>
      </div>

      <div className="p-6">
        <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">
          📍 {location}
        </span>
        <h3 className="mt-1 font-serif text-lg font-bold text-white group-hover:text-amber-300 line-clamp-1">
          {title}
        </h3>

        <div className="mt-4 flex items-center justify-between border-t border-amber-500/20 pt-3 text-xs">
          <span className="text-amber-200/70 font-semibold">🛏️ {bedrooms} Luxury BHK</span>
          <span className="font-serif text-base font-extrabold text-amber-300">{price}</span>
        </div>

        <Link
          href={`/en/property/${slug}`}
          className="mt-4 block w-full rounded-2xl bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 py-3 text-center text-xs font-black text-black shadow-lg shadow-amber-500/20 transition hover:opacity-90"
        >
          Request Private Tour →
        </Link>
      </div>
    </div>
  );
}
