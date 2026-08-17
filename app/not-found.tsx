import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-28 text-center">
      <span className="text-7xl" aria-hidden>👾</span>
      <h1 className="mt-6 text-4xl font-black text-white">404 — Game Not Found</h1>
      <p className="mt-3 max-w-md text-sm leading-7 text-slate-400 sm:text-base">
        Oops! The page or game you&apos;re looking for doesn&apos;t exist or may have been moved.
        Let&apos;s get you back into the fun.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 px-6 py-3 text-sm font-bold text-[#fff] shadow-lg shadow-violet-500/25 transition-transform hover:scale-[1.02]"
        >
          Back to Home
        </Link>
        <Link
          href="/games"
          className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10"
        >
          Browse All Games
        </Link>
      </div>
    </div>
  );
}
