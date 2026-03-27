import type { Metadata } from "next";

import { BookACallPage } from "@/components/site/ContactPages";

export const metadata: Metadata = {
  title: "Book a Call",
  description:
    "Schedule a conversation with LIC Web Solutions to align on goals and timeline.",
};

export default function Page() {
  return <BookACallPage />;
}
