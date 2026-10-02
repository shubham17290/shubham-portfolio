import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — Shubham Maurya",
  description: "Notes on AI, full-stack development, and building things.",
};

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

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-xs uppercase tracking-wider text-zinc-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Blog
          </p>
          <h1 className="mt-4 text-5xl font-bold leading-[1.05] tracking-tight text-balance sm:text-6xl">
            Writing
          </h1>
          <p className="mt-4 text-base leading-relaxed text-zinc-400">
            Notes on AI, full-stack development, and building things.
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="mt-12 rounded-2xl border border-white/10 bg-white/[0.02] p-8 text-center text-sm text-zinc-400">
            No posts yet — coming soon.
          </p>
        ) : (
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-6 shadow-[0_1px_0_0_rgba(255,255,255,0.05)_inset] transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
              >
                <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-400">
                    {post.excerpt}
                  </p>
                )}
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
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
