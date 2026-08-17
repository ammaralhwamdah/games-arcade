import { createClient } from "@supabase/supabase-js";

export interface GameComment {
  id: string;
  game_slug: string;
  name: string;
  content: string;
  created_at: string;
}

export const COMMENT_LIMIT = 50;
export const NAME_MAX = 50;
export const CONTENT_MAX = 1000;

function serverClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  if (!url || !anonKey) return null;
  return createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });
}

export async function getComments(gameSlug: string, limit = COMMENT_LIMIT): Promise<GameComment[]> {
  const supabase = serverClient();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("comments")
    .select("id, game_slug, name, content, created_at")
    .eq("game_slug", gameSlug)
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) return [];
  return (data ?? []) as GameComment[];
}

export async function addComment(
  gameSlug: string,
  name: string,
  content: string
): Promise<{ error?: string; comment?: GameComment }> {
  const supabase = serverClient();
  if (!supabase) return { error: "Comments are not configured on this server." };
  const cleanName = (name.trim() || "Guest").slice(0, NAME_MAX);
  const cleanContent = content.trim().slice(0, CONTENT_MAX);
  if (!cleanContent) return { error: "Comment cannot be empty." };
  const { data, error } = await supabase
    .from("comments")
    .insert({ game_slug: gameSlug, name: cleanName, content: cleanContent })
    .select("id, game_slug, name, content, created_at")
    .single();
  if (error) return { error: error.message };
  return { comment: data as GameComment };
}

export async function getRecentComments(limit = 100): Promise<GameComment[]> {
  const supabase = serverClient();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("comments")
    .select("id, game_slug, name, content, created_at")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) return [];
  return (data ?? []) as GameComment[];
}

export async function deleteComment(
  id: string,
  adminToken: string
): Promise<{ error?: string }> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  if (!url || !anonKey) return { error: "Supabase is not configured on this server." };

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

  let supabase: ReturnType<typeof createClient>;
  if (serviceKey) {
    // Service role bypasses RLS entirely — the recommended path for admin deletes.
    supabase = createClient(url, serviceKey, {
      auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    });
  } else {
    if (!adminToken) return { error: "Admin token is required to delete comments." };
    supabase = createClient(url, anonKey, {
      auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
      global: { headers: { Authorization: `Bearer ${adminToken}` } },
    });
  }

  const { data, error } = await supabase
    .from("comments")
    .delete()
    .eq("id", id)
    .select("id");

  if (error) return { error: error.message };

  // Supabase returns success even when RLS blocked the delete (0 rows). Detect it.
  if (!data || data.length === 0) {
    return {
      error: serviceKey
        ? "Comment not found (it may already have been deleted)."
        : "The delete was blocked by the database security rules. Add a Supabase delete policy for the admin user, or set SUPABASE_SERVICE_ROLE_KEY in .env.local.",
    };
  }
  return {};
}
