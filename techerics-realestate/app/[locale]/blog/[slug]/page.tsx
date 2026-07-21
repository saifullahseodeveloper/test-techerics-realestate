import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { unstable_setRequestLocale } from "next-intl/server";
import { format } from "date-fns";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug },
  });

  if (!post) return { title: "Blog Not Found" };

  return {
    title: `${post.title} | Tech Erics Real Estate`,
    description: post.content.substring(0, 160),
    openGraph: {
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  unstable_setRequestLocale(locale);

  const post = await prisma.blogPost.findUnique({
    where: { slug },
    include: { category: true },
  });

  if (!post || !post.published) return notFound();

  return (
    <main className="min-h-screen bg-slate-950 pb-20 pt-8 text-slate-100">
      <div className="mx-auto max-w-4xl px-4">
        <nav className="mb-8 text-xs font-semibold uppercase tracking-wider text-slate-400">
          <Link href={`/${locale}`} className="hover:text-teal-400">Home</Link> /{" "}
          <Link href={`/${locale}/blog`} className="hover:text-teal-400">Blog</Link> /{" "}
          {post.category && (
            <span className="text-teal-400">{post.category.name}</span>
          )}
        </nav>

        <header className="mb-10 text-center">
          <h1 className="font-serif text-3xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
            {post.title}
          </h1>
          <div className="mt-6 flex items-center justify-center gap-4 text-xs font-medium text-slate-400">
            <span>By <strong className="text-slate-200">{post.authorName}</strong></span>
            <span>•</span>
            <span>{format(post.createdAt, "MMMM d, yyyy")}</span>
            <span>•</span>
            <span className="text-teal-400">{post.readTime} min read</span>
          </div>
        </header>
      </div>

      <div className="mx-auto max-w-5xl px-4">
        {post.coverImage && (
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl shadow-2xl border border-slate-800">
            <img
              src={post.coverImage}
              alt={post.title}
              className="h-full w-full object-cover"
            />
          </div>
        )}
      </div>

      <div className="mx-auto mt-12 max-w-3xl px-4">
        <article className="prose prose-invert prose-teal max-w-none prose-lg prose-headings:font-serif prose-headings:font-bold prose-p:leading-relaxed prose-a:text-teal-400 hover:prose-a:text-teal-300">
          {/* In a real app, render rich text here (e.g. from markdown or HTML). */}
          <div dangerouslySetInnerHTML={{ __html: `<p>${post.content}</p>` }} />
        </article>

        <div className="mt-16 flex items-center justify-between border-t border-slate-800/80 pt-8">
          <Link
            href={`/${locale}/blog`}
            className="flex items-center gap-2 text-sm font-bold text-slate-400 transition hover:text-teal-400"
          >
            ← Back to All Articles
          </Link>
          <div className="flex gap-3">
            <span className="text-xs font-semibold text-slate-500 uppercase">Share:</span>
            {/* Social Share Mock */}
            <span className="cursor-pointer text-slate-300 hover:text-teal-400">X</span>
            <span className="cursor-pointer text-slate-300 hover:text-teal-400">in</span>
            <span className="cursor-pointer text-slate-300 hover:text-teal-400">f</span>
          </div>
        </div>
      </div>
    </main>
  );
}
