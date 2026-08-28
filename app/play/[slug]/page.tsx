import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import GameFrame from "@/components/GameFrame";
import GameCard from "@/components/GameCard";
import Comments from "@/components/Comments";
import RegisterPrompt from "@/components/RegisterPrompt";
import { getGameBySlug, getCategory, getSimilarGames, getPopularGames } from "@/lib/games";
import { getGameContent } from "@/lib/gameContent";
import { formatNumber, gameUrl } from "@/lib/format";
import { SITE_NAME, SITE_URL, STATIC_GAME_PAGES, SITE_EDITOR } from "@/lib/site";
import { buildGameTitle, buildGameDescription } from "@/lib/seo";
import type { Game } from "@/lib/types";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getPopularGames(STATIC_GAME_PAGES).map((g) => ({ slug: g.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) return {};
  const title = buildGameTitle(game);
  const raw = (buildGameDescription(game) ?? `Play ${game.name} online for free in your browser.`)
    .replace(/\s+/g, " ")
    .trim();
  const description = raw.length > 158 ? `${raw.slice(0, 155)}\u2026` : raw;
  return {
    title,
    description,
    alternates: { canonical: `/play/${slug}` },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      type: "website",
      url: `${SITE_URL}/play/${slug}`,
      images: game.image ? [{ url: game.image, width: 512, height: 384, alt: game.name }] : [],
    },
  };
}

function describeGame(game: Game): string {
  return game.description
    ? game.description.replace(/\s+/g, " ").trim()
    : `Play ${game.name} online for free right in your browser.`;
}

export default async function PlayPage({ params }: Props) {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) notFound();

  const category = getCategory(game.category);
  const similar = getSimilarGames(game, 8);
  const moreInCategory = getSimilarGames(game, 6);
  const gameContent = getGameContent(slug);
  const src = game.src;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: game.name,
    url: `${SITE_URL}/play/${game.slug}`,
    applicationCategory: "Game",
    genre: category?.name ?? game.category,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    editor: { "@type": "Person", name: SITE_EDITOR, url: `${SITE_URL}/about` },
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 [@media(max-height:380px)]:py-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumbs */}
      <nav className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-slate-500 [@media(max-height:380px)]:hidden" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-violet-400">Home</Link>
        <span aria-hidden>/</span>
        <Link href={`/category/${game.category}`} className="hover:text-violet-400">
          {category?.name ?? game.category}
        </Link>
        <span aria-hidden>/</span>
        <span className="truncate text-slate-300">{game.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
        <div className="min-w-0">
          <div className="mb-5 flex flex-wrap items-start justify-between gap-4 [@media(max-height:380px)]:hidden">
            <div>
              <div className="flex items-start gap-4">
                {game.image ? (
                  <img
                    src={game.image}
                    alt={game.name}
                    className="h-20 w-28 shrink-0 rounded-xl border border-white/10 object-cover"
                  />
                ) : null}
                <div>
                  <h1 className="text-2xl font-black text-white sm:text-3xl">{game.name}</h1>
                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">
                    <span className="inline-flex items-center gap-1">
                      <span className="text-amber-400" aria-hidden>★</span>
                      <span className="font-semibold text-white">{game.rating.toFixed(1)}</span>
                      / 5 rating
                    </span>
                    <span>▶ {formatNumber(game.plays)} plays</span>
                    <span>📅 {game.year}</span>
                    <span>💾 {game.sizeKb} KB</span>
                  </div>
                  <p className="mt-2 text-[11px] text-slate-500">
                    Reviewed &amp; curated by{" "}
                    <Link href="/about" className="font-medium text-slate-400 underline underline-offset-2 hover:text-violet-300">
                      {SITE_EDITOR}
                    </Link>{" "}
                    · {SITE_NAME}
                  </p>
                </div>
              </div>
            </div>
            <Link
              href={`/category/${game.category}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-slate-200 transition-colors hover:bg-white/10"
            >
              <span aria-hidden>{category?.emoji ?? "🎮"}</span>
              {category?.name ?? game.category}
            </Link>
          </div>

          <GameFrame src={src} title={game.name} slug={game.slug} />

          <RegisterPrompt />

          <div className="mt-4 flex items-start gap-3 rounded-xl border border-amber-500/25 bg-amber-500/5 px-4 py-3">
            <span className="mt-0.5 text-sm" aria-hidden>⚠️</span>
            <p className="text-xs leading-6 text-slate-400 sm:text-[13px]">
              Is <span className="font-semibold text-slate-200">{game.name}</span> not loading or not
              working? Please{" "}
              <Link href="/contact" className="font-semibold text-amber-300 underline underline-offset-2 hover:text-amber-200">
                report it to us
              </Link>{" "}
              and we&apos;ll fix it as soon as possible.
            </p>
          </div>

          <div className="mt-8 rounded-2xl border border-white/5 bg-slate-900/50 p-6">
            <h2 className="text-lg font-bold text-white">About {game.name}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-400">{describeGame(game)}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {[game.category, ...game.tags.slice(0, 5)].map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-white/5 px-3 py-1 text-[11px] font-medium text-slate-300 ring-1 ring-white/10"
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>

          {gameContent && gameContent.tips.length > 0 && (
            <div className="mt-8 rounded-2xl border border-white/5 bg-slate-900/50 p-6">
              <h2 className="text-lg font-bold text-white">Tips &amp; Strategies</h2>
              <ul className="mt-4 space-y-3">
                {gameContent.tips.map((tip, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-7 text-slate-400">
                    <span
                      className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500/30 to-cyan-500/30 text-[11px] font-bold text-violet-200"
                      aria-hidden
                    >
                      {i + 1}
                    </span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {gameContent && gameContent.faq.length > 0 && (
            <div className="mt-8 rounded-2xl border border-white/5 bg-slate-900/50 p-6">
              <h2 className="text-lg font-bold text-white">Frequently Asked Questions</h2>
              <div className="mt-4 divide-y divide-white/5">
                {gameContent.faq.map((item, i) => (
                  <details key={i} className="group py-3">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-slate-200 transition-colors hover:text-violet-300">
                      <span>{item.q}</span>
                      <span
                        className="shrink-0 text-slate-500 transition-transform group-open:rotate-45"
                        aria-hidden
                      >
                        +
                      </span>
                    </summary>
                    <p className="mt-2 text-sm leading-7 text-slate-400">{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          )}

          <Comments slug={game.slug} />
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          <div className="rounded-2xl border border-white/5 bg-slate-900/50 p-5">
            <h2 className="mb-4 text-sm font-bold text-white">More {category?.name ?? "Games"}</h2>
            <div className="space-y-3">
              {moreInCategory.map((g) => (
                <Link
                  key={g.slug}
                  href={gameUrl(g.slug)}
                  className="group flex items-center gap-3 rounded-xl p-1.5 transition-colors hover:bg-white/5"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500/40 to-cyan-500/40 text-sm font-black text-white">
                    {g.name.charAt(0)}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-slate-200 group-hover:text-violet-300">
                      {g.name}
                    </span>
                    <span className="block text-[11px] text-slate-500">▶ {formatNumber(g.plays)} plays</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* Similar games */}
      <section className="mt-12">
        <h2 className="mb-6 text-xl font-bold text-white sm:text-2xl">You Might Also Like</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {similar.map((g) => (
            <GameCard
              key={g.slug}
              game={g}
              categoryMeta={
                getCategory(g.category) ? { name: getCategory(g.category)!.name, emoji: getCategory(g.category)!.emoji } : undefined
              }
            />
          ))}
        </div>
      </section>
    </div>
  );
}
