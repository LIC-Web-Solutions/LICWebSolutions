import type { Metadata } from "next";

import { WebsiteMaintenancePage } from "@/components/site/ServicesPages";

export const metadata: Metadata = {
  title: "Website Maintenance",
  description:
    "Security updates, performance monitoring, and ongoing improvements for your site.",
};

export default function Page() {
  return <WebsiteMaintenancePage />;
}
