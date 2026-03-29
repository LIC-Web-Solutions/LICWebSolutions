import type { Metadata } from "next";

import { BookACallPage } from "@/components/site/ContactPages";

export const metadata: Metadata = {
  title: "Book a discovery call",
  description:
    "Schedule a discovery call with LIC Web Solutions—the first step for new projects. Align on goals, scope, and next steps before kickoff.",
};

export default function Page() {
  return <BookACallPage />;
}
