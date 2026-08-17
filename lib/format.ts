export function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  return String(n);
}

export function gameUrl(slug: string): string {
  return `/play/${slug}`;
}

export function categoryUrl(slug: string): string {
  return `/category/${slug}`;
}
