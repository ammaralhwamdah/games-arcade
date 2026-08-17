"use client";

import { useCallback, useEffect, useMemo, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { CategoryMeta, GameLite } from "@/lib/types";
import { GAMES_PAGE_SIZE } from "@/lib/site";
import { loadGames } from "@/lib/clientCatalog";
import GameCard from "./GameCard";

type SortKey = "popular" | "rating" | "newest" | "az";

const SORTS: { key: SortKey; label: string }[] = [
  { key: "popular", label: "Most Popular" },
  { key: "rating", label: "Top Rated" },
  { key: "newest", label: "Newest" },
  { key: "az", label: "A → Z" },
];

function GameGridInner({
  initialGames,
  categories,
  defaultCategory = "",
}: {
  initialGames: GameLite[];
  categories: CategoryMeta[];
  defaultCategory?: string;
}) {
  const router = useRouter();
  const params = useSearchParams();
  const qParam = params.get("q") ?? "";
  const catParam = params.get("category") ?? defaultCategory;
  const sortParam = (params.get("sort") as SortKey) || "popular";

  const [query, setQuery] = useState(qParam);
  const [category, setCategory] = useState(catParam);
  const [sort, setSort] = useState<SortKey>(sortParam);
  const [visibleCount, setVisibleCount] = useState(GAMES_PAGE_SIZE);
  const [fullList, setFullList] = useState<GameLite[] | null>(null);

  useEffect(() => {
    let mounted = true;
    loadGames()
      .then((games) => mounted && setFullList(games))
      .catch(() => mounted && setFullList(initialGames));
    return () => {
      mounted = false;
    };
  }, [initialGames]);

  const source = fullList ?? initialGames;

  const filtered = useMemo(() => {
    let list = source;
    if (category) list = list.filter((g) => g.category === category || (g.categories ?? []).includes(category));
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (g) =>
          g.name.toLowerCase().includes(q) ||
          g.category.toLowerCase().includes(q) ||
          g.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    const arr = [...list];
    switch (sort) {
      case "popular":
        arr.sort((a, b) => b.plays - a.plays);
        break;
      case "rating":
        arr.sort((a, b) => b.rating - a.rating || b.plays - a.plays);
        break;
      case "newest":
        arr.sort((a, b) => b.year - a.year);
        break;
      case "az":
        arr.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
    return arr;
  }, [source, category, query, sort]);

  const updateUrl = useCallback(
    (next: { q?: string; category?: string; sort?: SortKey }) => {
      const sp = new URLSearchParams(params.toString());
      if (next.q) sp.set("q", next.q);
      else sp.delete("q");
      if (next.category) sp.set("category", next.category);
      else sp.delete("category");
      if (next.sort && next.sort !== "popular") sp.set("sort", next.sort);
      else sp.delete("sort");
      const qs = sp.toString();
      router.replace(qs ? `?${qs}` : window.location.pathname, { scroll: false });
    },
    [router, params]
  );

  const resetPage = () => setVisibleCount(GAMES_PAGE_SIZE);

  const catMeta = new Map(categories.map((c) => [c.slug, { name: c.name, emoji: c.emoji }]));

  const visible = filtered.slice(0, visibleCount);
  const total = filtered.length;

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="flex flex-1 items-center gap-2 rounded-xl border border-white/10 bg-slate-900/70 px-3">
            <svg className="h-4 w-4 shrink-0 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
            </svg>
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                resetPage();
                updateUrl({ q: e.target.value || "", category, sort });
              }}
              placeholder="Search games…"
              className="h-11 w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 outline-none"
              aria-label="Search games"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {SORTS.map((s) => (
              <button
                key={s.key}
                type="button"
                onClick={() => {
                  setSort(s.key);
                  resetPage();
                  updateUrl({ q: query, category, sort: s.key });
                }}
                className={`rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${
                  sort === s.key
                    ? "bg-violet-500 text-[#fff]"
                    : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              setCategory("");
              resetPage();
              updateUrl({ q: query, category: "", sort });
            }}
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
              category === ""
                ? "bg-gradient-to-r from-violet-500 to-cyan-500 text-[#fff]"
                : "bg-white/5 text-slate-400 hover:bg-white/10"
            }`}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c.slug}
              type="button"
              onClick={() => {
                setCategory(c.slug);
                resetPage();
                updateUrl({ q: query, category: c.slug, sort });
              }}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                category === c.slug
                  ? "bg-gradient-to-r from-violet-500 to-cyan-500 text-[#fff]"
                  : "bg-white/5 text-slate-400 hover:bg-white/10"
              }`}
            >
              {c.emoji} {c.name}
            </button>
          ))}
        </div>
      </div>

      <p className="mb-4 text-sm text-slate-400">
        {category ? `Browsing ${category} games` : "Browse all games"}
      </p>

      {visible.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-white/10 py-20 text-center">
          <span className="text-4xl">🎮</span>
          <p className="text-slate-400">No games found matching your search.</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("");
              resetPage();
              updateUrl({ q: "", category: "", sort });
            }}
            className="rounded-lg bg-violet-500 px-4 py-2 text-sm font-semibold text-[#fff]"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {visible.map((g) => (
            <GameCard key={g.slug} game={g} categoryMeta={catMeta.get(g.category)} />
          ))}
        </div>
      )}

      {visibleCount < total && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setVisibleCount((c) => c + GAMES_PAGE_SIZE)}
            className="rounded-xl bg-white/5 px-8 py-3 text-sm font-semibold text-white ring-1 ring-white/10 transition-colors hover:bg-white/10"
          >
            Load more games
          </button>
        </div>
      )}
    </div>
  );
}

export default function GameGrid(props: {
  initialGames: GameLite[];
  categories: CategoryMeta[];
  defaultCategory?: string;
}) {
  return (
    <Suspense fallback={<div className="py-20 text-center text-slate-400">Loading games…</div>}>
      <GameGridInner {...props} />
    </Suspense>
  );
}
