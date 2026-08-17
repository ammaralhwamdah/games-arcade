"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { DAILY_BONUS_POINTS } from "@/lib/points";

const STORAGE_KEY = "gameverse-points-v1";

interface PointsState {
  points: number;
  totalSeconds: number;
  gamesPlayed: string[];
  lastDaily: string | null;
}

interface PointsContextValue {
  points: number;
  totalSeconds: number;
  gamesPlayed: string[];
  addPoints: (n: number) => void;
  addPlaySeconds: (seconds: number, gameSlug?: string) => void;
  claimDailyBonus: () => number;
  dailyBonusAvailable: boolean;
  reset: () => void;
}

const PointsContext = createContext<PointsContextValue | null>(null);

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function loadState(): PointsState {
  if (typeof window === "undefined") return { points: 0, totalSeconds: 0, gamesPlayed: [], lastDaily: null };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { points: 0, totalSeconds: 0, gamesPlayed: [], lastDaily: null };
    const parsed = JSON.parse(raw) as Partial<PointsState>;
    return {
      points: typeof parsed.points === "number" && parsed.points >= 0 ? parsed.points : 0,
      totalSeconds: typeof parsed.totalSeconds === "number" && parsed.totalSeconds >= 0 ? parsed.totalSeconds : 0,
      gamesPlayed: Array.isArray(parsed.gamesPlayed) ? parsed.gamesPlayed : [],
      lastDaily: typeof parsed.lastDaily === "string" ? parsed.lastDaily : null,
    };
  } catch {
    return { points: 0, totalSeconds: 0, gamesPlayed: [], lastDaily: null };
  }
}

export function PointsProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PointsState>(() =>
    typeof window === "undefined"
      ? { points: 0, totalSeconds: 0, gamesPlayed: [], lastDaily: null }
      : loadState()
  );

  useEffect(() => {
    setState(loadState());
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage unavailable */
    }
  }, [state]);

  const addPoints = useCallback((n: number) => {
    if (n <= 0) return;
    setState((s) => ({ ...s, points: s.points + Math.floor(n) }));
  }, []);

  const addPlaySeconds = useCallback((seconds: number, gameSlug?: string) => {
    if (seconds <= 0) return;
    const secs = Math.floor(seconds);
    setState((s) => ({
      ...s,
      totalSeconds: s.totalSeconds + secs,
      points: s.points + Math.floor(secs / 3600),
      gamesPlayed: gameSlug && !s.gamesPlayed.includes(gameSlug) ? [...s.gamesPlayed, gameSlug] : s.gamesPlayed,
    }));
  }, []);

  const claimDailyBonus = useCallback((): number => {
    const key = todayKey();
    if (state.lastDaily === key) return 0;
    setState((s) => ({
      ...s,
      points: s.points + DAILY_BONUS_POINTS,
      lastDaily: key,
    }));
    return DAILY_BONUS_POINTS;
  }, [state.lastDaily]);

  const reset = useCallback(() => {
    setState({ points: 0, totalSeconds: 0, gamesPlayed: [], lastDaily: null });
  }, []);

  const dailyBonusAvailable = state.lastDaily !== todayKey();

  const value = useMemo<PointsContextValue>(
    () => ({
      points: state.points,
      totalSeconds: state.totalSeconds,
      gamesPlayed: state.gamesPlayed,
      addPoints,
      addPlaySeconds,
      claimDailyBonus,
      dailyBonusAvailable,
      reset,
    }),
    [state.points, state.totalSeconds, state.gamesPlayed, state.lastDaily, addPoints, addPlaySeconds, claimDailyBonus, dailyBonusAvailable, reset]
  );

  return <PointsContext.Provider value={value}>{children}</PointsContext.Provider>;
}

export function usePoints(): PointsContextValue {
  const ctx = useContext(PointsContext);
  if (!ctx) throw new Error("usePoints must be used within PointsProvider");
  return ctx;
}
