import type { GameLite } from "./types";

let cachePromise: Promise<GameLite[]> | null = null;

/**
 * Shared client-side catalog loader.
 *
 * Both the header search and the game grids need the full game list. Fetching
 * it once and reusing the same promise across components avoids duplicate
 * downloads and makes the site feel much faster. The lean /data/games.min.json
 * file keeps the payload small while still powering search, sort and filters.
 */
export function loadGames(): Promise<GameLite[]> {
  if (!cachePromise) {
    cachePromise = fetch("/data/games.min.json")
      .then((r) => {
        if (!r.ok) throw new Error(`Failed to load games: ${r.status}`);
        return r.json();
      })
      .then((data: GameLite[]) => data);
  }
  return cachePromise;
}
