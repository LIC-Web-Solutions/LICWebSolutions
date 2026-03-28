import type { Metadata } from "next";

import { TeamPage } from "@/components/site/AboutPages";

export const metadata: Metadata = {
  title: "Meet the team",
  description:
    "Meet the founder and learn how design, engineering, content, and support come together at LIC Web Solutions.",
};

export default function Page() {
  return <TeamPage />;
}
