"use client";

import { LayoutGrid, LifeBuoy, LineChart, Palette, Ticket } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PORTAL_WORKSPACE_SECTIONS } from "@/lib/portal/nav";
import {
  humanizeWorkspaceSlug,
  parseWorkspaceSlugFromPathname,
} from "@/lib/portal/parse-workspace-slug";
import { cn } from "@/lib/utils";

const ICONS = {
  "": LayoutGrid,
  tickets: Ticket,
  support: LifeBuoy,
  customization: Palette,
  monitoring: LineChart,
} as const;

export function PortalSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const slug = parseWorkspaceSlugFromPathname(pathname);

  return (
    <div className="flex h-full flex-col border-r border-zinc-800 bg-zinc-950">
      <div className="flex h-14 items-center border-b border-zinc-800 px-4">
        <Link
          href="/portal"
          className="text-lg font-semibold tracking-tight text-zinc-50"
          onClick={onNavigate}
        >
          LIC
        </Link>
        <span className="ml-2 text-xs font-medium uppercase tracking-wide text-zinc-500">
          Portal
        </span>
      </div>
      <nav className="flex flex-1 flex-col gap-0.5 p-2" aria-label="Portal">
        {!slug ? (
          <Link
            href="/portal"
            onClick={onNavigate}
            className="flex items-center gap-3 rounded-md bg-sky-600/20 px-3 py-2 text-sm font-medium text-sky-100"
          >
            <LayoutGrid className="size-4 shrink-0" aria-hidden />
            Workspaces
          </Link>
        ) : (
          PORTAL_WORKSPACE_SECTIONS.map((section) => {
            const href =
              section.path === ""
                ? `/portal/${slug}`
                : `/portal/${slug}/${section.path}`;
            const iconKey = section.path === "" ? "" : section.path;
            const Icon = ICONS[iconKey as keyof typeof ICONS];
            const active =
              section.path === ""
                ? pathname === `/portal/${slug}` ||
                  pathname === `/portal/${slug}/`
                : pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={section.path || "overview"}
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
                {section.label}
              </Link>
            );
          })
        )}
      </nav>
      {slug ? (
        <div className="border-t border-zinc-800 p-3 text-xs text-zinc-500">
          <p className="truncate font-medium text-zinc-400">
            {humanizeWorkspaceSlug(slug)}
          </p>
          <p className="mt-0.5 font-mono text-[0.65rem] text-zinc-600">
            {slug}
          </p>
        </div>
      ) : null}
      <div className="border-t border-zinc-800 p-3 text-xs">
        <Link
          href="/admin"
          className="block rounded-md px-2 py-1.5 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-200"
          onClick={onNavigate}
        >
          Agency admin
        </Link>
        <Link
          href="/"
          className="mt-1 block rounded-md px-2 py-1.5 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-200"
          onClick={onNavigate}
        >
          Marketing site
        </Link>
      </div>
    </div>
  );
}
