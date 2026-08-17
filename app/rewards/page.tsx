import type { Metadata } from "next";
import RewardsView from "@/components/RewardsView";

export const metadata: Metadata = {
  title: "Rewards — Points & Stars",
  description:
    "Earn points every time you play on GameVerse. Level up through star ranks, claim your daily bonus and track your achievements.",
  alternates: { canonical: "/rewards" },
};

export default function RewardsPage() {
  return <RewardsView />;
}
