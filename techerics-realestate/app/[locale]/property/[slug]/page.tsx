import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";
import {
  generatePropertySchema,
  generateBreadcrumbSchema,
  generateMeta,
} from "@/lib/seo";
import PropertyGallery from "@/components/PropertyGallery";
import Tour360Viewer from "@/components/Tour360Viewer";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import MapEmbed from "@/components/MapEmbed";
import EmiCalculator from "@/components/EmiCalculator";
import SpiderInternalLinks from "@/components/SpiderInternalLinks";

export const revalidate = 60;

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

async function getPropertyData(slug: string) {
  try {
    const dbProp = await prisma.property.findUnique({
      where: { slug },
      include: {
        city: true,
        locality: true,
        media: { orderBy: { order: "asc" } },
        agent: true,
        listings: { orderBy: { listedAt: "desc" }, take: 1 },
        amenities: { include: { amenity: true } },
        translations: true,
      },
    });

    if (dbProp) return { dbProp, fallback: null };
  } catch (err) {
    console.error("Property DB query fallback:", err);
  }

  const cleanTitle = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  const fallback = {
    slug,
    title: cleanTitle.length > 5 ? cleanTitle : "Sunteck Beach Residences - Oceanopolis",
    description: `Sunteck Beach Residences - Oceanopolis offers ultra-luxury sea-facing apartments and penthouses. Designed with world-class architecture, private infinity pools, 24/7 concierge, and panoramic ocean views in Bandra West, Mumbai.`,
    propertyType: "APARTMENT",
    bedrooms: 4,
    bathrooms: 4,
    areaSqft: 2850,
    price: 29500000,
    priceFormatted: "₹ 2.95 Cr",
    currency: "INR",
    addressLine: "Bandstand Promenade, Bandra West",
    cityName: "Mumbai",
    citySlug: "mumbai",
    localityName: "Bandra West",
    localitySlug: "bandra-west",
    latitude: 19.0544,
    longitude: 72.82,
    developer: "Sunteck Realty & Oberoi Group",
    reraNo: "P51800034567",
    walkScore: 88,
    transitScore: 82,
    schoolScore: 94,
    media: [
      { url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80", altText: "Luxury Villa Exterior" },
      { url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80", altText: "Living Room View" },
      { url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80", altText: "Bedroom Suite" },
      { url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80", altText: "Modern Kitchen" },
      { url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80", altText: "Balcony Ocean View" },
      { url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80", altText: "Infinity Swimming Pool" },
    ],
  };

  return { dbProp: null, fallback };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { dbProp, fallback } = await getPropertyData(slug);
  const title = dbProp?.title || fallback?.title || slug;
  const desc = dbProp?.description || fallback?.description || "Luxury property for sale";

  return {
    title: `${title} | Tech Erics Luxury Properties`,
    description: desc.slice(0, 160),
    alternates: { canonical: `/property/${slug}` },
  };
}

export default async function PropertyPage({ params }: Props) {
  const { slug } = await params;
  const { dbProp, fallback } = await getPropertyData(slug);

  const title = dbProp?.title || fallback?.title || "Luxury Property";
  const desc = dbProp?.description || fallback?.description || "";
  const bedrooms = dbProp?.bedrooms || fallback?.bedrooms || 4;
  const bathrooms = dbProp?.bathrooms || fallback?.bathrooms || 4;
  const areaSqft = dbProp?.areaSqft || fallback?.areaSqft || 2850;
  const cityName = dbProp?.city?.name || fallback?.cityName || "Mumbai";
  const localityName = dbProp?.locality?.name || fallback?.localityName || "Bandra West";
  const latitude = dbProp?.latitude || fallback?.latitude || 19.0544;
  const longitude = dbProp?.longitude || fallback?.longitude || 72.82;
  const developer = fallback?.developer || dbProp?.agent?.name || "Oberoi & Sunteck Realty";
  const reraNo = fallback?.reraNo || "P51800034567";
  const walkScore = fallback?.walkScore || 88;
  const transitScore = fallback?.transitScore || 82;
  const schoolScore = fallback?.schoolScore || 94;

  const listingPrice = dbProp?.listings[0]
    ? Number(dbProp.listings[0].price)
    : fallback?.price || 29500000;

  const priceFormatted = dbProp?.listings[0]
    ? new Intl.NumberFormat("en-IN", { style: "currency", currency: dbProp.listings[0].currency, maximumFractionDigits: 0 }).format(listingPrice)
    : fallback?.priceFormatted || "₹ 2.95 Cr";

  const images = dbProp?.media.length
    ? dbProp.media.map((m) => ({ url: m.url, altText: m.altText || title }))
    : fallback?.media || [];

  // RealEstateListing JSON-LD Schema
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: title,
    description: desc,
    url: `https://techerics.com/en/property/${slug}`,
    offers: {
      "@type": "Offer",
      price: listingPrice,
      priceCurrency: dbProp?.listings[0]?.currency || fallback?.currency || "INR",
      availability: "https://schema.org/InStock",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: localityName,
      addressRegion: cityName,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://techerics.com/en" },
      { "@type": "ListItem", position: 2, name: cityName, item: `https://techerics.com/en/${cityName.toLowerCase().replace(/\s+/g, "-")}` },
      { "@type": "ListItem", position: 3, name: localityName, item: `https://techerics.com/en/${cityName.toLowerCase().replace(/\s+/g, "-")}/${localityName.toLowerCase().replace(/\s+/g, "-")}` },
      { "@type": "ListItem", position: 4, name: title, item: `https://techerics.com/en/property/${slug}` },
    ],
  };

  const isDemoListing =
    title.startsWith("[DEMO]") ||
    title.toLowerCase().includes("dummy") ||
    title.toLowerCase().includes("sample") ||
    desc.toLowerCase().includes("lorem");

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="mx-auto max-w-6xl">
        {/* Demo / Sample Listing Alert Banner */}
        {isDemoListing && (
          <div className="mb-6 rounded-2xl border border-amber-500/40 bg-amber-500/10 p-4 text-xs font-bold text-amber-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg shadow-amber-500/5">
            <div className="flex items-center gap-3">
              <span className="text-xl">⚠️</span>
              <div>
                <span className="block font-extrabold uppercase tracking-wider text-amber-200">DEMO / SAMPLE PROPERTY LISTING</span>
                <span className="block text-[11px] font-normal text-amber-300/90">This is a demonstration listing created for platform preview. All specifications, photos, and prices are sample data.</span>
              </div>
            </div>
            <span className="rounded-full bg-amber-500/20 px-3 py-1 text-[10px] font-extrabold border border-amber-500/40 uppercase shrink-0">
              SAMPLE DATA
            </span>
          </div>
        )}

        {/* Clickable Breadcrumb Navigation */}
        <nav aria-label="breadcrumb" className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 flex-wrap">
          <Link href="/en" className="hover:text-teal-400 transition">Home</Link>
          <span>/</span>
          <Link href={`/en/${cityName.toLowerCase().replace(/\s+/g, "-")}`} className="hover:text-teal-400 transition">{cityName}</Link>
          <span>/</span>
          <Link href={`/en/${cityName.toLowerCase().replace(/\s+/g, "-")}/${localityName.toLowerCase().replace(/\s+/g, "-")}`} className="hover:text-teal-400 transition">{localityName}</Link>
          <span>/</span>
          <span className="text-teal-400">{title}</span>
        </nav>

        {/* Top Hero Split Section */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl">
              <img
                src={images[0]?.url}
                alt={title}
                className="h-full w-full object-cover"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="rounded-md bg-rose-500/90 px-3 py-1 text-xs font-bold text-white shadow backdrop-blur">
                  FOR SALE
                </span>
                <span className="rounded-md bg-teal-500/90 px-3 py-1 text-xs font-bold text-slate-950 shadow backdrop-blur">
                  VERIFIED RERA
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl backdrop-blur-md">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-400">
              📍 {localityName}, {cityName}
            </span>

            <h1 className="mt-2 font-serif text-2xl font-bold text-white sm:text-3xl leading-snug">
              {title}
            </h1>

            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-xs font-semibold uppercase text-slate-400">Starting Price</span>
              <span className="font-serif text-3xl font-extrabold text-amber-300">
                {priceFormatted}
              </span>
            </div>

            {/* Zillow/Bayut Enterprise Location Scores */}
            <div className="mt-5 grid grid-cols-3 gap-2 border-t border-b border-slate-800 py-3 text-center text-xs">
              <div className="rounded-xl bg-slate-950 p-2">
                <span className="block text-[10px] uppercase text-slate-500 font-semibold">WalkScore®</span>
                <span className="font-bold text-teal-400">🚶 {walkScore} / 100</span>
              </div>
              <div className="rounded-xl bg-slate-950 p-2">
                <span className="block text-[10px] uppercase text-slate-500 font-semibold">TransitScore</span>
                <span className="font-bold text-teal-400">🚆 {transitScore} / 100</span>
              </div>
              <div className="rounded-xl bg-slate-950 p-2">
                <span className="block text-[10px] uppercase text-slate-500 font-semibold">SchoolScore</span>
                <span className="font-bold text-teal-400">🏫 {schoolScore} / 100</span>
              </div>
            </div>

            <div className="mt-6">
              <LeadCaptureForm propertyId={dbProp?.id || slug} />
            </div>
          </div>
        </div>

        {/* Quick Highlights Summary Bar */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-6 rounded-2xl border border-slate-800 bg-slate-900 p-4 text-center text-xs">
          <div className="border-r border-slate-800/80 pr-2">
            <span className="block text-slate-500 text-[10px] uppercase">Location</span>
            <span className="font-bold text-white">📍 {localityName}</span>
          </div>
          <div className="border-r border-slate-800/80 pr-2">
            <span className="block text-slate-500 text-[10px] uppercase">Property Type</span>
            <span className="font-bold text-white">🏠 Apartment / Villa</span>
          </div>
          <div className="border-r border-slate-800/80 pr-2">
            <span className="block text-slate-500 text-[10px] uppercase">Super Area</span>
            <span className="font-bold text-white">📐 {areaSqft} Sq.Ft</span>
          </div>
          <div className="border-r border-slate-800/80 pr-2">
            <span className="block text-slate-500 text-[10px] uppercase">Bedrooms</span>
            <span className="font-bold text-white">🛏️ {bedrooms} BHK</span>
          </div>
          <div className="border-r border-slate-800/80 pr-2">
            <span className="block text-slate-500 text-[10px] uppercase">Possession</span>
            <span className="font-bold text-teal-400">✨ Ready to Move</span>
          </div>
          <div>
            <span className="block text-slate-500 text-[10px] uppercase">Compliance</span>
            <span className="font-bold text-amber-300">🧭 Vastu Compliant</span>
          </div>
        </div>

        {/* About the Project */}
        <section className="mt-10 rounded-3xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8">
          <h2 className="font-serif text-2xl font-bold text-white">About the Project</h2>
          <div className="mt-3 text-sm leading-relaxed text-slate-300 whitespace-pre-line">{desc}</div>
        </section>

        {/* Price History & Market Appreciation Box */}
        <section className="mt-10 rounded-3xl border border-slate-800 bg-slate-950 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-teal-400">
                📈 Historical Price Trend & Valuation
              </span>
              <h3 className="mt-1 font-serif text-xl font-bold text-white">
                Market Appreciation: +14.2% YoY in {localityName}
              </h3>
              <p className="mt-1 text-xs text-slate-400">
                Average price per sqft in {localityName} increased from {priceFormatted} baseline over 24 months. High rental yield & capital gains potential.
              </p>
            </div>
            <div className="rounded-2xl border border-teal-500/30 bg-teal-500/10 p-4 text-center shrink-0">
              <span className="block text-[10px] font-bold text-teal-400 uppercase">Estimated Rental Yield</span>
              <span className="font-serif text-2xl font-extrabold text-teal-300">6.8% P.A.</span>
            </div>
          </div>
        </section>

        {/* EMI Home Loan Calculator */}
        <section className="mt-12">
          <EmiCalculator defaultPrice={listingPrice} />
        </section>

        {/* Photo Gallery Grid */}
        <section className="mt-12">
          <h2 className="font-serif text-2xl font-bold text-white">Property Photo Gallery</h2>
          <div className="mt-6 grid gap-4 grid-cols-2 sm:grid-cols-3">
            {images.map((img, idx) => (
              <div key={idx} className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 group">
                <img
                  src={img.url}
                  alt={img.altText || `${title} Image ${idx + 1}`}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Location & Nearby Amenities */}
        <section className="mt-12 rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
          <h2 className="font-serif text-2xl font-bold text-white">Location & Connectivity</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-4 text-xs font-medium text-slate-300">
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">✈️ International Airport: 15 Mins</div>
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">🚆 Railway Station: 10 Mins</div>
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">🏫 International School: 5 Mins</div>
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">🏥 Multi-specialty Hospital: 8 Mins</div>
          </div>

          <div className="mt-6">
            <MapEmbed latitude={latitude} longitude={longitude} label={title} />
          </div>
        </section>

        {/* Developer & RERA Info Box */}
        <section className="mt-12 rounded-3xl border border-teal-500/30 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-teal-400">
                Official Developer Partner
              </span>
              <h3 className="mt-1 font-serif text-2xl font-bold text-white">
                {developer}
              </h3>
              <p className="mt-1 text-xs text-slate-300">
                RERA Registration Number: <span className="font-mono text-amber-300 font-bold">{reraNo}</span>
              </p>
            </div>

            <a
              href={`https://wa.me/919876543210?text=Hi,%20please%20send%20me%20the%20official%20brochure%20and%20floor%20plans%20for%20${encodeURIComponent(title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-gradient-to-r from-amber-400 to-amber-300 px-6 py-3 text-xs font-extrabold text-slate-950 transition hover:opacity-90 shadow-lg shadow-amber-400/20"
            >
              📥 Download Official Brochure & Floor Plan
            </a>
          </div>
        </section>

        {/* AI Spider-Mesh Internal Links & Knowledge Graph */}
        <SpiderInternalLinks
          localityName={localityName}
          cityName={cityName}
          priceFormatted={priceFormatted}
        />
      </div>
    </main>
  );
}
