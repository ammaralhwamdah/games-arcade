"use client";

import { useEffect, useRef } from "react";
import { ADSENSE_CLIENT } from "@/lib/site";

type AdFormat = "auto" | "rectangle" | "horizontal" | "vertical";

interface AdSlotProps {
  slot?: string;
  format?: AdFormat;
  className?: string;
  label?: string;
}

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

/**
 * Google AdSense ad slot.
 *
 * Ads only render when NEXT_PUBLIC_ADSENSE_CLIENT is set.
 * Until then a subtle placeholder keeps layout stable so the site can be
 * reviewed by AdSense before monetization is turned on.
 */
export default function AdSlot({
  slot = "0",
  format = "auto",
  className = "",
  label = "Advertisement",
}: AdSlotProps) {
  const enabled = Boolean(ADSENSE_CLIENT);
  const insRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    if (!enabled) return;
    const attempt = () => {
      try {
        if (window.adsbygoogle) {
          window.adsbygoogle.push({});
        }
      } catch {
        /* ad blocker or not ready */
      }
    };
    const t = setTimeout(attempt, 200);
    return () => clearTimeout(t);
  }, [enabled, slot]);

  if (!enabled) {
    return (
      <div
        className={`flex min-h-24 items-center justify-center rounded-xl border border-dashed border-white/10 bg-white/[0.02] text-xs tracking-wide text-slate-500 ${className}`}
        role="presentation"
      >
        {label}
      </div>
    );
  }

  const heightClass =
    format === "rectangle" ? "min-h-[250px]" : format === "horizontal" ? "min-h-[90px]" : "min-h-[120px]";

  return (
    <div className={`flex w-full flex-col items-center justify-center ${heightClass} ${className}`}>
      <span className="mb-1 text-[10px] uppercase tracking-widest text-slate-500">{label}</span>
      <ins
        ref={insRef}
        className="adsbygoogle block"
        style={{ display: "block" }}
        data-ad-client={`ca-pub-${ADSENSE_CLIENT}`}
        data-ad-slot={slot}
        data-ad-format={format === "auto" ? "auto" : "rectangle"}
        data-full-width-responsive="true"
      />
    </div>
  );
}
