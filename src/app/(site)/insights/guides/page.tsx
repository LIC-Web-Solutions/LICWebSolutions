import type { Metadata } from "next";

import { GuidesPage } from "@/components/site/InsightsPages";

export const metadata: Metadata = {
  title: "Guides & Tutorials",
  description:
    "Step-by-step guides for launching sites, CMS structure, and content audits.",
};

export default function Page() {
  return <GuidesPage />;
}
