export interface CategoryStyle {
  slug: string;
  name: string;
  emoji: string;
  color: string;
}

export const CATEGORY_META: CategoryStyle[] = [
  { slug: "arcade", name: "Arcade", emoji: "🕹️", color: "#f43f5e" },
  { slug: "puzzle", name: "Puzzle", emoji: "🧩", color: "#8b5cf6" },
  { slug: "action", name: "Action", emoji: "💥", color: "#ef4444" },
  { slug: "adventure", name: "Adventure", emoji: "🗺️", color: "#f59e0b" },
  { slug: "hypercasual", name: "Hypercasual", emoji: "⚡", color: "#06b6d4" },
  { slug: "girls", name: "Girls", emoji: "👗", color: "#ec4899" },
  { slug: "clicker", name: "Clicker", emoji: "🖱️", color: "#14b8a6" },
  { slug: "3d", name: "3D", emoji: "🧊", color: "#3b82f6" },
  { slug: "racing", name: "Racing", emoji: "🏎️", color: "#ef4444" },
  { slug: "shooting", name: "Shooting", emoji: "🎯", color: "#22c55e" },
  { slug: "boys", name: "Boys", emoji: "🤖", color: "#0ea5e9" },
  { slug: "sports", name: "Sports", emoji: "🏅", color: "#10b981" },
  { slug: "2-player", name: "2 Player", emoji: "👥", color: "#a855f7" },
  { slug: "cooking", name: "Cooking", emoji: "🍳", color: "#fb923c" },
  { slug: "bejeweled", name: "Bejeweled", emoji: "💎", color: "#22c55e" },
  { slug: "stickman", name: "Stickman", emoji: "🥢", color: "#64748b" },
  { slug: "soccer", name: "Soccer", emoji: "⚽", color: "#16a34a" },
];

const DEFAULT_STYLE: CategoryStyle = {
  slug: "other",
  name: "Other",
  emoji: "🎮",
  color: "#64748b",
};

const META_BY_SLUG = new Map(CATEGORY_META.map((c) => [c.slug, c]));

export function getCategoryStyle(slug: string): CategoryStyle {
  return META_BY_SLUG.get(slug) ?? DEFAULT_STYLE;
}
