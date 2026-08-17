import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { SITE_NAME, SITE_URL } from "@/lib/site";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    robots: { index: true, follow: true },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `${SITE_URL}/blog/${slug}`,
      publishedTime: post.date,
      siteName: SITE_NAME,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const others = getAllPosts().filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <nav className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-slate-500" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-violet-400">Home</Link>
        <span aria-hidden>/</span>
        <Link href="/blog" className="hover:text-violet-400">Blog</Link>
        <span aria-hidden>/</span>
        <span className="truncate text-slate-300">{post.title}</span>
      </nav>

      <header>
        <div className="text-xs font-semibold text-violet-400">{post.tag}</div>
        <h1 className="mt-2 text-3xl font-black leading-tight text-white sm:text-4xl">{post.title}</h1>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-500">
          <span>
            {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </span>
          <span aria-hidden>·</span>
          <span>{post.readTime}</span>
          <span aria-hidden>·</span>
          <span>By {SITE_NAME}</span>
        </div>
      </header>

      <article className="mt-8">
        {post.sections.map((section, i) => (
          <section key={i} className="mt-8">
            {section.heading ? (
              <h2 className="text-xl font-bold text-white">{section.heading}</h2>
            ) : null}
            {section.paragraphs ? (
              section.paragraphs.map((para, j) => (
                <p key={j} className="mt-4 text-[15px] leading-8 text-slate-400">
                  {para}
                </p>
              ))
            ) : null}
            {section.bullets ? (
              <ul className="mt-4 space-y-2.5">
                {section.bullets.map((b, j) => (
                  <li key={j} className="flex gap-3 text-[15px] leading-7 text-slate-400">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400" aria-hidden />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
      </article>

      <div className="mt-12 border-t border-white/5 pt-6 text-center">
        <Link
          href="/games"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 px-6 py-3 text-sm font-bold text-white transition-transform hover:scale-105"
        >
          🎮 Play free games now
        </Link>
      </div>

      {others.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-5 text-lg font-bold text-white">Keep reading</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {others.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group rounded-2xl border border-white/5 bg-slate-900/50 p-4 transition-colors hover:border-white/10 hover:bg-slate-800/60"
              >
                <div className="text-[11px] font-semibold text-violet-400">
                  {p.emoji} {p.tag}
                </div>
                <div className="mt-2 text-sm font-bold leading-snug text-white group-hover:text-violet-300">
                  {p.title}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
