import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { generatePropertySchema, generateBreadcrumbSchema } from "@/lib/seo";
import { revalidatePath } from "next/cache";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const input = await req.json();

  const updated = await prisma.property.update({
    where: { id },
    data: {
      title: input.title,
      description: input.description,
      bedrooms: input.bedrooms,
      bathrooms: input.bathrooms,
      areaSqft: input.areaSqft,
      addressLine: input.addressLine,
    },
    include: { city: true, locality: true, media: true, agent: true, listings: { take: 1, orderBy: { listedAt: "desc" } } },
  });

  if (input.price) {
    await prisma.listing.create({
      data: {
        propertyId: updated.id,
        purpose: input.purpose ?? updated.listings[0]?.purpose ?? "SALE",
        price: input.price,
        currency: input.currency ?? "INR",
      },
    });
  }

  // Regenerate cached schema so the live page reflects the edit immediately
  const listing = updated.listings[0];
  const schema = generatePropertySchema(
    updated,
    Number(input.price ?? listing?.price ?? 0),
    input.currency ?? listing?.currency ?? "INR",
    input.purpose ?? listing?.purpose ?? "SALE"
  );
  const breadcrumb = generateBreadcrumbSchema(updated);
  await prisma.property.update({
    where: { id: updated.id },
    data: { schemaJsonLd: JSON.stringify({ schema, breadcrumb }) },
  });

  // Force ISR to serve fresh content on next request instead of waiting for the timer
  revalidatePath(`/en/property/${updated.slug}`);
  revalidatePath(`/hi/property/${updated.slug}`);
  revalidatePath(`/ar/property/${updated.slug}`);

  return NextResponse.json({ success: true });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const property = await prisma.property.findUnique({ where: { id } });
  if (!property) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Soft approach: mark listing OFF_MARKET rather than hard-delete, preserving
  // the URL (redirects/backlinks) — hard delete only removes DB rows if truly needed.
  await prisma.listing.updateMany({
    where: { propertyId: id },
    data: { status: "OFF_MARKET" },
  });

  return NextResponse.json({ success: true });
}
