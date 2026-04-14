"use client";

import { useState } from "react";
import { PortalSidebar } from "@/components/portal/PortalSidebar";
import { PortalTopbar } from "@/components/portal/PortalTopbar";
import styles from "./PortalAppChrome.module.css";

export function PortalAppChrome({ children }: { children: React.ReactNode }) {
  const [desktopOpen, setDesktopOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className={styles.root}>
      <aside
        className={`${styles.desktopRail} ${desktopOpen ? styles.desktopRailOpen : styles.desktopRailCollapsed}`}
      >
        <PortalSidebar
          isExpanded={desktopOpen}
          onToggle={() => setDesktopOpen((open) => !open)}
        />
      </aside>
      {mobileOpen ? (
        <button
          type="button"
          className={styles.scrim}
          aria-label="Close menu"
          onClick={() => setMobileOpen(false)}
        />
      ) : null}
      <aside
        className={`${styles.mobileRail} ${mobileOpen ? styles.mobileRailOpen : ""}`}
      >
        <PortalSidebar
          isExpanded={mobileOpen}
          onToggle={() => setMobileOpen((open) => !open)}
          onNavigate={() => setMobileOpen(false)}
        />
      </aside>
      <div
        className={`${styles.contentColumn} ${desktopOpen ? styles.contentColumnDesktopOpen : styles.contentColumnDesktopCollapsed}`}
      >
        <PortalTopbar />
        <div className={styles.contentBody}>{children}</div>
      </div>
    </div>
  );
}
