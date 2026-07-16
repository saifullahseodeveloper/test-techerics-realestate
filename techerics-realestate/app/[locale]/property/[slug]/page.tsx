import { notFound } from "next/navigation";
import type { Metadata } from "next";
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

// ISR: page static rehta hai but har 60s me revalidate hota hai
// (naya price/status turant reflect ho jaata hai, bina full rebuild ke)
export const revalidate = 60;

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

async function getProperty(slug: string) {
  return prisma.property.findUnique({
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
}

// generateStaticParams — build time par top properties pre-render karta hai
export async function generateStaticParams() {
  const properties = await prisma.property.findMany({
    select: { slug: true },
    take: 5000, // top properties pre-build; baaki on-demand ISR se generate
  });
  return properties.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const property = await getProperty(slug);
  if (!property) return {};

  const listing = property.listings[0];
  const { title, description } = generateMeta(
    property,
    Number(listing?.price ?? 0),
    listing?.currency ?? "INR"
  );

  const ogImageUrl = new URL("/api/og", process.env.NEXT_PUBLIC_SITE_URL ?? "https://techerics.com");
  ogImageUrl.searchParams.set("title", property.title);
  ogImageUrl.searchParams.set("price", title.split("—")[1]?.trim() ?? "");
  ogImageUrl.searchParams.set("location", `${property.locality.name}, ${property.city.name}`);
  const firstPhoto = property.media.find((m) => m.type === "PHOTO")?.url;
  if (firstPhoto) ogImageUrl.searchParams.set("image", firstPhoto);

  return {
    title: property.metaTitle ?? title,
    description: property.metaDescription ?? description,
    alternates: {
      canonical: `/property/${property.slug}`,
      languages: {
        en: `/en/property/${property.slug}`,
        hi: `/hi/property/${property.slug}`,
        ar: `/ar/property/${property.slug}`,
      },
    },
    openGraph: {
      title,
      description,
      images: [{ url: ogImageUrl.toString(), width: 1200, height: 630 }],
    },
  };
}

export default async function PropertyPage({ params }: Props) {
  const { slug } = await params;
  const property = await getProperty(slug);
  if (!property) notFound();

  const listing = property.listings[0];
  const price = Number(listing?.price ?? 0);
  const currency = listing?.currency ?? "INR";

  const propertySchema = generatePropertySchema(
    property,
    price,
    currency,
    listing?.purpose === "RENT" ? "RENT" : "SALE"
  );
  const breadcrumbSchema = generateBreadcrumbSchema(property);

  const tour360 = property.media.find((m) => m.type === "TOUR_360");

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      {/* JSON-LD injected server-side — crawler ko pehle HTML load me hi mil jaata hai */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(propertySchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <nav aria-label="breadcrumb" className="mb-4 text-sm text-slate-400">
        Home / {property.city.name} / {property.locality.name} / {property.title}
      </nav>

      <h1 className="text-2xl font-semibold text-slate-100">{property.title}</h1>

      <PropertyGallery media={property.media.filter((m) => m.type === "PHOTO")} propertyTitle={property.title} />

      {tour360 && <Tour360Viewer url={tour360.url} />}

      <section className="mt-6 grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <p className="text-slate-300">{property.description}</p>
          <MapEmbed
            latitude={property.latitude}
            longitude={property.longitude}
            label={property.title}
          />
        </div>
        <aside>
          <LeadCaptureForm propertyId={property.id} />
        </aside>
      </section>
    </main>
  );
}
