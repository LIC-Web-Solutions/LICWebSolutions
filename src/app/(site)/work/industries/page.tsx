import type { Metadata } from "next";

import { IndustriesPage } from "@/components/site/WorkPages";

export const metadata: Metadata = {
  title: "Industries We Serve",
  description:
    "Sectors LIC Web Solutions supports: professional services, healthcare, SaaS, and more.",
};

export default function Page() {
  return <IndustriesPage />;
}
