import type { Metadata } from "next";

import { TeamPage } from "@/components/site/AboutPages";

export const metadata: Metadata = {
  title: "Team",
  description:
    "Cross-functional experts in design, engineering, content, and support at LIC Web Solutions.",
};

export default function Page() {
  return <TeamPage />;
}
