"use client";

import Link from "next/link";
import { useAuth } from "./AuthProvider";

export default function RegisterPrompt() {
  const { session, loading } = useAuth();
  if (loading || session) return null;

  return (
    <div className="mt-4 flex items-start gap-3 rounded-xl border border-violet-500/25 bg-violet-500/5 px-4 py-3">
      <span className="mt-0.5 text-sm" aria-hidden>⭐</span>
      <p className="text-xs leading-6 text-slate-400 sm:text-[13px]">
        Want to earn <span className="font-semibold text-amber-300">points</span> and{" "}
        <span className="font-semibold text-amber-300">stars</span> and have your name appear in the{" "}
        <span className="font-semibold text-violet-300">players list</span>?{" "}
        <Link href="/register" className="font-semibold text-violet-300 underline underline-offset-2 hover:text-violet-200">
          Register on the site
        </Link>{" "}
        — it&apos;s free and quick.
      </p>
    </div>
  );
}
