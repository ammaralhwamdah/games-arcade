import { isAdmin, json, requireUser, type Env } from "../../lib/guard";

export const onRequestDelete: PagesFunction<Env> = async ({ request, env, params }) => {
  const user = await requireUser(request, env);
  if (user instanceof Response) return user;

  if (!isAdmin(user.username, env)) {
    return json({ error: "Not authorized." }, 403);
  }

  const raw = params.id;
  const id = Array.isArray(raw) ? raw[0] : raw;
  if (!id) return json({ error: "Missing comment id." }, 400);

  const res = await fetch(
    `${env.SUPABASE_URL}/rest/v1/comments?id=eq.${encodeURIComponent(id)}`,
    {
      method: "DELETE",
      headers: {
        apikey: env.SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
        Prefer: "return=representation",
      },
    }
  );

  if (!res.ok && res.status !== 204) {
    return json({ error: "Failed to delete comment." }, 500);
  }

  return json({ ok: true, id });
};
