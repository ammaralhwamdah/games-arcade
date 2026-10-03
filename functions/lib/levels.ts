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

export function getLevel(points: number): { stars: number; name: string } {
  let current = STAR_LEVELS[0];
  for (const lvl of STAR_LEVELS) {
    if (points >= lvl.min) current = lvl;
    else break;
  }
  return { stars: current.stars, name: current.name };
}
