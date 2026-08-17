import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { SITE_NAME } from "@/lib/site";

export function generateMetadata(): Metadata {
  return {
    title: "Game Guides & Blog",
    description:
      "Game guides, strategies and honest articles about free online gaming - how to play better, choose your next game and play safely.",
    alternates: { canonical: "/blog" },
  };
}

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <div className="mb-10 text-center">
        <span className="text-4xl" aria-hidden>📚</span>
        <h1 className="mt-3 text-3xl font-black text-white sm:text-4xl">Game Guides &amp; Blog</h1>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
          Honest guides, strategy breakdowns and helpful articles to make your free online gaming
          better - written for {SITE_NAME} players.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col rounded-2xl border border-white/5 bg-slate-900/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/10 hover:bg-slate-800/60"
          >
            <div className="flex items-center gap-2 text-xs font-semibold text-violet-400">
              <span aria-hidden>{post.emoji}</span>
              {post.tag}
            </div>
            <h2 className="mt-3 text-lg font-bold leading-snug text-white transition-colors group-hover:text-violet-300">
              {post.title}
            </h2>
            <p className="mt-3 flex-1 text-sm leading-6 text-slate-400">{post.excerpt}</p>
            <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4 text-xs text-slate-500">
              <span>{new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
              <span className="inline-flex items-center gap-1">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <circle cx="12" cy="12" r="9" />
                  <path strokeLinecap="round" d="M12 7v5l3 2" />
                </svg>
                {post.readTime}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
