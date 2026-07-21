import Link from "next/link";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";

export default async function AdminDashboardPage() {
  const session = await auth();

  // Fetch KPI Counts & Recent Properties in parallel
  const [propertiesCount, leadsCount, blogsCount, recentProperties] = await Promise.all([
    prisma.property.count(),
    prisma.lead.count(),
    prisma.blogPost.count({ where: { published: true } }),
    prisma.property.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
      include: { city: true, locality: true, listings: { take: 1, orderBy: { listedAt: "desc" } } },
    }),
  ]);

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="glass-panel rounded-3xl p-8 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-teal-400">
              Control Center
            </span>
            <h1 className="mt-1 font-serif text-3xl font-bold text-white sm:text-4xl">
              Welcome back, {session?.user?.name || "Admin"}
            </h1>
            <p className="mt-2 text-xs text-slate-400">
              Manage luxury properties, CRM leads, and market reports across your global portal.
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              href="/admin/dashboard/new"
              className="rounded-xl bg-gradient-to-r from-teal-400 to-emerald-400 px-5 py-2.5 text-xs font-bold text-slate-950 shadow-lg shadow-teal-500/20 transition hover:opacity-90"
            >
              + Add Property Listing
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Properties</span>
            <span className="text-2xl">🏠</span>
          </div>
          <span className="mt-4 block font-serif text-3xl font-extrabold text-white">{propertiesCount}</span>
          <span className="mt-1 block text-xs text-teal-400 font-semibold">Verified RERA Listings</span>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Leads</span>
            <span className="text-2xl">📥</span>
          </div>
          <span className="mt-4 block font-serif text-3xl font-extrabold text-amber-300">{leadsCount}</span>
          <span className="mt-1 block text-xs text-slate-400">WhatsApp & Direct Enquiries</span>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Blog Articles</span>
            <span className="text-2xl">📝</span>
          </div>
          <span className="mt-4 block font-serif text-3xl font-extrabold text-white">{blogsCount}</span>
          <span className="mt-1 block text-xs text-teal-400 font-semibold">Published Insights</span>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Global Markets</span>
            <span className="text-2xl">🌐</span>
          </div>
          <span className="mt-4 block font-serif text-3xl font-extrabold text-white">14+</span>
          <span className="mt-1 block text-xs text-teal-400 font-semibold">Countries Operating</span>
        </div>
      </div>

      {/* Recent Properties Table */}
      <div className="glass-panel rounded-3xl p-6 overflow-hidden">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-xl font-bold text-white">Recent Property Listings</h2>
          <Link href="/admin/dashboard/properties" className="text-xs font-bold text-teal-400 hover:underline">
            View All Properties ({propertiesCount}) →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-800 bg-slate-900/60 text-slate-400 font-semibold uppercase">
              <tr>
                <th className="px-4 py-3">Property Title</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {recentProperties.map((p) => (
                <tr key={p.id} className="hover:bg-slate-900/40 transition">
                  <td className="px-4 py-3.5 font-bold text-white">{p.title}</td>
                  <td className="px-4 py-3.5 text-slate-400">{p.locality.name}, {p.city.name}</td>
                  <td className="px-4 py-3.5 font-semibold text-amber-300">
                    {p.listings[0] ? `${p.listings[0].currency} ${Number(p.listings[0].price).toLocaleString()}` : "—"}
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="rounded-full bg-teal-500/20 px-2.5 py-0.5 text-[10px] font-bold text-teal-300 border border-teal-500/30">
                      {p.propertyType}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <Link href={`/admin/dashboard/${p.id}/edit`} className="text-xs font-bold text-teal-400 hover:underline">
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
              {!recentProperties.length && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                    No property listings found. Click "+ Add Property Listing" to add your first project.
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
