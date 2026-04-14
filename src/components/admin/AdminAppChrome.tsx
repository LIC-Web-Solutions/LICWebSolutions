"use client";

import { useState } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { TooltipProvider } from "@/components/ui/tooltip";
import styles from "./AdminAppChrome.module.css";

export function AdminAppChrome({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <TooltipProvider delayDuration={200}>
      <div className={styles.root}>
        <aside className={styles.desktopRail}>
          <AdminSidebar />
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
          <AdminSidebar onNavigate={() => setMobileOpen(false)} />
        </aside>
        <div className={styles.contentColumn}>
          <AdminTopbar onMenuClick={() => setMobileOpen((o) => !o)} />
          <main className={styles.contentMain}>{children}</main>
        </div>
      </div>
    </TooltipProvider>
  );
}
