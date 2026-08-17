export function isAdminUsername(username: string | null | undefined): boolean {
  if (!username) return false;
  const names = (process.env.NEXT_PUBLIC_ADMIN_USERNAME ?? "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  return names.includes(username.toLowerCase());
}
