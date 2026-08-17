export default function Loading() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-violet-500/20 border-t-violet-500" />
      <p className="text-sm text-slate-400">Loading games…</p>
    </div>
  );
}
