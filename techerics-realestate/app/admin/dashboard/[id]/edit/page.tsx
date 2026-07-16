import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import EditPropertyForm from "./EditPropertyForm";

export default async function EditPropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = await prisma.property.findUnique({
    where: { id },
    include: { listings: { take: 1, orderBy: { listedAt: "desc" } } },
  });
  if (!property) notFound();

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-6 text-slate-100">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-4 text-xl font-semibold">Edit Property</h1>
        <EditPropertyForm property={property} />
      </div>
    </main>
  );
}
