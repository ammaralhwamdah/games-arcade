import { getLevel } from "../lib/levels";
import { isAdmin, json, requireUser, type Env } from "../lib/guard";

const POINTS_PER_HOUR = 1;
const DAILY_BONUS = 1;
const HOUR_MS = 3_600_000;

interface Body {
  localPoints?: number;
  lastDaily?: string | null;
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const user = await requireUser(request, env);
  if (user instanceof Response) return user;

  if (isAdmin(user.username, env)) {
    return json({ ok: true, skipped: true, reason: "admin" });
  }

  let body: Body = {};
  try {
    body = (await request.json()) as Body;
  } catch {
    return json({ error: "Invalid JSON body." }, 400);
  }

  const requested = Number.isFinite(body.localPoints) ? Math.floor(body.localPoints as number) : 0;
  if (requested < 0) return json({ error: "Invalid points." }, 400);

  const now = Date.now();
  const accountAgeHours = Math.max(0, (now - user.createdAt) / HOUR_MS);
  const daysSinceSignup = Math.floor(accountAgeHours / 24);

  const maxByTime = Math.floor(accountAgeHours * POINTS_PER_HOUR);
  const maxByDaily = daysSinceSignup * DAILY_BONUS;
  const ceiling = maxByTime + maxByDaily;

  const head = {
    apikey: env.SUPABASE_SERVICE_ROLE_KEY,
    Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
    "content-type": "application/json",
  };

  const existingRes = await fetch(
    `${env.SUPABASE_URL}/rest/v1/player_profiles?user_id=eq.${user.id}&select=points`,
    { headers: head }
  );
  const existing = (await existingRes.json()) as { points?: number }[];
  const stored = typeof existing[0]?.points === "number" ? existing[0].points : 0;

  const approved = Math.min(requested, ceiling);
  const next = Math.max(stored, approved);
  const clamped = next > approved;

  const { stars, name } = getLevel(next);

  const writeRes = await fetch(`${env.SUPABASE_URL}/rest/v1/player_profiles?on_conflict=user_id`, {
    method: "POST",
    headers: { ...head, Prefer: "resolution=merge-duplicates,return=minimal" },
    body: JSON.stringify({
      user_id: user.id,
      username: user.username,
      points: next,
      stars,
      level_name: name,
      updated_at: new Date(now).toISOString(),
    }),
  });

  if (!writeRes.ok && writeRes.status !== 201) {
    return json({ error: "Failed to persist profile." }, 500);
  }

  return json({
    ok: true,
    points: next,
    stars,
    level_name: name,
    ceiling,
    clamped,
  });
};
