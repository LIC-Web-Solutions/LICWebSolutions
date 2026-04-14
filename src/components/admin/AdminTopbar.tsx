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
import styles from "./AdminTopbar.module.css";

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
    <header className={styles.header}>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={styles.menuButton}
        aria-label="Open menu"
        onClick={onMenuClick}
      >
        <Menu className={styles.menuIcon} />
      </Button>
      <nav className={styles.crumbs} aria-label="Breadcrumb">
        <span className={styles.kicker}>LIC operations</span>
        {crumbs.map((c, i) => (
          <span key={c}>
            {i > 0 ? <span className={styles.slash}>/</span> : null}
            <span
              className={
                i === crumbs.length - 1
                  ? styles.crumbCurrent
                  : styles.crumbOther
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
        className={styles.searchButton}
        disabled
        title="Search coming soon"
      >
        <Search className={styles.plusIcon} />
        Search
        <kbd className={styles.kbd}>⌘K</kbd>
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={styles.notificationButton}
        disabled
        aria-label="Notifications"
        title="Notifications coming soon"
      >
        <span className="sr-only">Notifications</span>
        <span className={styles.notificationGlyph}>🔔</span>
        <span className={styles.notificationBadge}>2</span>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button type="button" size="sm" className={styles.newButton}>
            <Plus className={styles.plusIcon} />
            <span className={styles.newButtonText}>New</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className={styles.menuSheet}>
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
