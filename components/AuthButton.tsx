"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "./AuthProvider";
import { usePoints } from "./PointsProvider";
import { isAdminUsername } from "@/lib/admin-client";

export default function AuthButton() {
  const { configured, session, username } = useAuth();
  const { points } = usePoints();
  const pathname = usePathname();
  const isAdmin =
    (!!session && isAdminUsername(session.user.user_metadata?.username ?? null)) || isAdminUsername(session?.user?.email ?? null);

  if (!configured) {
    return (
      <Link
        href="/rewards"
        className={`hidden items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-sm font-semibold transition-colors hover:bg-white/5 md:flex ${
          pathname === "/rewards" ? "bg-white/5 text-white" : "text-slate-300"
        }`}
      >
        <span className="text-base">🏆</span>
        <span>Rewards</span>
      </Link>
    );
  }

  return (
    <Link
      href="/rewards"
      className={`hidden items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition-colors md:flex ${
        pathname === "/rewards" ? "bg-white/5 text-white" : "bg-violet-500/15 text-violet-300 hover:bg-violet-500/25"
      }`}
    >
      <span className="text-base">🏆</span>
      <span className="max-w-28 truncate">{session ? (username ?? "Account") : "Join"}</span>
      {session && !isAdmin && <span className="hidden rounded-md bg-white/10 px-1.5 py-0.5 text-[10px] font-bold tabular-nums text-white lg:inline">{points}</span>}
    </Link>
  );
}
