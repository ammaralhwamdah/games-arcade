import { createClient } from "@supabase/supabase-js";

export async function isAdminRequest(token: string | null): Promise<boolean> {
  if (!token) return false;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!url || !anonKey || !adminEmail) return false;
  const supabase = createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    global: { headers: { Authorization: `Bearer ${token}` } },
  });
  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user) return false;
  return data.user.email?.toLowerCase() === adminEmail.toLowerCase();
}

export function getExcludedUsernames(): string[] {
  const names = new Set<string>();
  const fromEnv =
    process.env.ADMIN_USERNAME
      ?.split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean) ?? [];
  fromEnv.forEach((n) => names.add(n));
  const emailLocal = process.env.ADMIN_EMAIL?.split("@")[0]?.toLowerCase();
  if (emailLocal) names.add(emailLocal);
  return [...names];
}
