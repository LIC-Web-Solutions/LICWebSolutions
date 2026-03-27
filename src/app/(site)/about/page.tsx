import type { Metadata } from "next";

import { AboutUsPage } from "@/components/site/AboutPages";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Who LIC Web Solutions is, how we partner with clients, and how we deliver disciplined design.",
};

export default function Page() {
  return <AboutUsPage />;
}
