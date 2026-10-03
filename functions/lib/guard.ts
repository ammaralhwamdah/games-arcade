export interface Env {
  SUPABASE_URL: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
  ADMIN_USERNAME?: string;
}

export interface AuthedUser {
  id: string;
  email: string | null;
  username: string;
  createdAt: number;
}

export function isAdmin(username: string, env: Env): boolean {
  const list = (env.ADMIN_USERNAME ?? "ammar")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  return list.includes(username.toLowerCase());
}

export async function requireUser(request: Request, env: Env): Promise<AuthedUser | Response> {
  const header = request.headers.get("Authorization") ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7).trim() : "";
  if (!token) return json({ error: "Missing authorization token." }, 401);

  const res = await fetch(`${env.SUPABASE_URL}/auth/v1/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
      apikey: env.SUPABASE_SERVICE_ROLE_KEY,
    },
  });

  if (!res.ok) return json({ error: "Invalid or expired session." }, 401);

  const user = (await res.json()) as {
    id: string;
    email?: string;
    created_at: string;
    user_metadata?: { username?: string; name?: string };
  };

  const meta = user.user_metadata ?? {};
  const username =
    (typeof meta.username === "string" && meta.username.trim()) ||
    (typeof meta.name === "string" && meta.name.trim()) ||
    (user.email ? user.email.split("@")[0] : "player");

  return {
    id: user.id,
    email: user.email ?? null,
    username,
    createdAt: new Date(user.created_at).getTime(),
  };
}

export function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      "access-control-allow-origin": "*",
      "access-control-allow-headers": "authorization,content-type",
      "access-control-allow-methods": "POST,DELETE,OPTIONS",
    },
  });
}
