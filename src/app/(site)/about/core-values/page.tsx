import type { Metadata } from "next";

import { CoreValuesPage } from "@/components/site/AboutPages";

export const metadata: Metadata = {
  title: "Core Values",
  description:
    "The principles that guide LIC Web Solutions: clarity, long-term thinking, and accountability.",
};

export default function Page() {
  return <CoreValuesPage />;
}
