import type { Metadata } from "next";
import AdminDashboard from "@/components/AdminDashboard";
import { getCatalog } from "@/lib/games";

export const metadata: Metadata = {
  title: "Admin Stats",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  const catalog = getCatalog();
  return <AdminDashboard gameCount={catalog.games.length} categoryCount={catalog.categories} />;
}
