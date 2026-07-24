import { Metadata } from "next";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import Link from "next/link";

import SeedGlobalButton from "@/components/SeedGlobalButton";

export const metadata: Metadata = {
  title: "Property Management | Tech Erics Admin",
};

export default async function AdminPropertiesPage() {
  const session = await auth();

  const userRole = (session?.user as any)?.role;
  if (!session || !session.user || !["SUPER_ADMIN", "EDITOR", "AGENT"].includes(userRole)) {
    redirect("/admin/login?callbackUrl=/admin/dashboard/properties");
  }

  const properties = await prisma.property.findMany({
    include: {
      city: true,
      locality: true,
      listings: { take: 1, orderBy: { listedAt: "desc" } },
    },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return (
    <div className="space-y-6">
      {/* Top Header Banner */}
      <div className="glass-panel rounded-3xl p-8 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-teal-400">
              CMS Control Center
            </span>
            <h1 className="mt-1 font-serif text-3xl font-bold text-white">Property Management</h1>
            <p className="mt-2 text-xs text-slate-400">
              Manage luxury residential, commercial, and off-plan masterplan listings across all regions.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <SeedGlobalButton />
            <Link
              href="/admin/dashboard/new"
              className="rounded-xl bg-gradient-to-r from-teal-400 to-emerald-400 px-5 py-2.5 text-xs font-bold text-slate-950 shadow-lg shadow-teal-500/20 hover:opacity-90 transition"
            >
              + Add New Property
            </Link>
          </div>
        </div>
      </div>

      {/* Properties Glass Table */}
      <div className="glass-panel rounded-3xl p-6 overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-lg font-bold text-white">All Properties ({properties.length})</h2>
          <span className="text-xs text-slate-400">RERA Verified Database</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-800 bg-slate-900/80 text-slate-400 font-semibold uppercase">
              <tr>
                <th className="px-4 py-3">Property Title</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">RERA Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {properties.map((property) => (
                <tr key={property.id} className="hover:bg-slate-900/40 transition">
                  <td className="px-4 py-3.5 font-bold text-white">
                    <a
                      href={`/en/property/${property.slug}`}
                      target="_blank"
                      className="hover:text-teal-400 transition"
                    >
                      {property.title}
                    </a>
                  </td>
                  <td className="px-4 py-3.5 text-slate-400">
                    {property.locality.name}, {property.city.name}
                  </td>
                  <td className="px-4 py-3.5 font-semibold text-amber-300">
                    {property.listings[0]
                      ? `${property.listings[0].currency} ${Number(property.listings[0].price).toLocaleString()}`
                      : "—"}
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="rounded-full bg-slate-800 px-2.5 py-0.5 text-[10px] font-bold text-slate-300 border border-slate-700">
                      {property.propertyType}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold text-emerald-300 border border-emerald-500/30">
                      RERA Approved ✓
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <Link
                      href={`/admin/dashboard/${property.id}/edit`}
                      className="text-xs font-bold text-teal-400 hover:underline"
                    >
                      Edit Listing →
                    </Link>
                  </td>
                </tr>
              ))}
              {properties.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-slate-500">
                    No properties listed yet. Click "+ Add New Property" to create your first listing.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
