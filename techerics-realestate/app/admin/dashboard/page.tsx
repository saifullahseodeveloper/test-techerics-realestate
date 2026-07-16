import Link from "next/link";
import { prisma } from "@/lib/db";
import { auth, signOut } from "@/auth";

export default async function AdminDashboard() {
  const session = await auth();
  const properties = await prisma.property.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
    include: { city: true, locality: true, listings: { take: 1, orderBy: { listedAt: "desc" } } },
  });

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-6 text-slate-100">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">Dashboard</h1>
            <p className="text-sm text-slate-400">
              Welcome, {session?.user?.name ?? session?.user?.email}
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              href="/admin/dashboard/new"
              className="rounded-md bg-teal-500 px-4 py-2 text-sm font-medium text-slate-950 hover:bg-teal-400"
            >
              + Add Property
            </Link>
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <button className="rounded-md border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800">
                Sign out
              </button>
            </form>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-800">
          <table className="w-full text-sm">
            <thead className="bg-slate-900 text-left text-slate-400">
              <tr>
                <th className="p-3">Title</th>
                <th className="p-3">Location</th>
                <th className="p-3">Price</th>
                <th className="p-3">SEO</th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              {properties.map((p) => (
                <tr key={p.id} className="border-t border-slate-800">
                  <td className="p-3">{p.title}</td>
                  <td className="p-3 text-slate-400">
                    {p.locality.name}, {p.city.name}
                  </td>
                  <td className="p-3 text-slate-400">
                    {p.listings[0]
                      ? `${p.listings[0].currency} ${Number(p.listings[0].price).toLocaleString()}`
                      : "—"}
                  </td>
                  <td className="p-3">
                    <span className="rounded-full bg-teal-950 px-2 py-0.5 text-xs text-teal-400">
                      Auto-generated ✓
                    </span>
                  </td>
                  <td className="p-3">
                    <Link href={`/admin/dashboard/${p.id}/edit`} className="text-xs text-violet-400 hover:underline">
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
              {!properties.length && (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-slate-500">
                    No properties yet — add your first one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
