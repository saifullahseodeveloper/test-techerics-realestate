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

export default function CardAppleSlab({
  title,
  location,
  price,
  image,
  bedrooms,
  slug,
  purpose = "SALE",
}: CardProps) {
  return (
    <div className="group overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-slate-300 text-slate-900">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-3 left-3 rounded-full bg-slate-900 px-3 py-1 text-[10px] font-bold text-white uppercase tracking-wider">
          FOR {purpose}
        </span>
      </div>

      <div className="p-5">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
          📍 {location}
        </span>
        <h3 className="mt-1 font-sans text-base font-bold text-slate-900 group-hover:text-slate-700 line-clamp-1">
          {title}
        </h3>

        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
          <span className="font-semibold text-slate-500">🛏️ {bedrooms} BHK Slab</span>
          <span className="font-sans text-sm font-extrabold text-slate-900">{price}</span>
        </div>

        <Link
          href={`/en/property/${slug}`}
          className="mt-4 block w-full rounded-xl bg-slate-900 py-2.5 text-center text-xs font-semibold text-white transition hover:bg-slate-800"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}
