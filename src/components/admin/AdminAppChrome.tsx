"use client";

import { useState } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { TooltipProvider } from "@/components/ui/tooltip";

export function AdminAppChrome({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <TooltipProvider delayDuration={200}>
      <div className="flex min-h-full">
        <aside className="hidden w-60 shrink-0 md:block">
          <AdminSidebar />
        </aside>
        {mobileOpen ? (
          <button
            type="button"
            className="fixed inset-0 z-50 cursor-default bg-black/50 md:hidden"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          />
        ) : null}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-60 transform transition-transform md:hidden ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <AdminSidebar onNavigate={() => setMobileOpen(false)} />
        </aside>
        <div className="flex min-w-0 flex-1 flex-col">
          <AdminTopbar onMenuClick={() => setMobileOpen((o) => !o)} />
          <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-8 pb-12">
            {children}
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}
