import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  poweredByHeader: false,
  reactStrictMode: true,
  async redirects() {
    const map: Record<string, string> = {
      platformer: "arcade",
      shooter: "shooting",
      fighting: "action",
      rpg: "adventure",
      simulation: "hypercasual",
      mario: "arcade",
      sonic: "action",
      pokemon: "adventure",
      minecraft: "adventure",
      zelda: "adventure",
    };
    const gameMap: Record<string, string> = {
      "forest-dash": "emberwood-dash",
      "the-last-adventure": "veyras-legacy",
      "subway-runner": "underground-sprint",
      snake: "nano-serpent",
      "andromeda-invaders": "aphelion-assault",
      "neon-vanguard": "nova-corsair",
      "day-and-night-duel": "clash-of-orbs",
      "epoch-defense": "nebula-bastion",
      "2048": "2048-fusion",
    };
    const playRedirects = Object.entries(gameMap).map(([from, to]) => ({
      source: `/play/${from}`,
      destination: `/play/${to}`,
      permanent: true,
    }));
    const fileRedirects = Object.entries(gameMap).map(([from, to]) => ({
      source: `/games/${from}/:path*`,
      destination: `/games/${to}/:path*`,
      permanent: true,
    }));
    return [
      ...Object.entries(map).map(([from, to]) => ({
        source: `/category/${from}`,
        destination: `/category/${to}`,
        permanent: true,
      })),
      ...playRedirects,
      ...fileRedirects,
    ];
  },
  async headers() {
    return [
      {
        source: "/data/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
          { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
        ],
      },
      {
        source: "/play/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-cache, must-revalidate",
          },
          { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
        ],
      },
      {
        source: "/games/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=0, must-revalidate" },
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
          { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), payment=(), usb=(), battery=(), magnetometer=(), gyroscope=(), accelerometer=(), browsing-topics=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
