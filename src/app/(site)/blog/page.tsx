import type { Metadata } from "next";

import { BlogPage } from "@/components/site/InsightsPages";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles on design systems, performance, and scalable content workflows.",
};

export default function Page() {
  return <BlogPage />;
}
