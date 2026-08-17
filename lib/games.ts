import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { Catalog, CategoryMeta, Game } from "./types";

let cached: Catalog | null = null;

export function getCatalog(): Catalog {
  if (cached) return cached;
  const raw = readFileSync(join(process.cwd(), "public", "data", "games.json"), "utf8");
  cached = JSON.parse(raw) as Catalog;
  return cached;
}

export function getAllGames(): Game[] {
  return getCatalog().games;
}

export function getGameCount(): number {
  return getCatalog().total;
}

export function getGameBySlug(slug: string): Game | undefined {
  return getCatalog().games.find((g) => g.slug === slug);
}

export function getGamesByCategory(slug: string): Game[] {
  return getCatalog().games.filter(
    (g) => g.category === slug || (g.categories ?? [g.category]).includes(slug)
  );
}

export function getCategory(slug: string): CategoryMeta | undefined {
  return getCatalog().categoriesMeta.find((c) => c.slug === slug);
}

function categoryCounts(): Map<string, number> {
  const counts = new Map<string, number>();
  for (const g of getCatalog().games) {
    const cats = g.categories ?? [g.category];
    for (const c of cats) counts.set(c, (counts.get(c) ?? 0) + 1);
  }
  return counts;
}

export function getCategories(): CategoryMeta[] {
  const counts = categoryCounts();
  return getCatalog().categoriesMeta.filter((c) => (counts.get(c.slug) ?? 0) > 0);
}

export function getCategoriesWithCounts(): (CategoryMeta & { count: number })[] {
  const counts = categoryCounts();
  return getCatalog().categoriesMeta
    .map((c) => ({ ...c, count: counts.get(c.slug) ?? 0 }))
    .filter((c) => c.count > 0)
    .sort((a, b) => b.count - a.count);
}

export function getFeaturedGames(limit = 24): Game[] {
  const catalog = getCatalog();
  const bySlug = new Map(catalog.games.map((g) => [g.slug, g]));
  return catalog.featured
    .slice(0, limit)
    .map((slug) => bySlug.get(slug))
    .filter((g): g is Game => Boolean(g));
}

export function getPopularGames(limit = 12): Game[] {
  return [...getCatalog().games]
    .sort((a, b) => b.plays - a.plays)
    .slice(0, limit);
}

export function getLatestGames(limit = 12): Game[] {
  return [...getCatalog().games]
    .sort((a, b) => b.year - a.year)
    .slice(0, limit);
}

let cachedCatMap: Map<string, Game[]> | null = null;

function catMap(): Map<string, Game[]> {
  if (cachedCatMap) return cachedCatMap;
  const m = new Map<string, Game[]>();
  for (const g of getCatalog().games) {
    for (const c of g.categories ?? [g.category]) {
      if (!m.has(c)) m.set(c, []);
      m.get(c)!.push(g);
    }
  }
  for (const list of m.values()) list.sort((a, b) => b.plays - a.plays);
  cachedCatMap = m;
  return m;
}

export function getSimilarGames(game: Game, limit = 12): Game[] {
  const sameCat = (catMap().get(game.category) ?? []).filter((g) => g.slug !== game.slug);
  if (sameCat.length >= limit) return sameCat.slice(0, limit);
  const bySlug = new Set(sameCat.map((g) => g.slug));
  const extras = getCatalog().games
    .filter((g) => g.slug !== game.slug && !bySlug.has(g.slug) && !(g.categories ?? []).includes(game.category))
    .sort((a, b) => b.plays - a.plays)
    .slice(0, limit - sameCat.length);
  return [...sameCat, ...extras];
}

export function searchGames(query: string, limit = 60): Game[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  const scored = getCatalog().games
    .map((g) => {
      const name = g.name.toLowerCase();
      const cat = g.category.toLowerCase();
      const tags = g.tags.join(" ").toLowerCase();
      let score = 0;
      if (name === q) score = 1000;
      else if (name.startsWith(q)) score = 500;
      else if (name.includes(q)) score = 250;
      if (tags.includes(q) || cat.includes(q)) score = Math.max(score, 50);
      return { g, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || b.g.plays - a.g.plays);
  return scored.slice(0, limit).map((x) => x.g);
}
