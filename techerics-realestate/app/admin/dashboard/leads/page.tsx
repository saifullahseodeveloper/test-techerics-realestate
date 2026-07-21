import { Metadata } from "next";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";

export const metadata: Metadata = {
  title: "Lead CRM | Tech Erics Admin",
};

export default async function AdminLeadsPage() {
  const session = await auth();

  const userRole = (session?.user as any)?.role;
  if (!session || !session.user || !["SUPER_ADMIN", "EDITOR", "AGENT"].includes(userRole)) {
    redirect("/admin/login?callbackUrl=/admin/dashboard/leads");
  }

  const leads = await prisma.lead.findMany({
    include: {
      property: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      {/* Top Header Banner */}
      <div className="glass-panel rounded-3xl p-8 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-teal-400">
              Customer Relationship Management (CRM)
            </span>
            <h1 className="mt-1 font-serif text-3xl font-bold text-white">Lead Inquiries & CRM</h1>
            <p className="mt-2 text-xs text-slate-400">
              Track customer inquiries, phone numbers, requested properties, and launch direct 1-click WhatsApp chats.
            </p>
          </div>

          <div className="rounded-xl bg-teal-500/10 px-4 py-2 text-xs font-bold text-teal-300 border border-teal-500/30">
            Total Leads Captured: {leads.length}
          </div>
        </div>
      </div>

      {/* Leads CRM Table */}
      <div className="glass-panel rounded-3xl p-6 overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-lg font-bold text-white">Incoming Leads Database</h2>
          <span className="text-xs text-slate-400">Real-time Lead Feed</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-800 bg-slate-900/80 text-slate-400 font-semibold uppercase">
              <tr>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Customer Contact</th>
                <th className="px-4 py-3">Property Inquiry</th>
                <th className="px-4 py-3">Lead Source</th>
                <th className="px-4 py-3">Message Snippet</th>
                <th className="px-4 py-3 text-right">Quick Contact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-900/40 transition">
                  <td className="whitespace-nowrap px-4 py-3.5 text-xs text-slate-400">
                    {new Date(lead.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="font-bold text-white">{lead.name}</div>
                    <div className="text-xs text-teal-400 font-mono">{lead.phone}</div>
                    <div className="text-[11px] text-slate-500">{lead.email}</div>
                  </td>
                  <td className="px-4 py-3.5">
                    {lead.property ? (
                      <a
                        href={`/en/property/${lead.property.slug}`}
                        target="_blank"
                        className="font-semibold text-amber-300 hover:underline"
                      >
                        {lead.property.title.substring(0, 40)}...
                      </a>
                    ) : (
                      <span className="text-slate-500 font-medium">General Portal Inquiry</span>
                    )}
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="rounded-full bg-slate-800 px-2.5 py-0.5 text-[10px] font-bold text-slate-300 border border-slate-700">
                      {lead.source}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-slate-400 italic">
                    {lead.message ? lead.message.substring(0, 50) + "..." : "No message provided"}
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <a
                      href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      className="inline-flex items-center gap-1 rounded-xl bg-emerald-500 px-3.5 py-1.5 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition shadow-md shadow-emerald-500/20"
                    >
                      💬 WhatsApp →
                    </a>
                  </td>
                </tr>
              ))}
              {leads.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-slate-500">
                    No leads captured yet. Lead inquiries from property pages will appear here.
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
