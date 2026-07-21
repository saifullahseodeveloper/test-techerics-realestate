import { Metadata } from "next";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";

export const metadata: Metadata = {
  title: "Lead Management CRM | Tech Erics Admin",
};

export default async function AdminLeadsPage() {
  const session = await auth();

  // Protect route
  if (!session || !session.user || !["SUPER_ADMIN", "EDITOR", "AGENT"].includes(session.user.role as string)) {
    redirect("/admin/login?callbackUrl=/admin/dashboard/leads");
  }

  const leads = await prisma.lead.findMany({
    include: {
      property: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-16 text-slate-100">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 flex items-center justify-between border-b border-slate-800 pb-6">
          <div>
            <h1 className="font-serif text-3xl font-bold text-white">Lead Management CRM</h1>
            <p className="mt-2 text-sm text-slate-400">View and manage all incoming property inquiries.</p>
          </div>
          <div className="rounded-lg bg-teal-500/10 px-4 py-2 text-sm font-bold text-teal-400 border border-teal-500/30">
            Total Leads: {leads.length}
          </div>
        </header>

        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900 shadow-xl">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950/50 text-xs uppercase text-slate-400">
              <tr>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">Contact</th>
                <th className="px-6 py-4 font-semibold">Property Inquiry</th>
                <th className="px-6 py-4 font-semibold">Source</th>
                <th className="px-6 py-4 font-semibold">Message</th>
                <th className="px-6 py-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-800/50 transition">
                  <td className="whitespace-nowrap px-6 py-4 text-xs">
                    {new Date(lead.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-white">{lead.name}</div>
                    <div className="mt-1 text-xs text-teal-400">{lead.phone}</div>
                    <div className="text-xs text-slate-500">{lead.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    {lead.property ? (
                      <a href={`/en/property/${lead.property.slug}`} target="_blank" className="font-semibold text-amber-300 hover:underline">
                        {lead.property.title.substring(0, 40)}...
                      </a>
                    ) : (
                      <span className="text-slate-500">General Inquiry</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-slate-800 px-3 py-1 text-[10px] font-bold uppercase text-slate-300">
                      {lead.source}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs italic text-slate-400">
                    {lead.message ? lead.message.substring(0, 50) + "..." : "No message"}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <a
                      href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      className="inline-flex items-center gap-1 rounded bg-teal-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-teal-500 transition"
                    >
                      WhatsApp
                    </a>
                  </td>
                </tr>
              ))}
              {leads.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-slate-500">
                    No leads found yet.
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
