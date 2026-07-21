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

  // Protect route
  if (!session || !session.user || !["SUPER_ADMIN", "EDITOR"].includes(session.user.role as string)) {
    redirect("/admin/login?callbackUrl=/admin/dashboard/blogs");
  }

  const blogs = await prisma.blogPost.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-16 text-slate-100">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 flex items-center justify-between border-b border-slate-800 pb-6">
          <div>
            <h1 className="font-serif text-3xl font-bold text-white">Content Management System</h1>
            <p className="mt-2 text-sm text-slate-400">Manage Area Guides and Market Trends.</p>
          </div>
          <Link
            href="/admin/dashboard/blogs/new"
            className="rounded-lg bg-teal-500 px-5 py-2.5 text-sm font-bold text-slate-950 hover:bg-teal-400 transition"
          >
            + Create New Post
          </Link>
        </header>

        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900 shadow-xl">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950/50 text-xs uppercase text-slate-400">
              <tr>
                <th className="px-6 py-4 font-semibold">Title</th>
                <th className="px-6 py-4 font-semibold">Category</th>
                <th className="px-6 py-4 font-semibold">Author</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {blogs.map((blog) => (
                <tr key={blog.id} className="hover:bg-slate-800/50 transition">
                  <td className="px-6 py-4 font-semibold text-white">
                    <a href={`/en/blog/${blog.slug}`} target="_blank" className="hover:text-teal-400">
                      {blog.title}
                    </a>
                  </td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-slate-800 px-3 py-1 text-[10px] font-bold uppercase text-slate-300">
                      {blog.category?.name || "Uncategorized"}
                    </span>
                  </td>
                  <td className="px-6 py-4">{blog.authorName}</td>
                  <td className="px-6 py-4">
                    <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase ${blog.published ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                      {blog.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-xs">
                    {new Date(blog.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-teal-400 hover:text-teal-300 font-semibold text-xs transition">
                      Edit
                    </button>
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
