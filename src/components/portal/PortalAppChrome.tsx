"use client";

import { useState } from "react";
import { PortalSidebar } from "@/components/portal/PortalSidebar";
import { PortalTopbar } from "@/components/portal/PortalTopbar";

export function PortalAppChrome({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-full flex-1">
      <aside className="hidden w-56 shrink-0 lg:block">
        <PortalSidebar />
      </aside>
      {mobileOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-50 cursor-default bg-black/50 lg:hidden"
          aria-label="Close menu"
          onClick={() => setMobileOpen(false)}
        />
      ) : null}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-56 transform transition-transform lg:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <PortalSidebar onNavigate={() => setMobileOpen(false)} />
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <PortalTopbar onMenuClick={() => setMobileOpen((o) => !o)} />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
