"use client";

import { useLicChrome } from "@/hooks/useLicChrome";
import { ContactModal } from "../modals/ContactModal";
import { LicFooter } from "./LicFooter";
import { LicHeader } from "./LicHeader";

export function LicPageShell({ children }: { children: React.ReactNode }) {
  useLicChrome();

  return (
    <>
      <LicHeader showHero={false} />
      {children}
      <ContactModal />
      <LicFooter />
    </>
  );
}
