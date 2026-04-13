"use client";

import { UserButton } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  humanizeWorkspaceSlug,
  parseWorkspaceSlugFromPathname,
} from "@/lib/portal/parse-workspace-slug";

export function PortalTopbar({ onMenuClick }: { onMenuClick: () => void }) {
  const pathname = usePathname();
  const slug = parseWorkspaceSlugFromPathname(pathname);

  const crumbItems: { key: string; label: string }[] = [
    { key: "portal", label: "Portal" },
  ];
  if (slug) {
    crumbItems.push({
      key: `workspace-${slug}`,
      label: humanizeWorkspaceSlug(slug),
    });
    const rest = pathname.split("/").slice(3).filter(Boolean);
    for (const seg of rest) {
      crumbItems.push({
        key: `path-${slug}-${seg}`,
        label: seg.charAt(0).toUpperCase() + seg.slice(1),
      });
    }
  }

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center gap-3 border-b border-zinc-800 bg-zinc-950/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/80">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="lg:hidden"
        aria-label="Open menu"
        onClick={onMenuClick}
      >
        <Menu className="size-5" />
      </Button>
      <nav
        className="min-w-0 flex-1 truncate text-sm text-zinc-400"
        aria-label="Breadcrumb"
      >
        {crumbItems.map((item, i) => (
          <span key={item.key}>
            {i > 0 ? <span className="mx-1.5 text-zinc-600">/</span> : null}
            <span
              className={
                i === crumbItems.length - 1
                  ? "font-medium text-zinc-100"
                  : undefined
              }
            >
              {item.label}
            </span>
          </span>
        ))}
      </nav>
      {slug ? (
        <Button type="button" variant="outline" size="sm" asChild>
          <Link href="/portal">Switch workspace</Link>
        </Button>
      ) : null}
      <UserButton />
    </header>
  );
}
