"use client";

import { useState } from "react";
import Link from "next/link";
import { usePoints } from "./PointsProvider";
import { getLevel, formatPoints, STAR_LEVELS, DAILY_BONUS_POINTS } from "@/lib/points";
import { useAuth } from "./AuthProvider";
import { isAdminUsername } from "@/lib/admin-client";
import AuthPanel from "./AuthPanel";
import Leaderboard from "./Leaderboard";

export default function RewardsView() {
  const { points, totalSeconds, gamesPlayed, dailyBonusAvailable, claimDailyBonus } = usePoints();
  const { session, loading } = useAuth();
  const [claimed, setClaimed] = useState(false);
  const isAdmin =
    (!!session && isAdminUsername(session.user.user_metadata?.username ?? null)) || isAdminUsername(session?.user?.email ?? null);
  const level = getLevel(points);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  const handleClaim = () => {
    if (!session || isAdmin) return;
    const gained = claimDailyBonus();
    if (gained > 0) {
      setClaimed(true);
      setTimeout(() => setClaimed(false), 3000);
    }
  };

  const next = STAR_LEVELS.find((l) => l.min > points);
  const nextPoints = next ? next.min - points : 0;
  const stars = Array.from({ length: level.stars }, (_, i) => i);

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
        <p className="text-sm text-slate-400">Loading…</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
        <div className="rounded-2xl border border-white/5 bg-slate-900/50 p-8 text-center sm:p-12">
          <div className="text-6xl" aria-hidden>🏆</div>
          <h1 className="mt-4 text-3xl font-black text-white sm:text-4xl">Points &amp; Stars</h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-400">
            Earn points and stars and have your name appear in the players list — all you have to do is
            create a free account.
          </p>
          <div className="mt-6 flex justify-center">
            <AuthPanel />
          </div>
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/5 bg-slate-900/50 p-6">
            <h2 className="mb-4 text-sm font-bold text-white">🏆 Global Leaderboard</h2>
            <Leaderboard />
          </div>
          <div className="rounded-2xl border border-white/5 bg-slate-900/50 p-6">
            <h2 className="mb-4 text-sm font-bold text-white">⭐ Star Ranks</h2>
            <div className="mt-2 space-y-3">
              {STAR_LEVELS.slice(0, 6).map((l) => (
                <div key={l.stars} className="flex items-center justify-between rounded-xl px-4 py-2 text-sm">
                  <span className="flex items-center gap-2">
                    <span aria-hidden>⭐</span>
                    <span className="font-bold text-white">{l.name}</span>
                    <span className="text-xs text-slate-400">({l.stars} {l.stars === 1 ? "star" : "stars"})</span>
                  </span>
                  <span className="text-xs text-slate-400">{formatPoints(l.min)} pts</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isAdmin) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
        <div className="rounded-2xl border border-white/5 bg-slate-900/50 p-8 text-center sm:p-12">
          <div className="text-6xl" aria-hidden>🔒</div>
          <h1 className="mt-4 text-3xl font-black text-white sm:text-4xl">Admin Account</h1>
          <p className="mt-2 text-sm text-slate-400">Admin accounts do not earn points or stars.</p>
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/5 bg-slate-900/50 p-6">
            <h2 className="mb-4 text-sm font-bold text-white">🏆 Global Leaderboard</h2>
            <Leaderboard />
          </div>
          <div className="rounded-2xl border border-white/5 bg-slate-900/50 p-6">
            <h2 className="mb-4 text-sm font-bold text-white">🔐 Your Account</h2>
            <AuthPanel />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <div className="mb-10 text-center">
        <div className="text-5xl" aria-hidden>
          <span className="flex items-center justify-center gap-1 text-amber-400">
            {stars.map((s) => (
              <span key={s} aria-hidden>⭐</span>
            ))}
          </span>
        </div>
        <h1 className="mt-4 text-3xl font-black text-white sm:text-4xl">
          {level.name} · {level.stars} {level.stars === 1 ? "Star" : "Stars"}
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          <span className="font-bold text-amber-300">{formatPoints(points)} points</span>
          {next && (
            <span> · {formatPoints(nextPoints)} more to reach {next.name} ({next.stars} ⭐)</span>
          )}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-white/5 bg-slate-900/50 p-6">
          <h2 className="text-sm font-bold text-white">🕐 Time Played</h2>
          <p className="mt-2 text-2xl font-black text-white">
            {hours > 0 ? `${hours}h ` : ""}
            {minutes}m
          </p>
          <p className="mt-1 text-xs text-slate-500">Earn 1 point per hour of active play.</p>
        </div>

        <div className="rounded-2xl border border-white/5 bg-slate-900/50 p-6">
          <h2 className="text-sm font-bold text-white">🎮 Games Played</h2>
          <p className="mt-2 text-2xl font-black text-white">{gamesPlayed.length}</p>
          <p className="mt-1 text-xs text-slate-500">Unique games you&apos;ve tried.</p>
        </div>

        <div className="rounded-2xl border border-white/5 bg-slate-900/50 p-6">
          <h2 className="text-sm font-bold text-white">📅 Daily Bonus</h2>
          <button
            type="button"
            onClick={handleClaim}
            disabled={!dailyBonusAvailable}
            className={`mt-3 w-full rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
              claimed
                ? "bg-green-500 text-[#fff]"
                : dailyBonusAvailable
                  ? "bg-amber-400 text-[#0f172a] hover:bg-amber-300"
                  : "cursor-not-allowed bg-white/5 text-slate-500"
            }`}
          >
            {claimed ? "Bonus claimed! +1" : dailyBonusAvailable ? `Claim +${DAILY_BONUS_POINTS} points` : "Come back tomorrow"}
          </button>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-white/5 bg-slate-900/50 p-6">
        <h2 className="text-sm font-bold text-white">⭐ Star Ranks</h2>
        <div className="mt-4 space-y-3">
          {STAR_LEVELS.map((l) => {
            const unlocked = points >= l.min;
            return (
              <div
                key={l.stars}
                className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm ${
                  unlocked ? "bg-amber-400/10 ring-1 ring-amber-400/30" : "bg-white/[0.03] opacity-60"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span aria-hidden>⭐</span>
                  <span className="font-bold text-white">{l.name}</span>
                  <span className="text-xs text-slate-400">({l.stars} {l.stars === 1 ? "star" : "stars"})</span>
                </span>
                <span className="text-xs text-slate-400">{formatPoints(l.min)} pts</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/5 bg-slate-900/50 p-6">
          <h2 className="mb-4 text-sm font-bold text-white">🔐 Your Account</h2>
          <AuthPanel />
        </div>
        <div className="rounded-2xl border border-white/5 bg-slate-900/50 p-6">
          <h2 className="mb-4 text-sm font-bold text-white">🏆 Global Leaderboard</h2>
          <Leaderboard />
        </div>
      </div>

      <div className="mt-6 text-center">
        <Link
          href="/games"
          className="inline-flex items-center gap-2 rounded-xl bg-violet-500 px-6 py-3 text-sm font-semibold text-[#fff] transition-colors hover:bg-violet-400"
        >
          🎮 Play games to earn points
        </Link>
      </div>
    </div>
  );
}
