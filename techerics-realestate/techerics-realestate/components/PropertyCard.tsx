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
    : "Price on request";

  return (
    <Link
      href={`/property/${property.slug}`}
      className="group overflow-hidden rounded-xl border border-slate-800 bg-slate-900 transition hover:border-teal-500/50"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        {photo && (
          <Image
            src={photo.url}
            alt={photo.altText ?? property.title}
            fill
            loading="lazy"
            className="object-cover transition duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        )}
      </div>
      <div className="p-3">
        <p className="font-medium text-slate-100">{priceFmt}</p>
        <p className="truncate text-sm text-slate-400">{property.title}</p>
        {property.bedrooms && (
          <p className="mt-1 text-xs text-slate-500">
            {property.bedrooms} BHK · {property.areaSqft ?? "—"} sqft
          </p>
        )}
      </div>
    </Link>
  );
}
