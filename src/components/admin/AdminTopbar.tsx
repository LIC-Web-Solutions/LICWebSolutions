"use client";

import { UserButton } from "@clerk/nextjs";
import { Menu, Plus, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function breadcrumbsFromPath(pathname: string) {
  const parts = pathname.split("/").filter(Boolean);
  if (parts[0] !== "admin") {
    return ["Admin"];
  }
  const rest = parts.slice(1);
  if (rest.length === 0) {
    return ["Dashboard"];
  }
  return ["Admin", ...rest.map((p) => decodeURIComponent(p))];
}

export function AdminTopbar({ onMenuClick }: { onMenuClick: () => void }) {
  const pathname = usePathname();
  const crumbs = breadcrumbsFromPath(pathname);

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center gap-3 border-b border-zinc-800 bg-zinc-950/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/80">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="md:hidden"
        aria-label="Open menu"
        onClick={onMenuClick}
      >
        <Menu className="size-5" />
      </Button>
      <nav
        className="min-w-0 flex-1 truncate text-sm text-zinc-400"
        aria-label="Breadcrumb"
      >
        {crumbs.map((c, i) => (
          <span key={c}>
            {i > 0 ? <span className="mx-1.5 text-zinc-600">/</span> : null}
            <span
              className={
                i === crumbs.length - 1
                  ? "font-medium text-zinc-100"
                  : "capitalize"
              }
            >
              {c}
            </span>
          </span>
        ))}
      </nav>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="hidden gap-2 sm:inline-flex"
        disabled
        title="Search coming soon"
      >
        <Search className="size-4" />
        Search
        <kbd className="pointer-events-none hidden rounded border border-zinc-600 bg-zinc-900 px-1.5 font-mono text-[10px] font-medium text-zinc-500 lg:inline">
          ⌘K
        </kbd>
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="relative text-zinc-400"
        disabled
        aria-label="Notifications"
        title="Notifications coming soon"
      >
        <span className="sr-only">Notifications</span>
        <span className="text-lg leading-none">🔔</span>
        <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-sky-600 px-0.5 text-[10px] font-semibold text-white">
          2
        </span>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button type="button" size="sm" className="gap-1">
            <Plus className="size-4" />
            <span className="hidden sm:inline">New</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem asChild>
            <Link href="/admin/projects">New project</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/admin/clients">New client</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/admin/invoices">New invoice</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <UserButton />
    </header>
  );
}
