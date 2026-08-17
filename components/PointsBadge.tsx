"use client";

import Link from "next/link";
import { usePoints } from "./PointsProvider";
import { useAuth } from "./AuthProvider";
import { isAdminUsername } from "@/lib/admin-client";
import { getLevel, formatPoints } from "@/lib/points";

export default function PointsBadge() {
  const { points } = usePoints();
  const { session, loading } = useAuth();
  const isAdmin =
    (!!session && isAdminUsername(session.user.user_metadata?.username ?? null)) || isAdminUsername(session?.user?.email ?? null);
  const level = getLevel(points);

  if (loading) return null;

  if (!session) {
    return (
      <Link
        href="/register"
        className="flex shrink-0 items-center gap-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1.5 text-xs font-semibold text-violet-300 transition-colors hover:bg-violet-500/20"
        title="Register to earn points and stars"
      >
        <span aria-hidden>🏆</span>
        <span className="hidden sm:inline">Join &amp; Earn</span>
      </Link>
    );
  }

  if (isAdmin) {
    return (
      <Link
        href="/admin"
        className="flex shrink-0 items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-300 transition-colors hover:bg-white/10"
        title="Admin dashboard"
      >
        <span aria-hidden>🔒</span>
        <span className="hidden sm:inline">Admin</span>
      </Link>
    );
  }

  return (
    <Link
      href="/rewards"
      className="flex shrink-0 items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-1.5 text-xs font-semibold text-amber-300 transition-colors hover:bg-amber-400/20"
      title={`${level.name} — ${level.stars} ${level.stars === 1 ? "star" : "stars"} · ${formatPoints(points)} points`}
      aria-label={`Rewards: ${formatPoints(points)} points, level ${level.name}`}
    >
      <span aria-hidden>⭐</span>
      <span className="hidden sm:inline">{level.name}</span>
      <span className="tabular-nums">{formatPoints(points)}</span>
    </Link>
  );
}
