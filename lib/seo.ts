import type { Game } from "./types";

const GENRE_HINTS: Record<string, string> = {
  runner: "Endless Runner",
  subway: "Subway Runner",
  endless: "Endless Runner",
  racing: "Racing",
  sport: "Sports",
  shooting: "Shooting",
  puzzle: "Puzzle",
  arcade: "Arcade",
  adventure: "Adventure",
  strategy: "Strategy",
  cooking: "Cooking",
  stickman: "Stickman",
  horror: "Horror",
  hypercasual: "Hypercasual",
  idle: "Idle",
  clicker: "Clicker",
  match: "Match-3",
  match3: "Match-3",
  snake: "Snake",
  space: "Space",
  card: "Card",
  bejeweled: "Match-3",
  "3d": "3D",
  retro: "Retro",
};

const CATEGORY_HINTS: Record<string, string> = {
  arcade: "Arcade",
  adventure: "Adventure",
  puzzle: "Puzzle",
  racing: "Racing",
  shooting: "Shooting",
  strategy: "Strategy",
  sports: "Sports",
  "3d": "3D",
  hypercasual: "Hypercasual",
  bejeweled: "Match-3",
  clicker: "Clicker",
};

const SUFFIXES = [
  "Play Free Online, No Download",
  "Play Online Free, No Sign-Up",
  "Free Online Game, Play Instantly",
  "Play in Browser, No Download",
];

function titleHint(tags: string[], category: string): string {
  for (const t of [...tags, category]) {
    const k = t.toLowerCase();
    if (GENRE_HINTS[k]) return GENRE_HINTS[k];
  }
  return CATEGORY_HINTS[category] ?? "Game";
}

function pickSuffix(name: string): string {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return SUFFIXES[h % SUFFIXES.length];
}

export function buildGameTitle(game: Game): string {
  const hint = titleHint(game.tags, game.category);
  const classic = game.classic?.trim();
  // The classic genre term sits right after the brand name so it matches the
  // query people actually type ("solitaire"), without renaming the game.
  const lead = classic && !game.name.toLowerCase().includes(classic.toLowerCase())
    ? `${game.name} – ${classic} ${hint}`
    : `${game.name} – ${hint}`;
  const suffix = pickSuffix(game.name);
  const full = `${lead} — ${suffix}`;
  return full.length <= 75 ? full : lead;
}

export function buildGameDescription(game: Game): string {
  const base = (game.description ?? `Play ${game.name} online for free in your browser.`)
    .replace(/\s+/g, " ")
    .trim();
  const classic = game.classic?.trim();
  if (!classic) return base;
  // Only prepend when the body does not already open with the term, so the
  // paragraph never reads as two keywords stacked together.
  if (base.toLowerCase().startsWith(classic.toLowerCase())) return base;
  const hooked = `${classic} game: ${base.charAt(0).toLowerCase()}${base.slice(1)}`;
  return hooked.length <= 175 ? hooked : base;
}
