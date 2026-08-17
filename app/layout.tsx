import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { PointsProvider } from "@/components/PointsProvider";
import { AuthProvider } from "@/components/AuthProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SITE_NAME, SITE_TAGLINE, SITE_DESCRIPTION, SITE_URL, ADSENSE_CLIENT, GA_ID, GTM_ID } from "@/lib/site";

const geistSans = localFont({
  variable: "--font-geist-sans",
  src: "./fonts/GeistVariable.woff2",
  display: "swap",
});

const geistMono = localFont({
  variable: "--font-geist-mono",
  src: "./fonts/GeistMonoVariable.woff2",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "free online games",
    "play games online",
    "HTML5 games",
    "browser games",
    "arcade games",
    "puzzle games",
    "racing games",
    "sports games",
    "strategy games",
    "no download games",
  ],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Free Online Games`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a1a",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/games?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        {GTM_ID ? (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`,
            }}
          />
        ) : null}
        <script dangerouslySetInnerHTML={{ __html: "window.maeExportApis_=window.maeExportApis_||function(){};" }} />
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var t=localStorage.getItem('gameverse-theme');if(!t){t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}if(t==='light'){document.documentElement.setAttribute('data-theme','light')}}catch(e){}",
          }}
        />
        {ADSENSE_CLIENT ? (
          <>
            <link rel="preconnect" href="https://pagead2.googlesyndication.com" crossOrigin="anonymous" />
            <script
              async
              src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${ADSENSE_CLIENT}`}
              crossOrigin="anonymous"
            />
          </>
        ) : null}
        {GA_ID ? (
          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag("js",new Date());gtag("config","${GA_ID}");function gvLoadGA(){var s=document.createElement("script");s.async=true;s.src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}";document.head.appendChild(s)}if("requestIdleCallback"in window){requestIdleCallback(gvLoadGA,{timeout:4000})}else{window.addEventListener("load",gvLoadGA)}`,
            }}
          />
        ) : null}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){var b=function(e){if(e)e.preventDefault();return false;};document.addEventListener('contextmenu',b);document.addEventListener('dragstart',function(e){var t=e.target;if(t&&t.tagName==='IMG')e.preventDefault();});document.addEventListener('keydown',function(e){var k=e.key||'';if(k==='F12'){e.preventDefault();return;}if((e.ctrlKey||e.metaKey)&&e.shiftKey&&'IJKCijck'.indexOf(k)!==-1){e.preventDefault();return;}if((e.ctrlKey||e.metaKey)&&!e.shiftKey&&(k==='u'||k==='U')){e.preventDefault();return;}},true);})();",
          }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-slate-950 font-sans text-slate-100">
        {GTM_ID ? (
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
            }}
          />
        ) : null}
        <ThemeProvider>
          <PointsProvider>
            <AuthProvider>
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </AuthProvider>
          </PointsProvider>
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
