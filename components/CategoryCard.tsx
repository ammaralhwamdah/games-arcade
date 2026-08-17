import Link from "next/link";
import type { CategoryMeta } from "@/lib/types";
import { categoryUrl } from "@/lib/format";

export default function CategoryCard({ category }: { category: CategoryMeta }) {
  return (
    <Link
      href={categoryUrl(category.slug)}
      className="group relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-white/5 bg-slate-900/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-white/10 hover:bg-slate-800/60"
    >
      <div
        className="absolute -right-6 -top-6 h-20 w-20 rounded-full opacity-20 blur-2xl transition-opacity group-hover:opacity-40"
        style={{ background: category.color }}
      />
      <span
        className="flex h-11 w-11 items-center justify-center rounded-xl text-xl"
        style={{ background: `${category.color}22`, border: `1px solid ${category.color}55` }}
        aria-hidden
      >
        {category.emoji}
      </span>
      <div>
        <h3 className="text-base font-bold text-slate-100">{category.name}</h3>
        <p className="mt-0.5 text-xs text-violet-400/80">Browse category</p>
      </div>
      <span className="text-xs font-semibold text-violet-400 opacity-0 transition-opacity group-hover:opacity-100">
        Browse category →
      </span>
    </Link>
  );
}
