import type { GameLite } from "./types";

let cachePromise: Promise<GameLite[]> | null = null;

/**
 * Shared client-side catalog loader.
 *
 * Both the header search and the game grids need the full game list. Fetching
 * it once and reusing the same promise across components avoids duplicate
 * downloads and makes the site feel much faster. The canonical /data/games.json
 * file is read directly so every grid always mirrors the real catalog.
 */
export function loadGames(): Promise<GameLite[]> {
  if (!cachePromise) {
    cachePromise = fetch("/data/games.json")
      .then((r) => {
        if (!r.ok) throw new Error(`Failed to load games: ${r.status}`);
        return r.json();
      })
      .then((data: { games: GameLite[] }) => data.games);
  }
  return cachePromise;
}
