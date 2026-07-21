import type { Metadata } from "next";
import Link from "next/link";
import { auth, signOut } from "@/auth";
import "../globals.css";

export const metadata: Metadata = {
  title: "Admin Portal | Tech Erics Enterprise",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 font-sans text-slate-100 antialiased selection:bg-teal-500 selection:text-slate-950">
        <div className="flex min-h-screen">
          {/* Sidebar Navigation */}
          <aside className="w-64 shrink-0 border-r border-white/10 bg-slate-900/80 backdrop-blur-2xl p-6 hidden md:flex flex-col justify-between">
            <div>
              {/* Brand Logo */}
              <Link href="/admin/dashboard" className="flex items-center gap-2 text-xl font-bold tracking-tight text-white font-serif">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 font-sans font-black text-slate-950 shadow-md shadow-teal-500/20">
                  TE
                </div>
                <span>
                  Admin<span className="text-teal-400">Portal</span>
                </span>
              </Link>

              <div className="mt-8 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 px-3">
                  Management Navigation
                </span>

                <Link
                  href="/admin/dashboard"
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-300 transition hover:bg-slate-800 hover:text-white"
                >
                  <span>📊</span> Overview Dashboard
                </Link>

                <Link
                  href="/admin/dashboard/themes"
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold text-teal-400 bg-teal-500/10 border border-teal-500/30 transition hover:bg-teal-500/20"
                >
                  <span>⚡</span> Experience Engine OS
                </Link>

                <Link
                  href="/admin/dashboard/properties"
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-300 transition hover:bg-slate-800 hover:text-white"
                >
                  <span>🏠</span> Property Listings
                </Link>

                <Link
                  href="/admin/dashboard/leads"
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-300 transition hover:bg-slate-800 hover:text-white"
                >
                  <span>📥</span> Lead CRM & Inquiries
                </Link>

                <Link
                  href="/admin/dashboard/blogs"
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-300 transition hover:bg-slate-800 hover:text-white"
                >
                  <span>📝</span> Blog & CMS Articles
                </Link>

                <Link
                  href="/admin/dashboard/new"
                  className="mt-4 flex items-center gap-3 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 px-3.5 py-2.5 text-xs font-bold text-slate-950 shadow-md shadow-teal-500/20 transition hover:opacity-90"
                >
                  <span>➕</span> Add New Property
                </Link>
              </div>
            </div>

            {/* Sidebar User Footer */}
            {session?.user && (
              <div className="border-t border-white/10 pt-4">
                <div className="flex items-center justify-between">
                  <div className="truncate">
                    <span className="block text-xs font-bold text-white truncate">{session.user.name || "Admin User"}</span>
                    <span className="block text-[10px] text-teal-400 uppercase font-semibold">{(session.user as any)?.role || "SUPER_ADMIN"}</span>
                  </div>
                  <form
                    action={async () => {
                      "use server";
                      await signOut();
                    }}
                  >
                    <button type="submit" className="rounded-lg bg-rose-500/10 border border-rose-500/30 px-2 py-1 text-[10px] font-bold text-rose-300 hover:bg-rose-500/20">
                      Exit
                    </button>
                  </form>
                </div>
              </div>
            )}
          </aside>

          {/* Main Content Viewport */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Top Bar */}
            <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-white/10 bg-slate-950/80 backdrop-blur-xl px-6">
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
                  ⚡ Tech Erics Enterprise Control Center
                </span>
              </div>

              <div className="flex items-center gap-4">
                <Link
                  href="/en"
                  target="_blank"
                  className="rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-1.5 text-xs font-semibold text-slate-200 transition hover:bg-slate-800 hover:text-white"
                >
                  🌐 View Live Website →
                </Link>
              </div>
            </header>

            <main className="flex-1 p-6 md:p-8 overflow-y-auto">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
