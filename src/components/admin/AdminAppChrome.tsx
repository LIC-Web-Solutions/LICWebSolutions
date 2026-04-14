"use client";

import { useState } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { TooltipProvider } from "@/components/ui/tooltip";
import styles from "./AdminAppChrome.module.css";

export function AdminAppChrome({ children }: { children: React.ReactNode }) {
  const [desktopOpen, setDesktopOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <TooltipProvider delayDuration={200}>
      <div className={styles.root}>
        <aside
          className={`${styles.desktopRail} ${desktopOpen ? styles.desktopRailOpen : styles.desktopRailCollapsed}`}
        >
          <AdminSidebar
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
          <AdminSidebar
            isExpanded={mobileOpen}
            onToggle={() => setMobileOpen((open) => !open)}
            onNavigate={() => setMobileOpen(false)}
          />
        </aside>
        <div
          className={`${styles.contentColumn} ${desktopOpen ? styles.contentColumnDesktopOpen : styles.contentColumnDesktopCollapsed}`}
        >
          <AdminTopbar />
          <main className={styles.contentMain}>{children}</main>
        </div>
      </div>
    </TooltipProvider>
  );
}
