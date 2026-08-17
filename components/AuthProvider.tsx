"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { getSupabase, SUPABASE_CONFIGURED } from "@/lib/supabase";
import { usePoints } from "./PointsProvider";
import { getLevel } from "@/lib/points";
import { isAdminUsername } from "@/lib/admin-client";

interface AuthResult {
  error?: string;
}

interface AuthContextValue {
  configured: boolean;
  loading: boolean;
  session: Session | null;
  user: User | null;
  username: string | null;
  signUp: (email: string, password: string, username: string) => Promise<AuthResult>;
  signIn: (email: string, password: string) => Promise<AuthResult>;
  signOut: () => Promise<void>;
  syncing: boolean;
  syncNow: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function displayName(user: User | null): string | null {
  if (!user) return null;
  const meta = user.user_metadata as Record<string, unknown> | undefined;
  if (typeof meta?.username === "string" && meta.username.trim()) return meta.username.trim();
  if (typeof meta?.name === "string" && meta.name.trim()) return meta.name.trim();
  const email = user.email ?? "";
  return email ? email.split("@")[0] : null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const { points, addPoints } = usePoints();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const syncTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pointsRef = useRef(points);
  pointsRef.current = points;

  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) {
      setLoading(false);
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setLoading(false);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const syncNow = useCallback(async () => {
    const supabase = getSupabase();
    if (!supabase || !session?.user) return;
    const username = displayName(session.user) ?? "player";
    if (isAdminUsername(username) || isAdminUsername(session.user.email)) return;
    setSyncing(true);
    try {
      const username = displayName(session.user) ?? "player";
      const { stars, name } = getLevel(pointsRef.current);
      const { error } = await supabase.from("player_profiles").upsert(
        {
          user_id: session.user.id,
          username,
          points: pointsRef.current,
          stars,
          level_name: name,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" }
      );
      if (error) console.error("supabase sync error:", error.message);
    } finally {
      setSyncing(false);
    }
  }, [session]);

  useEffect(() => {
    if (!session?.user) return;
    if (syncTimer.current) clearTimeout(syncTimer.current);
    syncTimer.current = setTimeout(() => {
      syncNow();
    }, 5000);
    return () => {
      if (syncTimer.current) clearTimeout(syncTimer.current);
    };
  }, [points, session, syncNow]);

  const signUp = useCallback(
    async (email: string, password: string, username: string): Promise<AuthResult> => {
      const supabase = getSupabase();
      if (!supabase) return { error: "Supabase is not configured." };
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { username },
          emailRedirectTo: `${window.location.origin}/register?confirmed=1`,
        },
      });
      if (error) return { error: error.message };
      if (data.session) {
        setSession(data.session);
      }
      return {};
    },
    []
  );

  const signIn = useCallback(async (email: string, password: string): Promise<AuthResult> => {
    const supabase = getSupabase();
    if (!supabase) return { error: "Supabase is not configured." };
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: error.message };
    if (data.session) {
      const { data: profile } = await supabase
        .from("player_profiles")
        .select("points")
        .eq("user_id", data.session.user.id)
        .maybeSingle();
      const cloudPoints = typeof profile?.points === "number" ? profile.points : 0;
      const localPoints = pointsRef.current;
      if (!isAdminUsername(displayName(data.session.user)) && !isAdminUsername(data.session.user.email)) {
        if (cloudPoints > localPoints) {
          addPoints(cloudPoints - localPoints);
        }
      }
      setSession(data.session);
      setTimeout(() => syncNow(), 300);
    }
    return {};
  }, [addPoints, syncNow]);

  const signOut = useCallback(async () => {
    const supabase = getSupabase();
    if (!supabase) return;
    await supabase.auth.signOut();
    setSession(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      configured: SUPABASE_CONFIGURED,
      loading,
      session,
      user: session?.user ?? null,
      username: displayName(session?.user ?? null),
      signUp,
      signIn,
      signOut,
      syncing,
      syncNow,
    }),
    [loading, session, signUp, signIn, signOut, syncing, syncNow]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
