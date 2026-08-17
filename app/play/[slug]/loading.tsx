export default function PlayLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-6 h-4 w-64 animate-pulse rounded bg-white/5" />
      <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
        <div className="min-w-0">
          <div className="mb-5 h-8 w-72 animate-pulse rounded bg-white/5" />
          <div className="aspect-[16/10] w-full animate-pulse rounded-2xl bg-white/5" />
        </div>
        <aside className="hidden lg:block">
          <div className="h-64 animate-pulse rounded-2xl bg-white/5" />
        </aside>
      </div>
    </div>
  );
}
