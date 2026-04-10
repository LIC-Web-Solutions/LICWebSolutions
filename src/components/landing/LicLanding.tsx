"use client";

import { useLicChrome } from "@/hooks/useLicChrome";
import { ContactModal } from "../modals/ContactModal";
import { LicFooter } from "./LicFooter";
import { LicHeader } from "./LicHeader";
import { LicMain } from "./LicMain";

export function LicLanding() {
  useLicChrome();

  return (
    <>
      <LicHeader />
      <LicMain />
      <ContactModal />
      <LicFooter />
    </>
  );
}
