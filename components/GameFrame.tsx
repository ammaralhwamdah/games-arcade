"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePoints } from "./PointsProvider";
import { useAuth } from "./AuthProvider";
import { getSupabase } from "@/lib/supabase";
import { isAdminUsername } from "@/lib/admin-client";

function toProxySrc(src: string): string {
  return src;
}

export default function GameFrame({ src, title, slug }: { src: string; title: string; slug?: string }) {
  const [reloadKey, setReloadKey] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const { addPlaySeconds } = usePoints();
  const { session } = useAuth();
  const lastLog = useRef(0);
  const isAdmin = isAdminUsername(session?.user?.user_metadata?.username ?? session?.user?.email ?? null);
  const canEarn = !!session && !isAdmin;

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    let visible = document.visibilityState === "visible";

    const tick = () => {
      if (canEarn) addPlaySeconds(30);
    };

    const sync = () => {
      const nowVisible = document.visibilityState === "visible" && !document.hidden;
      if (nowVisible && !interval) {
        interval = setInterval(tick, 30000);
      } else if (!nowVisible && interval) {
        clearInterval(interval);
        interval = null;
      }
      visible = nowVisible;
    };

    sync();
    document.addEventListener("visibilitychange", sync);
    window.addEventListener("focus", sync);
    window.addEventListener("blur", sync);
    return () => {
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("focus", sync);
      window.removeEventListener("blur", sync);
      if (interval) clearInterval(interval);
    };
  }, [addPlaySeconds, canEarn]);

  const logPlay = useCallback(() => {
    if (!canEarn) return;
    const supabase = getSupabase();
    if (!supabase || !slug) return;
    const now = Date.now();
    if (now - lastLog.current < 300000) return;
    lastLog.current = now;
    supabase
      .from("play_events")
      .insert({
        user_id: session?.user?.id ?? null,
        username: session?.user?.user_metadata?.username ?? null,
        game_slug: slug,
        game_title: title,
      })
      .then(() => {}, () => {});
  }, [session, slug, title, canEarn]);

  useEffect(() => {
    logPlay();
    let played = 0;
    let visible = document.visibilityState === "visible";
    const sync = () => {
      visible = document.visibilityState === "visible" && !document.hidden;
      if (!visible) played = 0;
    };
    const iv = setInterval(() => {
      if (!visible) return;
      played += 1;
      if (played >= 10) {
        played = 0;
        logPlay();
      }
    }, 30000);
    document.addEventListener("visibilitychange", sync);
    window.addEventListener("focus", sync);
    window.addEventListener("blur", sync);
    return () => {
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("focus", sync);
      window.removeEventListener("blur", sync);
      clearInterval(iv);
    };
  }, [logPlay]);

  const goFullscreen = async () => {
    const el = wrapRef.current;
    if (!el) return;
    try {
      if (!document.fullscreenElement) {
        if (el.requestFullscreen) await el.requestFullscreen();
      } else if (document.exitFullscreen) {
        await document.exitFullscreen();
      }
    } catch {
      /* not supported */
    }
    const iframe = el.querySelector("iframe");
    if (iframe) { iframe.focus(); }
  };

  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el || typeof window === "undefined") return;
    let raf = 0;
    let lastTop = -1;
    let lastH = -1;
    let stable = 0;
    let start = performance.now();
    const fit = () => {
      const top = el.getBoundingClientRect().top;
      const h = Math.max(140, Math.floor(window.innerHeight - top - 8));
      el.style.height = h + "px";
      return { top, h };
    };
    const loop = () => {
      const { top, h } = fit();
      if (top === lastTop && h === lastH) stable += 1;
      else stable = 0;
      lastTop = top;
      lastH = h;
      if (stable < 5 && performance.now() - start < 6000) {
        raf = requestAnimationFrame(loop);
      }
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener("resize", fit);
    window.addEventListener("orientationchange", fit);
    window.addEventListener("load", fit);
    const onFullscreen = () => {
      const iframe = el.querySelector("iframe");
      if (iframe) iframe.focus();
    };
    document.addEventListener("fullscreenchange", onFullscreen);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", fit);
      window.removeEventListener("orientationchange", fit);
      window.removeEventListener("load", fit);
      document.removeEventListener("fullscreenchange", onFullscreen);
    };
  }, []);

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl shadow-black/50">
      <div className="flex items-center justify-between gap-2 border-b border-white/5 bg-slate-900 px-3 py-2 [@media(max-height:380px)]:hidden">
        <span className="flex items-center gap-2 text-xs text-slate-400">
          <span className="flex gap-1.5" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
          </span>
          <span className="hidden truncate sm:inline">Playing: {title}</span>
        </span>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setReloadKey((k) => k + 1)}
            className="rounded-md px-2.5 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:bg-white/10"
            title="Restart game"
          >
            ↻ Restart
          </button>
          <button
            type="button"
            onClick={goFullscreen}
            className="rounded-md bg-violet-500 px-3 py-1.5 text-xs font-semibold text-[#fff] transition-colors hover:bg-violet-400"
          >
            ⛶ Fullscreen
          </button>
        </div>
      </div>
      <div ref={wrapRef} className="game-frame-fullscreen relative aspect-[16/10] w-full bg-black">
        <iframe
          key={reloadKey}
          src={toProxySrc(src)}
          title={title}
          loading="eager"
          allowFullScreen
          allow="autoplay; fullscreen; pointer-lock"
          sandbox="allow-scripts allow-same-origin allow-forms allow-modals allow-pointer-lock allow-popups"
          className="absolute inset-0 block h-full w-full border-0"
        />
      </div>
    </div>
  );
}
