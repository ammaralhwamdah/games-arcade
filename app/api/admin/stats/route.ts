import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { isAdminRequest, getExcludedUsernames } from "@/lib/admin";

export const dynamic = "force-dynamic";

interface TopGame {
  slug: string;
  title: string;
  count: number;
}

export async function GET(request: Request) {
  const token = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ?? null;
  if (!(await isAdminRequest(token))) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    return NextResponse.json({ error: "supabase not configured" }, { status: 500 });
  }

  const supabase = createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    global: { headers: { Authorization: `Bearer ${token}` } },
  });

  const excluded = getExcludedUsernames();
  const applyExclusion = <T>(query: T): T =>
    excluded.length
      ? (query as any).not("username", "in", `(${excluded.join(",")})`)
      : query;

  const [playersRes, eventsRes] = await Promise.all([
    applyExclusion(
      supabase
        .from("player_profiles")
        .select("username, points, stars, level_name, updated_at")
    ).limit(10000),
    applyExclusion(
      supabase
        .from("play_events")
        .select("game_slug, game_title, username, played_at")
        .order("played_at", { ascending: false })
    ).limit(10000),
  ]);

  if (playersRes.error || eventsRes.error) {
    return NextResponse.json(
      { error: playersRes.error?.message ?? eventsRes.error?.message },
      { status: 500 }
    );
  }

  const players = playersRes.data ?? [];
  const events = eventsRes.data ?? [];

  const totalPoints = players.reduce((s, p) => s + (p.points ?? 0), 0);
  const totalStars = players.reduce((s, p) => s + (p.stars ?? 0), 0);
  const levelDist = players.reduce<Record<string, number>>((acc, p) => {
    const lvl = p.level_name ?? "Rookie";
    acc[lvl] = (acc[lvl] ?? 0) + 1;
    return acc;
  }, {});
  const topPlayers = [...players]
    .sort((a, b) => (b.points ?? 0) - (a.points ?? 0))
    .slice(0, 10);

  const byGame = new Map<string, TopGame>();
  for (const e of events) {
    const cur = byGame.get(e.game_slug) ?? {
      slug: e.game_slug,
      title: e.game_title ?? e.game_slug,
      count: 0,
    };
    cur.count += 1;
    byGame.set(e.game_slug, cur);
  }
  const mostPlayed = [...byGame.values()].sort((a, b) => b.count - a.count).slice(0, 10);

  return NextResponse.json({
    players: {
      total: players.length,
      totalPoints,
      totalStars,
      avgPoints: players.length ? Math.round(totalPoints / players.length) : 0,
      levelDist,
    },
    topPlayers,
    plays: {
      totalEvents: events.length,
      mostPlayed,
      recent: events.slice(0, 25),
    },
  });
}
