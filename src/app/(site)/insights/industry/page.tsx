import type { Metadata } from "next";

import { IndustryInsightsPage } from "@/components/site/InsightsPages";

export const metadata: Metadata = {
  title: "Industry Insights",
  description:
    "Briefs on trust signals, healthcare UX, and benchmarks by vertical.",
};

export default function Page() {
  return <IndustryInsightsPage />;
}
