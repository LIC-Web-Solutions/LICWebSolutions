"use client";

import { useState } from "react";
import { PortalSidebar } from "@/components/portal/PortalSidebar";
import { PortalTopbar } from "@/components/portal/PortalTopbar";
import styles from "./PortalAppChrome.module.css";

export function PortalAppChrome({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className={styles.root}>
      <aside className={styles.desktopRail}>
        <PortalSidebar />
      </aside>
      {mobileOpen ? (
        <button
          type="button"
          className={styles.scrim}
          aria-label="Close menu"
          onClick={() => setMobileOpen(false)}
        />
      ) : null}
      {!mobileOpen ? (
        <button
          type="button"
          className={styles.mobileOpenHandle}
          aria-label="Open sidebar"
          onClick={() => setMobileOpen(true)}
        >
          ☰
        </button>
      ) : null}
      <aside
        className={`${styles.mobileRail} ${mobileOpen ? styles.mobileRailOpen : ""}`}
      >
        <PortalSidebar
          onNavigate={() => setMobileOpen(false)}
          onClose={() => setMobileOpen(false)}
        />
      </aside>
      <div className={styles.contentColumn}>
        <PortalTopbar />
        <div className={styles.contentBody}>{children}</div>
      </div>
    </div>
  );
}
