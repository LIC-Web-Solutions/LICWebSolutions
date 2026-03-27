import type { Metadata } from "next";

import { WebDevelopmentPage } from "@/components/site/ServicesPages";

export const metadata: Metadata = {
  title: "Web Development",
  description:
    "Modern front-end development with Next.js, CMS integration, and quality practices.",
};

export default function Page() {
  return <WebDevelopmentPage />;
}
