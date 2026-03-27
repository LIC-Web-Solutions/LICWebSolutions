import type { Metadata } from "next";

import { LicPageShell } from "@/components/landing/LicPageShell";

export const metadata: Metadata = {
  title: {
    template: "%s | LIC Web Solutions",
    default: "LIC Web Solutions",
  },
};

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LicPageShell>{children}</LicPageShell>;
}
