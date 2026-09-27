import type { Metadata } from "next";
import GameGrid from "@/components/GameGrid";
import { getAllGames, getCategories } from "@/lib/games";
import { GAMES_PAGE_SIZE, SITE_URL } from "@/lib/site";

const TITLE = "Free Browser Games — Solitaire, Chess, 2048, Racing";
const DESCRIPTION =
  "Play free browser games with no download: solitaire and Klondike, chess, 2048 puzzle, tic-tac-toe, snake, endless runners, racing, clicker and arcade action games. Sort by popularity or play the newest titles instantly.";

export function generateMetadata(): Metadata {
  return {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: "/games" },
    robots: { index: true, follow: true },
    openGraph: {
      title: TITLE,
      description: DESCRIPTION,
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
          instantly. Play solitaire, chess, 2048, tic-tac-toe, snake, endless runners,
          racing, clicker and arcade action games straight in your browser.
        </p>
      </div>

      <GameGrid initialGames={games} categories={categories} />
    </div>
  );
}
