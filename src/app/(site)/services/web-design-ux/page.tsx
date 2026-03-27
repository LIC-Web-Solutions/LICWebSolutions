import type { Metadata } from "next";

import { WebDesignUxPage } from "@/components/site/ServicesPages";

export const metadata: Metadata = {
  title: "Web Design & UX",
  description:
    "User flows, responsive layouts, design systems, and accessible UI from LIC Web Solutions.",
};

export default function Page() {
  return <WebDesignUxPage />;
}
