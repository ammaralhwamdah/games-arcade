create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  game_slug text not null,
  name text not null default 'Guest',
  content text not null,
  created_at timestamptz not null default now()
);

create index if not exists comments_game_slug_idx on public.comments (game_slug);

alter table public.comments enable row level security;

create policy "Comments are public to read" on public.comments
  for select using (true);

create policy "Anyone can add a comment" on public.comments
  for insert with check (true);
