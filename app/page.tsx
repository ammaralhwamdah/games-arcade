import Link from "next/link";
import type { Metadata } from "next";
import SearchBar from "@/components/SearchBar";
import GameCard from "@/components/GameCard";
import CategoryCard from "@/components/CategoryCard";
import AdSlot from "@/components/AdSlot";
import { getFeaturedGames, getPopularGames, getLatestGames, getCategoriesWithCounts } from "@/lib/games";
import { getLatestPosts } from "@/lib/blog";

export function generateMetadata(): Metadata {
  return {
    title: "Free Online Games — Play Instantly",
    description: "Play free online games instantly in your browser. No downloads, no sign-ups. Action, puzzle, sports, arcade and more — all original.",
  };
}

export default function Home() {
  const featured = getFeaturedGames(24);
  const popular = getPopularGames(12);
  const latest = getLatestGames(12);
  const categories = getCategoriesWithCounts();
  const catMeta = new Map(categories.map((c) => [c.slug, { name: c.name, emoji: c.emoji }]));
  const posts = getLatestPosts(3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/5">
        <div className="bg-grid absolute inset-0" aria-hidden />
        <div
          className="absolute inset-0"
          aria-hidden
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% -10%, rgba(139,92,246,0.28), transparent), radial-gradient(ellipse 40% 40% at 85% 20%, rgba(34,211,238,0.15), transparent)",
          }}
        />
        <div className="relative mx-auto flex max-w-7xl flex-col items-center px-4 py-20 text-center sm:px-6 sm:py-28">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-xs font-semibold text-violet-300">
            <span className="h-2 w-2 animate-pulse rounded-full bg-violet-400" />
            All games free — all original
          </span>
          <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-tight text-white sm:text-6xl">
            Play the World&apos;s Best{" "}
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
              Free Online Games
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
            No downloads. No sign-ups. No waiting. Jump straight into action,
            puzzle, sports and strategy games — playable instantly
            in your browser on any device.
          </p>
          <div className="mt-8 flex w-full max-w-xl justify-center">
            <SearchBar large />
          </div>

          <div className="mt-12 grid w-full max-w-2xl grid-cols-2 gap-4">
            {[
              { value: String(categories.length), label: "Categories" },
              { value: "100%", label: "Free to Play" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-white/5 bg-slate-900/60 p-4 backdrop-blur"
              >
                <p className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-2xl font-black text-transparent sm:text-3xl">
                  {s.value}
                </p>
                <p className="mt-1 text-xs text-slate-400 sm:text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">🔥 Featured Games</h2>
            <p className="mt-1 text-sm text-slate-400">Hand-picked games players love right now.</p>
          </div>
          <Link href="/games" className="shrink-0 text-sm font-semibold text-violet-400 hover:text-violet-300">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {featured.map((g) => (
            <GameCard key={g.slug} game={g} categoryMeta={catMeta.get(g.category)} />
          ))}
        </div>
      </section>

      {/* Ad */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <AdSlot format="horizontal" />
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">🎯 Browse by Category</h2>
          <p className="mt-1 text-sm text-slate-400">Find exactly the kind of game you&apos;re in the mood for.</p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((c) => (
            <CategoryCard key={c.slug} category={c} />
          ))}
        </div>
      </section>

      {/* Popular + Latest */}
      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-6 flex items-end justify-between">
              <h2 className="text-xl font-bold text-white sm:text-2xl">🏆 Most Popular</h2>
              <Link href="/games?sort=popular" className="text-sm font-semibold text-violet-400 hover:text-violet-300">
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {popular.map((g) => (
                <GameCard key={g.slug} game={g} categoryMeta={catMeta.get(g.category)} />
              ))}
            </div>
          </div>
          <div>
            <div className="mb-6 flex items-end justify-between">
              <h2 className="text-xl font-bold text-white sm:text-2xl">🆕 Newest Games</h2>
              <Link href="/games?sort=newest" className="text-sm font-semibold text-violet-400 hover:text-violet-300">
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {latest.map((g) => (
                <GameCard key={g.slug} game={g} categoryMeta={catMeta.get(g.category)} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="border-t border-white/5 bg-slate-900/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <h2 className="text-center text-2xl font-bold text-white sm:text-3xl">Why Gamers Love {`PlayKrux`}</h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-sm text-slate-400">
            We built the easiest way to play great games online — no friction, no fees, just fun.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: "⚡", title: "Instant Play", desc: "Games load directly in your browser. No downloads or installs, ever." },
              { icon: "🎮", title: "Original Library", desc: `Hand-built titles across ${categories.length} categories — all exclusive to PlayKrux.` },
              { icon: "📱", title: "Works Everywhere", desc: "Optimized for desktop, tablet and mobile. Play on any device." },
              { icon: "💯", title: "100% Free", desc: "Every single game is completely free to play, no hidden costs." },
            ].map((f) => (
              <div key={f.title} className="rounded-2xl border border-white/5 bg-slate-950/60 p-6 transition-colors hover:border-violet-500/30">
                <span className="text-3xl" aria-hidden>{f.icon}</span>
                <h3 className="mt-4 text-base font-bold text-white">{f.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* From the blog */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">📚 From the Blog</h2>
              <p className="mt-1 text-sm text-slate-400">Guides and tips to help you play better and choose smarter.</p>
            </div>
            <Link href="/blog" className="text-sm font-semibold text-violet-400 hover:text-violet-300">
              View all articles →
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col rounded-2xl border border-white/5 bg-slate-900/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/10 hover:bg-slate-800/60"
              >
                <div className="text-xs font-semibold text-violet-400">
                  {post.emoji} {post.tag}
                </div>
                <h3 className="mt-3 text-base font-bold leading-snug text-white transition-colors group-hover:text-violet-300">
                  {post.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-slate-400">{post.excerpt}</p>
                <div className="mt-4 border-t border-white/5 pt-3 text-xs text-slate-500">
                  {post.readTime}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-600/20 via-slate-900 to-cyan-600/20 px-6 py-14 text-center sm:px-12">
          <h2 className="text-2xl font-black text-white sm:text-4xl">Ready to Play?</h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-slate-300 sm:text-base">
            Jump into your next favorite game right now. It only takes one click.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/games"
              className="rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-8 py-3.5 text-sm font-bold text-[#fff] shadow-lg shadow-violet-500/30 transition-transform hover:scale-105"
            >
              Browse All Games
            </Link>
            <Link
              href="/games?sort=popular"
              className="rounded-xl border border-white/15 bg-white/5 px-8 py-3.5 text-sm font-bold text-white backdrop-blur transition-colors hover:bg-white/10"
            >
              See What&apos;s Popular
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
