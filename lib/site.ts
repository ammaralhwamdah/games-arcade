export const SITE_NAME = "GameVerse";
export const SITE_TAGLINE = "Free Online Games — Play Instantly";
export const SITE_DESCRIPTION =
  "Play free online games instantly in your browser. No downloads, no sign-ups. Action, puzzle, racing, sports, arcade and more — updated daily.";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://gameverse.example.com";

export const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "";

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "";

export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "ammar.alhwamdah@gmail.com";

/** Site editor / responsible person shown on pages (E-E-A-T signal). */
export const SITE_EDITOR = process.env.NEXT_PUBLIC_SITE_EDITOR || "Ammar Yaser";

/** Year GameVerse was founded. */
export const SITE_FOUNDED_YEAR = 2026;

export const CATEGORY_PAGE_SIZE = 60;
export const GAMES_PAGE_SIZE = 60;

/** Number of /play pages pre-rendered at build time; the rest render on demand. */
export const STATIC_GAME_PAGES = 1500;

export interface SocialLink {
  name: "facebook" | "instagram" | "x" | "youtube" | "tiktok" | "telegram";
  label: string;
  href: string;
}

/** Social media profiles. Placeholder links — update when real accounts are ready. */
export const SOCIAL_LINKS: SocialLink[] = [
  { name: "facebook", label: "GameVerse on Facebook", href: "https://facebook.com/gameverse.pro" },
  { name: "instagram", label: "GameVerse on Instagram", href: "https://instagram.com/gameverse.pro" },
  { name: "x", label: "GameVerse on X (Twitter)", href: "https://x.com/gameverse_pro" },
  { name: "youtube", label: "GameVerse on YouTube", href: "https://www.youtube.com/@gameversepro11" },
  { name: "tiktok", label: "GameVerse on TikTok", href: "https://tiktok.com/@gameverse" },
  { name: "telegram", label: "GameVerse on Telegram", href: "https://t.me/gameverse" },
];
