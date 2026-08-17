"use client";

import { useCallback, useEffect, useState } from "react";
import { getSupabase, SUPABASE_CONFIGURED } from "@/lib/supabase";
import { formatPoints, getLevel } from "@/lib/points";

interface PlayerRow {
  username: string;
  points: number;
  stars: number;
}

export default function Leaderboard({ limit = 20 }: { limit?: number }) {
  const [rows, setRows] = useState<PlayerRow[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    const supabase = getSupabase();
    if (!supabase) {
      setError("unconfigured");
      return;
    }
    const excluded = (process.env.NEXT_PUBLIC_ADMIN_USERNAME ?? "")
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);
    let query = supabase
      .from("player_profiles")
      .select("username, points, stars");
    if (excluded.length) {
      query = query.not("username", "in", `(${excluded.join(",")})`);
    }
    const { data, error: err } = await query.order("points", { ascending: false }).limit(limit);
    if (err) {
      setError(err.message);
      return;
    }
    setRows(
      ((data as PlayerRow[]) ?? []).filter(
        (r) => !excluded.includes((r.username ?? "").toLowerCase())
      )
    );
  }, [limit]);

  useEffect(() => {
    load();
  }, [load]);

  if (!SUPABASE_CONFIGURED) {
    return (
      <p className="text-xs text-slate-500">
        The global leaderboard appears here once accounts are connected.
      </p>
    );
  }
  if (error === "unconfigured") {
    return <p className="text-xs text-slate-500">Leaderboard unavailable.</p>;
  }
  if (error) {
    return <p className="text-xs text-red-400">Could not load leaderboard: {error}</p>;
  }
  if (rows === null) {
    return <p className="text-xs text-slate-500">Loading leaderboard…</p>;
  }
  if (rows.length === 0) {
    return <p className="text-xs text-slate-500">No players yet — be the first on the board!</p>;
  }

  return (
    <ol className="divide-y divide-white/5">
      {rows.map((row, i) => {
        const level = getLevel(row.points);
        const stars = row.stars > 0 ? row.stars : level.stars;
        return (
          <li key={`${row.username}-${i}`} className="flex items-center gap-3 py-2.5">
            <span
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-black ${
                i === 0 ? "bg-amber-400 text-[#0f172a]" : i === 1 ? "bg-slate-300 text-[#0f172a]" : i === 2 ? "bg-orange-700/80 text-[#fff]" : "bg-white/5 text-slate-400"
              }`}
            >
              {i + 1}
            </span>
            <span className="min-w-0 flex-1 truncate text-sm font-semibold text-slate-200">{row.username}</span>
            <span className="text-xs text-amber-300/90" title={`${stars} star${stars === 1 ? "" : "s"}`}>
              {"⭐".repeat(Math.min(stars, 5))}
            </span>
            <span className="w-16 text-right text-sm font-bold tabular-nums text-white">{formatPoints(row.points)}</span>
          </li>
        );
      })}
    </ol>
  );
}
