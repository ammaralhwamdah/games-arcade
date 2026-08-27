import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GameGrid from "@/components/GameGrid";
import { getCategory, getGamesByCategory, getCategories } from "@/lib/games";
import { GAMES_PAGE_SIZE } from "@/lib/site";
import type { CategoryMeta } from "@/lib/types";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getCategories().map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  return {
    title: `${category.name} Games — Play Free ${category.name} Games Online`,
    description: category.description,
    alternates: { canonical: `/category/${slug}` },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const games = getGamesByCategory(slug)
    .sort((a, b) => b.plays - a.plays)
    .slice(0, GAMES_PAGE_SIZE);
  const categories: CategoryMeta[] = getCategories();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div
        className="mb-8 rounded-3xl border border-white/5 p-6 sm:p-8"
        style={{ background: `linear-gradient(135deg, ${category.color}22, transparent 70%)` }}
      >
        <div className="flex items-center gap-4">
          <span
            className="flex h-14 w-14 items-center justify-center rounded-2xl text-3xl"
            style={{ background: `${category.color}22`, border: `1px solid ${category.color}55` }}
            aria-hidden
          >
            {category.emoji}
          </span>
          <div>
            <h1 className="text-3xl font-black text-white sm:text-4xl">{category.name} Games</h1>
            <p className="mt-1 text-sm text-slate-400 sm:text-base">{category.description}</p>
          </div>
        </div>
      </div>

      <GameGrid
        initialGames={games}
        categories={categories}
        defaultCategory={slug}
      />
    </div>
  );
}
