"use client";

import { useState } from "react";
import type { Game, GameLite } from "@/lib/types";
import { formatNumber } from "@/lib/format";
import { getCategoryStyle } from "@/lib/categories";

export default function GameThumb({
  game,
  size = "md",
}: {
  game: Game | GameLite;
  size?: "sm" | "md" | "lg";
}) {
  const style = getCategoryStyle(game.category);
  const { color, emoji } = style;
  const [failed, setFailed] = useState(false);

  const heights = { sm: "h-24", md: "h-40", lg: "h-56" } as const;
  const emojiSize = size === "lg" ? "text-7xl" : size === "md" ? "text-5xl" : "text-3xl";
  const nameSize = size === "lg" ? "text-base" : size === "md" ? "text-sm" : "text-xs";

  const showImage = Boolean(game.image) && !failed;

  return (
    <div
      className={`relative ${heights[size]} w-full overflow-hidden bg-slate-900`}
      style={{
        background: `linear-gradient(135deg, ${color}59, ${color}26 55%, #0b1020 100%)`,
      }}
    >
      {showImage ? (
        <img
          src={game.image}
          alt={game.name}
          loading="lazy"
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        <>
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at 25% 20%, ${color}7a, transparent 55%)`,
            }}
          />
          <div
            className="absolute -right-10 -top-12 h-44 w-44 rounded-full opacity-25 blur-3xl"
            style={{ background: color }}
          />
          <div className="relative flex h-full w-full items-center justify-center">
            <span className={`${emojiSize} drop-shadow-[0_4px_14px_rgba(0,0,0,0.6)]`} aria-hidden>
              {emoji}
            </span>
          </div>
        </>
      )}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent px-2.5 pb-2 pt-8">
        <div className="flex items-center justify-between gap-1.5">
          <p className={`${nameSize} min-w-0 flex-1 truncate font-semibold text-[#fff] drop-shadow`}>{game.name}</p>
          <span className="flex shrink-0 items-center gap-1 rounded-md bg-black/45 px-1.5 py-0.5 text-[10px] font-semibold text-[#fff]">
            <span aria-hidden>▶</span> {formatNumber(game.plays)} plays
          </span>
        </div>
      </div>
    </div>
  );
}
