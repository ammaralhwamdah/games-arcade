"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { GameLite } from "@/lib/types";
import { loadGames } from "@/lib/clientCatalog";

export default function SearchBar({ autoFocus = false, large = false }: { autoFocus?: boolean; large?: boolean }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState<GameLite[]>([]);
  const [active, setActive] = useState(0);
  const boxRef = useRef<HTMLDivElement>(null);
  const loadedRef = useRef(false);

  // Lazy-load the catalog only when the user starts interacting with search.
  // This keeps the initial page load fast (especially on game pages).
  const ensureLoaded = () => {
    if (loadedRef.current) return;
    loadedRef.current = true;
    loadGames()
      .then(setIndex)
      .catch(() => setIndex([]));
  };

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q || q.length < 2) return [];
    const scored = index
      .map((g) => {
        const name = g.name.toLowerCase();
        let score = 0;
        if (name === q) score = 1000;
        else if (name.startsWith(q)) score = 500;
        else if (name.includes(q)) score = 250;
        if (g.category.includes(q) || g.tags.some((t) => t.includes(q))) score = Math.max(score, 40);
        return { g, score };
      })
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score || b.g.plays - a.g.plays)
      .slice(0, 8)
      .map((x) => x.g);
    return scored;
  }, [query, index]);

  const goToGame = (slug: string) => {
    setOpen(false);
    setQuery("");
    router.push(`/play/${slug}`);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (results[active]) goToGame(results[active].slug);
      else if (query.trim()) router.push(`/games?q=${encodeURIComponent(query.trim())}`);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div ref={boxRef} className="relative w-full max-w-xl">
      <div
        className={`flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/80 px-4 transition-colors focus-within:border-violet-500/60 ${
          large ? "h-14" : "h-11"
        }`}
      >
        <svg className="h-5 w-5 shrink-0 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
        </svg>
        <input
          autoFocus={autoFocus}
          value={query}
          onChange={(e) => {
            ensureLoaded();
            setQuery(e.target.value);
            setOpen(true);
            setActive(0);
          }}
          onFocus={() => {
            ensureLoaded();
            if (query.length >= 2) setOpen(true);
          }}
          onKeyDown={onKeyDown}
          placeholder="Search games…"
          className={`w-full bg-transparent text-slate-100 placeholder-slate-500 outline-none ${
            large ? "text-base" : "text-sm"
          }`}
          aria-label="Search games"
        />
      </div>

      {open && results.length > 0 && (
        <ul className="absolute z-50 mt-2 w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl shadow-black/50">
          {results.map((g, i) => (
            <li key={g.slug}>
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onClick={() => goToGame(g.slug)}
                className={`flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left transition-colors ${
                  i === active ? "bg-violet-500/20" : "hover:bg-white/5"
                }`}
              >
                <span className="truncate text-sm font-medium text-slate-100">{g.name}</span>
                <span className="shrink-0 text-[10px] uppercase tracking-wide text-slate-500">{g.category}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
