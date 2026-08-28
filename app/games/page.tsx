import type { Metadata } from "next";
import GameGrid from "@/components/GameGrid";
import { getAllGames, getCategories } from "@/lib/games";
import { GAMES_PAGE_SIZE, SITE_URL } from "@/lib/site";

export function generateMetadata(): Metadata {
  const description =
    "Browse PlayKrux free online games. Search, filter by category and sort by popularity, rating or newest to find your next favorite game — no download, no sign-up.";
  return {
    title: "All Free Online Games — Play Instantly",
    description,
    alternates: { canonical: "/games" },
    robots: { index: true, follow: true },
    openGraph: {
      title: "All Free Online Games — Play Instantly",
      description,
      type: "website",
      url: `${SITE_URL}/games`,
      siteName: "PlayKrux",
    },
  };
}

export default function GamesPage() {
  const games = getAllGames()
    .sort((a, b) => b.plays - a.plays)
    .slice(0, GAMES_PAGE_SIZE);
  const categories = getCategories();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white sm:text-4xl">All Games</h1>
        <p className="mt-2 text-sm text-slate-400 sm:text-base">
          Explore our complete library of free online games — search, filter and play
          instantly.
        </p>
      </div>

      <GameGrid initialGames={games} categories={categories} />
    </div>
  );
}
