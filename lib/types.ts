export interface Game {
  id: string;
  slug: string;
  name: string;
  category: string;
  categories: string[];
  file: string;
  src: string;
  image: string;
  sizeKb: number;
  rating: number;
  plays: number;
  year: number;
  tags: string[];
  description: string;
}

/** Lean client-side shape served via /data/games.min.json. */
export interface GameLite {
  slug: string;
  name: string;
  category: string;
  categories: string[];
  image: string;
  rating: number;
  plays: number;
  year: number;
  tags: string[];
}

export interface CategoryMeta {
  slug: string;
  name: string;
  emoji: string;
  color: string;
  description: string;
}

export interface Catalog {
  generated: string;
  total: number;
  categories: number;
  cdnBase: string;
  categoriesMeta: CategoryMeta[];
  featured: string[];
  games: Game[];
}
