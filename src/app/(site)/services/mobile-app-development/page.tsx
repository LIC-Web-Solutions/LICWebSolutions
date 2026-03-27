import type { Metadata } from "next";

import { MobileAppDevelopmentPage } from "@/components/site/ServicesPages";

export const metadata: Metadata = {
  title: "Mobile App Development",
  description:
    "Cross-platform and native mobile apps aligned with your web presence.",
};

export default function Page() {
  return <MobileAppDevelopmentPage />;
}
