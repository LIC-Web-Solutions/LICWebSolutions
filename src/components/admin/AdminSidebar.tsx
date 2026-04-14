"use client";

import { DoorOpen, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import styles from "./AdminSidebar.module.css";
import { ADMIN_NAV, ADMIN_NAV_SECONDARY } from "./admin-nav";

export function AdminSidebar({
  isExpanded,
  onToggle,
  onNavigate,
}: {
  isExpanded: boolean;
  onToggle: () => void;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        styles.root,
        !isExpanded ? styles.rootCollapsed : undefined,
      )}
    >
      <div className={styles.header}>
        <button
          type="button"
          className={styles.toggleButton}
          onClick={onToggle}
          aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          <Menu className={styles.toggleIcon} aria-hidden />
        </button>
        <Link href="/admin" className={styles.brand} onClick={onNavigate}>
          LIC
        </Link>
        <span className={styles.suffix}>Admin</span>
      </div>
      <nav className={styles.nav} aria-label="Admin">
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
                styles.link,
                !isExpanded ? styles.linkCompact : undefined,
                active ? styles.linkPrimaryActive : undefined,
              )}
            >
              <Icon className={styles.icon} aria-hidden />
              <span className={styles.linkLabel}>{label}</span>
            </Link>
          );
        })}
        <div className={styles.labelMore}>More</div>
        {ADMIN_NAV_SECONDARY.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              onClick={onNavigate}
              className={cn(
                styles.link,
                !isExpanded ? styles.linkCompact : undefined,
                active ? styles.linkSecondaryActive : undefined,
              )}
            >
              <Icon className={styles.icon} aria-hidden />
              <span className={styles.linkLabel}>{label}</span>
            </Link>
          );
        })}
      </nav>
      <div className={styles.footer}>
        <Link href="/portal" className={styles.footerLink} onClick={onNavigate}>
          Client portal
        </Link>
        <Link href="/" className={styles.footerLink} onClick={onNavigate}>
          <DoorOpen className={styles.leaveIcon} aria-hidden />
          <span>Leave admin</span>
        </Link>
      </div>
    </div>
  );
}
