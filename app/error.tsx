"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-28 text-center">
      <span className="text-6xl" aria-hidden>😵</span>
      <h1 className="mt-6 text-3xl font-black text-white">Something went wrong</h1>
      <p className="mt-3 max-w-md text-sm leading-7 text-slate-400">
        We hit an unexpected error while loading this page. Try again — it&apos;s probably just a
        temporary hiccup.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-8 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 px-6 py-3 text-sm font-bold text-[#fff] shadow-lg shadow-violet-500/25 transition-transform hover:scale-[1.02]"
      >
        Try Again
      </button>
    </div>
  );
}
