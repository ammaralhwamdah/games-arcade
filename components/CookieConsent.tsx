"use client";

import { useState, useEffect } from "react";

const CONSENT_KEY = "gameverse-cookie-consent";

interface WindowWithDataLayer extends Window {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
}

function loadScripts() {
  if (typeof window === "undefined") return;

  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const win = window as WindowWithDataLayer;

  // GA4
  if (gaId && !win.gtag) {
    win.dataLayer = win.dataLayer || [];
    win.gtag = function () {
      win.dataLayer!.push(arguments);
    };
    win.gtag("js", new Date());
    win.gtag("config", gaId, { send_page_view: false });

    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(s);
  }

  // GTM
  if (gtmId && !document.querySelector(`script[src*="gtm.js?id=${gtmId}"]`)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = win as any;
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
    const f = document.querySelector("script");
    const j = document.createElement("script");
    j.async = true;
    j.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
    (f || document.head).parentNode!.insertBefore(j, f || null);
  }

  // AdSense
  if (adsenseClient && !document.querySelector(`script[src*="adsbygoogle"]`)) {
    const link = document.createElement("link");
    link.rel = "preconnect";
    link.href = "https://pagead2.googlesyndication.com";
    link.crossOrigin = "anonymous";
    document.head.appendChild(link);

    const s = document.createElement("script");
    s.async = true;
    s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${adsenseClient}`;
    s.crossOrigin = "anonymous";
    document.head.appendChild(s);
  }
}

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (consent === "accepted") {
      loadScripts();
    } else if (!consent) {
      setShow(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setShow(false);
    loadScripts();
  };

  const reject = () => {
    localStorage.setItem(CONSENT_KEY, "rejected");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex items-end justify-center p-4 sm:p-6">
      <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-slate-900/95 p-5 shadow-2xl backdrop-blur-xl sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex-1">
            <h3 className="text-base font-bold text-white">🍪 We value your privacy</h3>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              We use cookies and similar technologies to operate this site, measure performance,
              and serve personalized ads through Google AdSense. By clicking &quot;Accept All&quot;,
              you consent to the use of cookies for analytics and advertising. You can reject
              non-essential cookies or read more in our{" "}
              <a href="/cookies" className="text-violet-400 underline underline-offset-2 hover:text-violet-300">
                Cookie Policy
              </a>
              .
            </p>
          </div>
          <div className="flex shrink-0 gap-2 sm:flex-col">
            <button
              type="button"
              onClick={accept}
              className="rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-violet-500/25 transition-transform hover:scale-105"
            >
              Accept All
            </button>
            <button
              type="button"
              onClick={reject}
              className="rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-slate-300 transition-colors hover:bg-white/10"
            >
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
