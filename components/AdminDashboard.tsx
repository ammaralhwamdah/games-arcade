"use client";

import { useCallback, useEffect, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { useAuth } from "./AuthProvider";
import { formatPoints, getLevel } from "@/lib/points";

interface StatsData {
  players: {
    total: number;
    totalPoints: number;
    totalStars: number;
    avgPoints: number;
    levelDist: Record<string, number>;
  };
  topPlayers: { username: string; points: number; stars: number; level_name: string }[];
  plays: {
    totalEvents: number;
    mostPlayed: { slug: string; title: string; count: number }[];
    recent: { game_slug: string; game_title: string; username: string; played_at: string }[];
  };
}

interface GameCommentRow {
  id: string;
  game_slug: string;
  name: string;
  content: string;
  created_at: string;
}

export default function AdminDashboard({
  gameCount,
  categoryCount,
}: {
  gameCount: number;
  categoryCount: number;
}) {
  const { session, loading } = useAuth();
  const [admin, setAdmin] = useState<boolean | null>(null);
  const [stats, setStats] = useState<StatsData | null>(null);
  const [statsStatus, setStatsStatus] = useState<"idle" | "loading" | "ok" | "empty" | "error">("idle");
  const [comments, setComments] = useState<GameCommentRow[] | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [commentError, setCommentError] = useState<string | null>(null);

  const loadStats = useCallback(async () => {
    if (!session) return;
    setStatsStatus("loading");
    setError(null);
    const res = await fetch("/api/admin/stats", {
      headers: { Authorization: `Bearer ${session.access_token}` },
    });
    if (!res.ok) {
      setStatsStatus("error");
      setError((await res.json().catch(() => ({ error: "failed" }))).error ?? "failed");
      return;
    }
    const data = (await res.json()) as StatsData;
    const hasAny =
      data.players.total > 0 ||
      data.plays.totalEvents > 0 ||
      data.topPlayers.length > 0 ||
      data.plays.mostPlayed.length > 0;
    setStats(data);
    setStatsStatus(hasAny ? "ok" : "empty");
  }, [session]);

  const loadComments = useCallback(async () => {
    if (!session) return;
    const res = await fetch("/api/admin/comments", {
      headers: { Authorization: `Bearer ${session.access_token}` },
    });
    if (res.ok) {
      const data = await res.json();
      setComments(data.comments ?? []);
    }
  }, [session]);

  const removeComment = async (id: string) => {
    if (!session) return;
    setDeletingId(id);
    setCommentError(null);
    try {
      const res = await fetch(`/api/admin/comments?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      if (res.ok) {
        setComments((prev) => (prev ?? []).filter((c) => c.id !== id));
      } else {
        const data = await res.json().catch(() => ({ error: "Could not delete comment." }));
        setCommentError(data.error ?? "Could not delete comment.");
      }
    } catch {
      setCommentError("Network error while deleting.");
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!session) {
      setAdmin(false);
      return;
    }
    let cancelled = false;
    fetch("/api/admin/check", { headers: { Authorization: `Bearer ${session.access_token}` } })
      .then((r) => r.json())
      .then((d) => {
        if (cancelled) return;
        setAdmin(Boolean(d.admin));
        if (d.admin) {
          loadStats();
          loadComments();
        }
      })
      .catch(() => {
        if (!cancelled) setAdmin(false);
      });
    return () => {
      cancelled = true;
    };
  }, [session, loading, loadStats, loadComments]);

  if (loading) {
    return <PageShell><p className="text-sm text-slate-400">Loading…</p></PageShell>;
  }

  if (!admin) {
    return (
      <PageShell>
        <div className="mx-auto max-w-md rounded-2xl border border-white/5 bg-slate-900/50 p-8 text-center">
          <p className="text-4xl">🔒</p>
          <h1 className="mt-3 text-lg font-bold text-white">Access denied</h1>
          <p className="mt-2 text-sm text-slate-400">
            This page is for the site administrator only. Please sign in with the admin account.
          </p>
          <Link
            href="/rewards"
            className="mt-5 inline-flex rounded-xl bg-violet-500 px-5 py-2.5 text-sm font-semibold text-[#fff] hover:bg-violet-400"
          >
            Go to sign in
          </Link>
        </div>
      </PageShell>
    );
  }

  if (error) {
    return (
      <PageShell>
        <p className="text-sm text-red-400">Failed to load stats: {error}</p>
      </PageShell>
    );
  }

  if (!stats) {
    return <PageShell><p className="text-sm text-slate-400">Loading stats…</p></PageShell>;
  }

  const levelEntries = Object.entries(stats.players.levelDist).sort((a, b) => b[1] - a[1]);

  return (
    <PageShell>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total games" value={String(gameCount)} />
        <StatCard label="Categories" value={String(categoryCount)} />
        <StatCard label="Players" value={String(stats.players.total)} />
        <StatCard label="Play sessions" value={String(stats.plays.totalEvents)} />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Total points" value={formatPoints(stats.players.totalPoints)} />
        <StatCard label="Total stars" value={String(stats.players.totalStars)} />
        <StatCard label="Avg points / player" value={formatPoints(stats.players.avgPoints)} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Panel title="🏆 Top 10 players">
          <ol className="divide-y divide-white/5">
            {stats.topPlayers.map((p, i) => {
              const level = getLevel(p.points);
              return (
                <li key={`${p.username}-${i}`} className="flex items-center gap-3 py-2.5">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/5 text-xs font-black text-slate-300">
                    {i + 1}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-sm font-semibold text-slate-200">{p.username}</span>
                  <span className="text-[11px] text-slate-500">{p.level_name ?? level.name}</span>
                  <span className="w-16 text-right text-sm font-bold tabular-nums text-white">{formatPoints(p.points)}</span>
                </li>
              );
            })}
            {stats.topPlayers.length === 0 && <li className="py-3 text-sm text-slate-500">No players yet.</li>}
          </ol>
        </Panel>

        <Panel title="📈 Most played games">
          <ol className="divide-y divide-white/5">
            {stats.plays.mostPlayed.map((g, i) => (
              <li key={g.slug} className="flex items-center gap-3 py-2.5">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/5 text-xs font-black text-slate-300">
                  {i + 1}
                </span>
                <span className="min-w-0 flex-1 truncate text-sm font-semibold text-slate-200">{g.title}</span>
                <span className="text-sm font-bold tabular-nums text-violet-300">{g.count}</span>
              </li>
            ))}
            {stats.plays.mostPlayed.length === 0 && <li className="py-3 text-sm text-slate-500">No play sessions yet.</li>}
          </ol>
        </Panel>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Panel title="⭐ Level distribution">
          <ol className="divide-y divide-white/5">
            {levelEntries.map(([name, count]) => (
              <li key={name} className="flex items-center gap-3 py-2.5">
                <span className="min-w-0 flex-1 truncate text-sm font-semibold text-slate-200">{name}</span>
                <div className="h-2 w-40 overflow-hidden rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full bg-violet-500"
                    style={{ width: `${stats.players.total ? Math.max(2, (count / stats.players.total) * 100) : 0}%` }}
                  />
                </div>
                <span className="w-10 text-right text-sm font-bold tabular-nums text-white">{count}</span>
              </li>
            ))}
            {levelEntries.length === 0 && <li className="py-3 text-sm text-slate-500">No players yet.</li>}
          </ol>
        </Panel>

        <Panel title="🕒 Recent play sessions">
          <ol className="divide-y divide-white/5">
            {stats.plays.recent.map((e, i) => (
              <li key={`${e.played_at}-${i}`} className="flex items-center gap-3 py-2">
                <span className="min-w-0 flex-1 truncate text-sm text-slate-300">{e.game_title ?? e.game_slug}</span>
                <span className="hidden max-w-24 truncate text-xs text-slate-500 sm:inline">{e.username ?? "guest"}</span>
                <span className="text-[11px] tabular-nums text-slate-500">{new Date(e.played_at).toLocaleString()}</span>
              </li>
            ))}
            {stats.plays.recent.length === 0 && <li className="py-3 text-sm text-slate-500">No play sessions yet.</li>}
          </ol>
        </Panel>
      </div>

      <div className="mt-6">
        <Panel title="💬 Comments">
          {commentError && (
            <p className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {commentError}
            </p>
          )}
          {comments === null ? (
            <p className="text-sm text-slate-500">Loading comments…</p>
          ) : comments.length === 0 ? (
            <p className="text-sm text-slate-500">No comments yet.</p>
          ) : (
            <ol className="divide-y divide-white/5">
              {comments.map((c) => (
                <li key={c.id} className="flex items-start gap-3 py-3">
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500/40 to-cyan-500/40 text-sm font-black text-white"
                    aria-hidden
                  >
                    {(c.name.trim()[0] || "?").toUpperCase()}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                      <span className="text-sm font-bold text-white">{c.name}</span>
                      <span className="truncate text-[11px] text-slate-500">
                        on <span className="text-violet-400">{c.game_slug}</span> · {new Date(c.created_at).toLocaleString()}
                      </span>
                    </div>
                    <p className="mt-1 whitespace-pre-wrap break-words text-sm leading-6 text-slate-300">{c.content}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeComment(c.id)}
                    disabled={deletingId === c.id}
                    className="shrink-0 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs font-semibold text-red-300 transition-colors hover:bg-red-500/20 disabled:opacity-50"
                  >
                    {deletingId === c.id ? "Deleting…" : "Delete"}
                  </button>
                </li>
              ))}
            </ol>
          )}
        </Panel>
      </div>
    </PageShell>
  );
}

function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-black text-white sm:text-3xl">📊 Site Statistics</h1>
      <p className="mt-1 text-sm text-slate-400">Admin only</p>
      <div className="mt-8">{children}</div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/5 bg-slate-900/50 p-5">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-black tabular-nums text-white">{value}</p>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/5 bg-slate-900/50 p-6">
      <h2 className="mb-4 text-sm font-bold text-white">{title}</h2>
      {children}
    </div>
  );
}
