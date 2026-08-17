import type { Metadata } from "next";
import GameGrid from "@/components/GameGrid";
import AdSlot from "@/components/AdSlot";
import { getAllGames, getCategories } from "@/lib/games";
import { GAMES_PAGE_SIZE } from "@/lib/site";

export function generateMetadata(): Metadata {
  return {
    title: "All Free Online Games",
    description: "Browse our free online games. Search, filter by category and sort by popularity, rating or newest to find your next favorite game.",
    alternates: { canonical: "/games" },
  };
}

export const revalidate = 300;

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

      <div className="mt-12">
        <AdSlot format="horizontal" />
      </div>
    </div>
  );
}
