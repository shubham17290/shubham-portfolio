import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug, type BlogPost } from "@/lib/blog";
import { links } from "@/lib/data";
import ShareRow from "@/components/ShareRow";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  let post: BlogPost;
  try {
    post = getPostBySlug(slug);
  } catch {
    return { title: "Post not found — Shubham Maurya" };
  }
  const url = `${links.portfolio}/blog/${post.slug}`;
  return {
    title: `${post.title} — Shubham Maurya`,
    description: post.excerpt,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url,
    },
  };
}

function formatDate(date: string) {
  if (!date) return "";
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let post: BlogPost;
  try {
    post = getPostBySlug(slug);
  } catch {
    notFound();
  }

  const posts = getAllPosts();
  const index = posts.findIndex((p) => p.slug === slug);
  const older = index >= 0 && index < posts.length - 1 ? posts[index + 1] : null;
  const newer = index > 0 ? posts[index - 1] : null;
  const url = `${links.portfolio}/blog/${post.slug}`;

  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Back to blog
          </Link>

          <h1 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-balance sm:text-4xl md:text-5xl">
            {post.title}
          </h1>

          <p className="mt-4 font-mono text-xs uppercase tracking-wider text-zinc-500">
            {[formatDate(post.date), post.readingTime]
              .filter(Boolean)
              .join(" · ")}
          </p>

          {post.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-white/[0.06] px-2 py-1 font-mono text-xs text-zinc-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="mx-auto my-8 max-w-3xl border-t border-white/10" />

        <article className="prose prose-invert prose-lg max-w-3xl mx-auto">
          <MDXRemote source={post.content} />
        </article>

        <div className="mx-auto mt-12 max-w-3xl">
          <div className="flex items-center justify-between border-t border-white/10 pt-8">
            <ShareRow title={post.title} url={url} />
          </div>

          {(older || newer) && (
            <nav className="mt-8 grid gap-6 sm:grid-cols-2">
              {older ? (
                <Link
                  href={`/blog/${older.slug}`}
                  className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 shadow-[0_1px_0_0_rgba(255,255,255,0.05)_inset] transition-colors hover:border-white/20"
                >
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-zinc-500">
                    <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
                    Previous
                  </span>
                  <span className="mt-2 block text-xl font-semibold tracking-tight text-white">
                    {older.title}
                  </span>
                </Link>
              ) : (
                <span />
              )}
              {newer ? (
                <Link
                  href={`/blog/${newer.slug}`}
                  className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-right shadow-[0_1px_0_0_rgba(255,255,255,0.05)_inset] transition-colors hover:border-white/20"
                >
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-zinc-500">
                    Next
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                  <span className="mt-2 block text-xl font-semibold tracking-tight text-white">
                    {newer.title}
                  </span>
                </Link>
              ) : (
                <span />
              )}
            </nav>
          )}
        </div>
      </div>
    </section>
  );
}
