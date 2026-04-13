"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ADMIN_NAV } from "./admin-nav";

export function AdminSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col border-r border-zinc-800 bg-zinc-950">
      <div className="flex h-14 items-center border-b border-zinc-800 px-4">
        <Link
          href="/admin"
          className="text-lg font-semibold tracking-tight text-zinc-50"
          onClick={onNavigate}
        >
          LIC
        </Link>
        <span className="ml-2 text-xs font-medium uppercase tracking-wide text-zinc-500">
          Admin
        </span>
      </div>
      <nav className="flex flex-1 flex-col gap-0.5 p-2" aria-label="Admin">
        {ADMIN_NAV.map(({ href, label, icon: Icon }) => {
          const active =
            href === "/admin"
              ? pathname === "/admin" || pathname === "/admin/"
              : pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500",
                active
                  ? "bg-sky-600/20 text-sky-100"
                  : "text-zinc-400 hover:bg-zinc-800/80 hover:text-zinc-100",
              )}
            >
              <Icon className="size-4 shrink-0 opacity-90" aria-hidden />
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-zinc-800 p-3 text-xs text-zinc-500">
        <Link
          href="/portal"
          className="block rounded-md px-2 py-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
          onClick={onNavigate}
        >
          Client portal
        </Link>
        <Link
          href="/"
          className="mt-1 block rounded-md px-2 py-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
          onClick={onNavigate}
        >
          Marketing site
        </Link>
      </div>
    </div>
  );
}
