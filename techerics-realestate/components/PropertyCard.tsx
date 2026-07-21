import Link from "next/link";
import Image from "next/image";
import type { Property, Media, Listing } from "@prisma/client";

type CardProperty = Property & { media: Media[]; listings: Listing[] };

export default function PropertyCard({ property }: { property: CardProperty }) {
  const listing = property.listings[0];
  const photo = property.media[0];

  const priceFmt = listing
    ? new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: listing.currency,
        maximumFractionDigits: 0,
      }).format(Number(listing.price))
    : "₹ 2.95 Cr";

  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-lg transition-all duration-300 hover:border-teal-500/50 hover:shadow-xl flex flex-col justify-between">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
        {photo?.url ? (
          <Image
            src={photo.url}
            alt={photo.altText ?? property.title}
            fill
            loading="lazy"
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        ) : (
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
            alt={property.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        )}
        <span className="absolute top-3 left-3 rounded-md bg-rose-600 px-2.5 py-1 text-[10px] font-bold text-white shadow backdrop-blur">
          RERA APPROVED
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <span className="text-[11px] font-semibold text-teal-400">
            📍 {property.addressLine || "Prime Location"}
          </span>

          <h3 className="mt-1 text-base font-bold text-white group-hover:text-teal-300 leading-snug line-clamp-1">
            {property.title}
          </h3>

          <div className="mt-3 flex items-center gap-3 text-xs text-slate-400 font-medium">
            <span>🛏️ {property.bedrooms || 3} BHK</span>
            <span>📐 {property.areaSqft || 2400} sqft</span>
          </div>
        </div>

        <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between">
          <div>
            <span className="block text-[10px] uppercase text-slate-500 font-semibold">Starting From</span>
            <span className="text-base font-extrabold text-amber-300">{priceFmt}</span>
          </div>

          <Link
            href={`/projects/${property.slug}`}
            className="rounded-xl bg-teal-500 px-3.5 py-2 text-xs font-bold text-slate-950 transition hover:bg-teal-400"
          >
            Know More →
          </Link>
        </div>
      </div>
    </div>
  );
}
