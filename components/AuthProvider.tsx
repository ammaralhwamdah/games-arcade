"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { getSupabase, SUPABASE_CONFIGURED } from "@/lib/supabase";
import { usePoints } from "./PointsProvider";
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

  const setCloudPoints = useCallback(
    (cloud: number) => {
      if (cloud > pointsRef.current) addPoints(cloud - pointsRef.current);
    },
    [addPoints]
  );

  const syncNow = useCallback(async () => {
    const supabase = getSupabase();
    if (!supabase || !session?.user) return;
    setSyncing(true);
    try {
      const res = await fetch("/api/sync-points", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ localPoints: pointsRef.current }),
      });
      if (!res.ok) {
        console.error("sync-points failed:", res.status);
        return;
      }
      const data = (await res.json()) as { points?: number; clamped?: boolean };
      if (data.clamped && typeof data.points === "number") {
        setCloudPoints(data.points);
      }
    } catch {
      /* offline sync is deferred to the next trigger */
    } finally {
      setSyncing(false);
    }
  }, [session, setCloudPoints]);

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
      if (!isAdminUsername(displayName(data.session.user)) && !isAdminUsername(data.session.user.email)) {
        setCloudPoints(cloudPoints);
      }
      setSession(data.session);
      setTimeout(() => syncNow(), 300);
    }
    return {};
  }, [setCloudPoints, syncNow]);

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
