export const POINTS_PER_TICK = 1;
export const TICK_SECONDS = 3600;
export const DAILY_BONUS_POINTS = 1;

export interface Level {
  stars: number;
  name: string;
  min: number;
  nextAt: number | null;
  progress: number;
}

export const STAR_LEVELS: { stars: number; name: string; min: number }[] = [
  { stars: 1, name: "Rookie", min: 0 },
  { stars: 2, name: "Player", min: 100 },
  { stars: 3, name: "Gamer", min: 250 },
  { stars: 4, name: "Pro", min: 500 },
  { stars: 5, name: "Expert", min: 1000 },
  { stars: 6, name: "Master", min: 2000 },
  { stars: 7, name: "Legend", min: 4000 },
  { stars: 8, name: "Champion", min: 8000 },
  { stars: 9, name: "Mythic", min: 15000 },
  { stars: 10, name: "Immortal", min: 30000 },
];

export function getLevel(points: number): Level {
  let current = STAR_LEVELS[0];
  let next = STAR_LEVELS[1] ?? null;
  for (let i = 0; i < STAR_LEVELS.length; i++) {
    if (points >= STAR_LEVELS[i].min) {
      current = STAR_LEVELS[i];
      next = STAR_LEVELS[i + 1] ?? null;
    } else break;
  }
  const progress = next
    ? Math.min(1, Math.max(0, (points - current.min) / (next.min - current.min)))
    : 1;
  return { stars: current.stars, name: current.name, min: current.min, nextAt: next?.min ?? null, progress };
}

export function formatPoints(n: number): string {
  return n.toLocaleString("en-US");
}
