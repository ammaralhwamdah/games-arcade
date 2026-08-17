import Link from "next/link";
import type { Game, GameLite } from "@/lib/types";
import { gameUrl } from "@/lib/format";
import GameThumb from "./GameThumb";

export default function GameCard({
  game,
  categoryMeta,
}: {
  game: Game | GameLite;
  categoryMeta?: { name: string; emoji: string };
}) {
  const cat = categoryMeta ?? { name: game.category, emoji: "🎮" };
  return (
    <Link
      href={gameUrl(game.slug)}
      className="group flex flex-col overflow-hidden rounded-xl border border-white/5 bg-slate-900/60 transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/40 hover:shadow-xl hover:shadow-violet-500/10"
    >
      <div className="relative overflow-hidden">
        <GameThumb game={game} size="sm" />
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="rounded-full bg-violet-500 px-4 py-1.5 text-sm font-semibold text-[#fff] shadow-lg shadow-violet-500/40">
            ▶ Play Now
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3">
        <h3 className="line-clamp-1 text-sm font-semibold text-slate-100 group-hover:text-violet-300">
          {game.name}
        </h3>
        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <span className="inline-flex items-center gap-1">
            <span aria-hidden>{cat.emoji}</span>
            {cat.name}
          </span>
          <span className="inline-flex items-center gap-1" title={`Rating ${game.rating} / 5`}>
            <span aria-hidden className="text-amber-400">★</span>
            {game.rating.toFixed(1)}
          </span>
        </div>
      </div>
    </Link>
  );
}
