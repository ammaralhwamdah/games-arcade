import { getLevel } from "../lib/levels";
import { isAdmin, json, requireUser, type Env } from "../lib/guard";

interface Body {
  gameSlug?: string;
  gameTitle?: string;
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const user = await requireUser(request, env);
  if (user instanceof Response) return user;

  let body: Body = {};
  try {
    body = (await request.json()) as Body;
  } catch {
    return json({ error: "Invalid JSON body." }, 400);
  }

  const gameSlug = (body.gameSlug ?? "").toString().slice(0, 80);
  const gameTitle = (body.gameTitle ?? "").toString().slice(0, 120);
  if (!gameSlug) return json({ error: "Missing gameSlug." }, 400);

  const head = {
    apikey: env.SUPABASE_SERVICE_ROLE_KEY,
    Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
    "content-type": "application/json",
  };

  if (isAdmin(user.username, env)) {
    const pointsRes = await fetch(
      `${env.SUPABASE_URL}/rest/v1/player_profiles?user_id=eq.${user.id}&select=points`,
      { headers: head }
    );
    const pointsRow = (await pointsRes.json()) as { points?: number }[];
    const points = typeof pointsRow[0]?.points === "number" ? pointsRow[0].points : 0;
    const { stars, name } = getLevel(points);

    const res = await fetch(`${env.SUPABASE_URL}/rest/v1/player_profiles?on_conflict=user_id`, {
      method: "POST",
      headers: { ...head, Prefer: "resolution=merge-duplicates,return=minimal" },
      body: JSON.stringify({
        user_id: user.id,
        username: user.username,
        points,
        stars,
        level_name: name,
        updated_at: new Date().toISOString(),
      }),
    });

    if (!res.ok && res.status !== 201) {
      return json({ error: "Failed to persist admin profile." }, 500);
    }

    return json({ ok: true, points, stars, level_name: name, ceiling: points, clamped: false });
  }

  const res = await fetch(`${env.SUPABASE_URL}/rest/v1/play_events`, {
    method: "POST",
    headers: { ...head, Prefer: "return=minimal" },
    body: JSON.stringify({
      user_id: user.id,
      username: user.username,
      game_slug: gameSlug,
      game_title: gameTitle,
      played_at: new Date().toISOString(),
    }),
  });

  if (!res.ok && res.status !== 201) {
    return json({ error: "Failed to record play event." }, 500);
  }

  return json({ ok: true });
};
