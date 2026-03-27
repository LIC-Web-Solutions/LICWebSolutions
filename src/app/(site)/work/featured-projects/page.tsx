import type { Metadata } from "next";

import { FeaturedProjectsPage } from "@/components/site/WorkPages";

export const metadata: Metadata = {
  title: "Featured Projects",
  description:
    "Highlighted engagements: rebrands, conversion systems, docs, and ongoing optimization.",
};

export default function Page() {
  return <FeaturedProjectsPage />;
}
