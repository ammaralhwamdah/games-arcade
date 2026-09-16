"use client";

import { useEffect } from "react";

export default function AdUnit() {
  useEffect(() => {
    try {
      const w = window as unknown as {
        adsbygoogle?: Array<Record<string, unknown>>;
      };
      (w.adsbygoogle = w.adsbygoogle || []).push({});
    } catch {
      /* ignored */
    }
  }, []);

  return (
    <div className="flex justify-center py-4">
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-3801707354489723"
        data-ad-slot="5268361827"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}