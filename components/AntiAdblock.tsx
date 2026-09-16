"use client";

import { useEffect, useRef, useState } from "react";

const SESSION_KEY = "pk-adblock-dismissed";

function detectAdblock(): Promise<boolean> {
  return new Promise((resolve) => {
    let settled = false;
    const finish = (blocked: boolean) => {
      if (!settled) {
        settled = true;
        resolve(blocked);
      }
    };

    // Fast path: if the adsbygoogle script loaded at all, no block.
    if (typeof (window as Record<string, unknown>).adsbygoogle !== "undefined") {
      finish(false);
      return;
    }

    // Network probe: force a fresh request to an ad-domain URL. Ad blockers
    // cancel these requests, so onerror fires. Without a blocker the script
    // loads and onload fires.
    const probe = document.createElement("script");
    probe.src =
      "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?_bait=" +
      Date.now();
    probe.onload = () => finish(false);
    probe.onerror = () => finish(true);
    document.head.appendChild(probe);

    // Safety timeout in case neither event fires (offline, etc.).
    setTimeout(() => finish(true), 3000);
  });
}

export default function AntiAdblock() {
  const [blocked, setBlocked] = useState(false);
  const dismissed = useRef(false);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;

    detectAdblock().then((isBlocked) => {
      if (isBlocked && !dismissed.current) setBlocked(true);
    });
  }, []);

  const dismiss = () => {
    setBlocked(false);
    dismissed.current = true;
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* ignored */
    }
  };

  if (!blocked) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="adblock-title"
    >
      <div className="mx-4 w-full max-w-md rounded-2xl border border-white/10 bg-slate-900 p-6 shadow-2xl sm:p-8">
        <div className="flex flex-col items-center text-center">
          <span className="mb-4 text-4xl" aria-hidden>
            🛡️
          </span>
          <h2
            id="adblock-title"
            className="text-lg font-bold text-white sm:text-xl"
          >
            Ad blocker detected
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            PlayKrux is completely free and funded by ads. Please disable your
            ad blocker for this site so we can keep the games free for everyone.
          </p>
          <div className="mt-6 flex w-full flex-col gap-3">
            <button
              type="button"
              onClick={dismiss}
              className="rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-violet-500/25 transition-transform hover:scale-105"
            >
              I&apos;ve disabled it
            </button>
            <button
              type="button"
              onClick={dismiss}
              className="rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-slate-400 transition-colors hover:bg-white/10"
            >
              Continue anyway
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}