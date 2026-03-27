import type { Metadata } from "next";

import { SupportPage } from "@/components/site/ContactPages";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Support channels and best practices for existing LIC Web Solutions clients.",
};

export default function Page() {
  return <SupportPage />;
}
