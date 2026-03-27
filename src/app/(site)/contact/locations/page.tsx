import type { Metadata } from "next";

import { LocationsPage } from "@/components/site/ContactPages";

export const metadata: Metadata = {
  title: "Locations",
  description:
    "Where LIC Web Solutions works with clients—remote-first with optional on-site workshops.",
};

export default function Page() {
  return <LocationsPage />;
}
