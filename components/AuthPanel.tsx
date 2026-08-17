"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useAuth } from "./AuthProvider";

export default function AuthPanel({ initialMode = "signup" }: { initialMode?: "signin" | "signup" }) {
  const { configured, loading, session, user, username, signUp, signIn, signOut, syncing } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  if (!configured) {
    return (
      <div className="rounded-2xl border border-white/5 bg-slate-900/50 p-6 text-sm text-slate-400">
        <p className="font-semibold text-slate-200">🔐 Accounts coming soon</p>
        <p className="mt-2 text-xs leading-6">
          Sign-in and the global leaderboard will be enabled once the site owner connects a Supabase project.
        </p>
      </div>
    );
  }

  if (loading) {
    return <div className="rounded-2xl border border-white/5 bg-slate-900/50 p-6 text-sm text-slate-400">Loading…</div>;
  }

  if (session && user) {
    return (
      <div className="rounded-2xl border border-white/5 bg-slate-900/50 p-6">
        <p className="text-sm font-semibold text-white">👋 Welcome, {username ?? "player"}!</p>
        <p className="mt-1 text-xs text-slate-400">{user.email}</p>
        <p className="mt-3 text-xs text-slate-500">
          Your points sync to your account{ syncing ? " (syncing…)" : ""} and count on the global leaderboard.
        </p>
        <button
          type="button"
          onClick={() => signOut()}
          className="mt-4 rounded-xl bg-white/5 px-4 py-2 text-xs font-semibold text-slate-300 transition-colors hover:bg-white/10"
        >
          Sign out
        </button>
      </div>
    );
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setNotice(null);
    if (mode === "signup" && name.trim().length < 2) {
      setError("Please enter a display name (at least 2 characters).");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setBusy(true);
    try {
      if (mode === "signup") {
        const res = await signUp(email, password, name.trim());
        if (res.error) setError(res.error);
        else setNotice("Account created! You are signed in. Check your email to confirm if prompted.");
      } else {
        const res = await signIn(email, password);
        if (res.error) setError(res.error);
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="rounded-2xl border border-white/5 bg-slate-900/50 p-6">
      <div className="mb-4 flex items-center gap-1 rounded-xl bg-white/5 p-1">
        {(["signup", "signin"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => {
              setMode(m);
              setError(null);
            }}
            className={`flex-1 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
              mode === m ? "bg-violet-500 text-[#fff]" : "text-slate-400 hover:text-white"
            }`}
          >
            {m === "signup" ? "Create account" : "Sign in"}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        {mode === "signup" && (
          <div>
            <label htmlFor="auth-name" className="mb-1 block text-xs font-medium text-slate-400">
              Display name
            </label>
            <input
              id="auth-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-violet-400"
              placeholder="Your leaderboard name"
              required
            />
          </div>
        )}
        <div>
          <label htmlFor="auth-email" className="mb-1 block text-xs font-medium text-slate-400">
            Email
          </label>
          <input
            id="auth-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-violet-400"
            placeholder="you@example.com"
            required
          />
        </div>
        <div>
          <label htmlFor="auth-password" className="mb-1 block text-xs font-medium text-slate-400">
            Password
          </label>
          <input
            id="auth-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-violet-400"
            placeholder="At least 6 characters"
            required
          />
        </div>

        {error && <p className="text-xs font-medium text-red-400">{error}</p>}
        {notice && <p className="text-xs font-medium text-green-400">{notice}</p>}

        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-xl bg-violet-500 px-4 py-2.5 text-sm font-semibold text-[#fff] transition-colors hover:bg-violet-400 disabled:opacity-50"
        >
          {busy ? "Please wait…" : mode === "signup" ? "Create account" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
