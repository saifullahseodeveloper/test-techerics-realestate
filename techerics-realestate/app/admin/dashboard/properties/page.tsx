import { Metadata } from "next";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Property Management | Tech Erics Admin",
};

export default async function AdminPropertiesPage() {
  const session = await auth();

  // Protect route
  const userRole = (session?.user as any)?.role;
  if (!session || !session.user || !["SUPER_ADMIN", "EDITOR", "AGENT"].includes(userRole)) {
    redirect("/admin/login?callbackUrl=/admin/dashboard/properties");
  }

  const properties = await prisma.property.findMany({
    include: {
      city: true,
      locality: true,
    },
    orderBy: { createdAt: "desc" },
    take: 100, // Limit for performance in UI
  });

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-16 text-slate-100">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 flex items-center justify-between border-b border-slate-800 pb-6">
          <div>
            <h1 className="font-serif text-3xl font-bold text-white">Property Management</h1>
            <p className="mt-2 text-sm text-slate-400">View, edit, and manage property listings.</p>
          </div>
          <Link
            href="/admin/dashboard/new"
            className="rounded-lg bg-teal-500 px-5 py-2.5 text-sm font-bold text-slate-950 hover:bg-teal-400 transition"
          >
            + Add New Property
          </Link>
        </header>

        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900 shadow-xl">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950/50 text-xs uppercase text-slate-400">
              <tr>
                <th className="px-6 py-4 font-semibold">Property</th>
                <th className="px-6 py-4 font-semibold">Location</th>
                <th className="px-6 py-4 font-semibold">Type</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Added</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {properties.map((property) => (
                <tr key={property.id} className="hover:bg-slate-800/50 transition">
                  <td className="px-6 py-4 font-semibold text-white">
                    <a href={`/en/property/${property.slug}`} target="_blank" className="hover:text-teal-400 line-clamp-1">
                      {property.title}
                    </a>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-400">
                    {property.locality.name}, {property.city.name}
                  </td>
                  <td className="px-6 py-4">
                    <span className="rounded bg-slate-800 px-2 py-1 text-[10px] font-bold uppercase text-slate-300">
                      {property.propertyType}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-[10px] font-bold uppercase text-emerald-400">
                      Active
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-xs">
                    {new Date(property.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/admin/dashboard/${property.id}/edit`}
                      className="text-teal-400 hover:text-teal-300 font-semibold text-xs transition"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
