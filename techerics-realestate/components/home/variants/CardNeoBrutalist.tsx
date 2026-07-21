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

export default function CardNeoBrutalist({
  title,
  location,
  price,
  image,
  bedrooms,
  slug,
  purpose = "SALE",
}: CardProps) {
  return (
    <div className="group overflow-hidden bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none text-black">
      <div className="relative aspect-[16/10] w-full overflow-hidden border-b-4 border-black">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover"
        />
        <span className="absolute top-2 left-2 bg-rose-500 px-2 py-0.5 text-[10px] font-black uppercase text-black border-2 border-black">
          FOR {purpose}
        </span>
      </div>

      <div className="p-4">
        <span className="text-[10px] font-black uppercase text-slate-700">
          📍 {location}
        </span>
        <h3 className="font-sans text-base font-black uppercase text-black line-clamp-1">
          {title}
        </h3>

        <div className="mt-3 flex items-center justify-between border-t-2 border-black pt-2 text-xs font-mono font-bold">
          <span>{bedrooms} BHK</span>
          <span className="bg-yellow-300 px-1.5 py-0.5 border border-black">{price}</span>
        </div>

        <Link
          href={`/en/property/${slug}`}
          className="mt-4 block w-full bg-emerald-300 py-2 text-center text-xs font-black uppercase text-black border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
        >
          VIEW PROPERTY →
        </Link>
      </div>
    </div>
  );
}
