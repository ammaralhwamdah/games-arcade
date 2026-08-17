import type { Metadata } from "next";
import AuthPanel from "@/components/AuthPanel";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Register — Create Your Free Account",
  description: `Create a free account on ${SITE_NAME} to earn points and stars and see your name on the global leaderboard.`,
  alternates: { canonical: "/register" },
};

export default async function RegisterPage({ searchParams }: { searchParams: Promise<{ confirmed?: string }> }) {
  const params = await searchParams;
  const confirmed = params.confirmed === "1";

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <div className="mx-auto max-w-md text-center">
        <div className="text-5xl" aria-hidden>⭐</div>
        <h1 className="mt-4 text-3xl font-black text-white sm:text-4xl">Create Your Account</h1>
        <p className="mt-2 text-sm text-slate-400">
          Earn points and stars, and see your name on the global leaderboard.
        </p>
        {confirmed && (
          <div className="mt-4 rounded-xl border border-green-500/25 bg-green-500/10 px-4 py-3 text-xs text-green-300">
            ✅ Email confirmed — your account is ready! You are signed in.
          </div>
        )}
      </div>
      <div className="mx-auto mt-8 max-w-md">
        <AuthPanel initialMode="signup" />
      </div>
    </div>
  );
}
