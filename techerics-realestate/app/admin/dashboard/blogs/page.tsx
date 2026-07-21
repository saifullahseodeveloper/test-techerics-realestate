import { Metadata } from "next";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog CMS | Tech Erics Admin",
};

export default async function AdminBlogsPage() {
  const session = await auth();

  const userRole = (session?.user as any)?.role;
  if (!session || !session.user || !["SUPER_ADMIN", "EDITOR"].includes(userRole)) {
    redirect("/admin/login?callbackUrl=/admin/dashboard/blogs");
  }

  const blogs = await prisma.blogPost.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      {/* Top Header Banner */}
      <div className="glass-panel rounded-3xl p-8 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-teal-400">
              Content Management System (CMS)
            </span>
            <h1 className="mt-1 font-serif text-3xl font-bold text-white">Market Reports & Area Guides</h1>
            <p className="mt-2 text-xs text-slate-400">
              Publish real estate market trends, investment guides, and neighborhood reports.
            </p>
          </div>

          <Link
            href="/admin/dashboard/blogs/new"
            className="rounded-xl bg-gradient-to-r from-teal-400 to-emerald-400 px-5 py-2.5 text-xs font-bold text-slate-950 shadow-lg shadow-teal-500/20 hover:opacity-90 transition"
          >
            + Create New Post
          </Link>
        </div>
      </div>

      {/* Blog Posts Glass Table */}
      <div className="glass-panel rounded-3xl p-6 overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-lg font-bold text-white">Articles & Reports ({blogs.length})</h2>
          <span className="text-xs text-slate-400">Live SEO Index</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-800 bg-slate-900/80 text-slate-400 font-semibold uppercase">
              <tr>
                <th className="px-4 py-3">Article Title</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Author</th>
                <th className="px-4 py-3">Publish Status</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {blogs.map((blog) => (
                <tr key={blog.id} className="hover:bg-slate-900/40 transition">
                  <td className="px-4 py-3.5 font-bold text-white">
                    <a href={`/en/blog/${blog.slug}`} target="_blank" className="hover:text-teal-400 transition">
                      {blog.title}
                    </a>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="rounded-full bg-slate-800 px-2.5 py-0.5 text-[10px] font-bold text-slate-300 border border-slate-700">
                      {blog.category?.name || "Market Trends"}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-slate-400">{blog.authorName}</td>
                  <td className="px-4 py-3.5">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${
                        blog.published
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                          : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                      }`}
                    >
                      {blog.published ? "Published ✓" : "Draft"}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3.5 text-xs text-slate-400">
                    {new Date(blog.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <button className="text-xs font-bold text-teal-400 hover:underline">
                      Edit Article →
                    </button>
                  </td>
                </tr>
              ))}
              {blogs.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-slate-500">
                    No articles published yet. Click "+ Create New Post" to write your first report.
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
