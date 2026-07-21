import { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Real Estate Market Trends & Area Guides | Tech Erics",
  description: "Read the latest news, investment tips, market trends, and detailed area guides for global real estate.",
};

type Props = { params: Promise<{ locale: string }> };

export default async function BlogIndexPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Fetch blogs with their category
  const blogs = await prisma.blogPost.findMany({
    where: { published: true },
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  const categories = await prisma.blogCategory.findMany();

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-16 text-slate-100">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-400">
            Real Estate Insights
          </span>
          <h1 className="mt-2 font-serif text-3xl font-bold text-white sm:text-5xl">
            Market Trends & Area Guides
          </h1>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
            Stay ahead of the market with expert analysis, luxury lifestyle features, and comprehensive locality reports.
          </p>
        </div>

        {/* Categories */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            href={`/${locale}/blog`}
            className="rounded-full bg-teal-500/20 border border-teal-500/30 px-5 py-2 text-xs font-semibold text-teal-300"
          >
            All Articles
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/${locale}/blog?category=${cat.slug}`}
              className="rounded-full bg-slate-900 border border-slate-800 px-5 py-2 text-xs font-semibold text-slate-300 hover:border-teal-500/30 hover:text-white transition"
            >
              {cat.name}
            </Link>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <Link
              key={blog.id}
              href={`/${locale}/blog/${blog.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-xl transition hover:-translate-y-1 hover:border-teal-500/40"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={blog.coverImage || "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80"}
                  alt={blog.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />
                {blog.category && (
                  <span className="absolute left-4 top-4 rounded bg-slate-950/80 px-3 py-1 text-xs font-bold text-teal-400 backdrop-blur">
                    {blog.category.name}
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <h2 className="font-serif text-xl font-bold text-white group-hover:text-teal-300 leading-snug">
                    {blog.title}
                  </h2>
                  <p className="mt-3 text-sm text-slate-400 line-clamp-3 leading-relaxed">
                    {blog.content.replace(/<[^>]+>/g, '').substring(0, 150)}...
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-slate-800/80 pt-4">
                  <span className="text-xs font-medium text-slate-500">By {blog.authorName}</span>
                  <span className="text-xs font-semibold text-teal-400">{blog.readTime} min read</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
