"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import styles from "./AdminSidebar.module.css";
import { ADMIN_NAV, ADMIN_NAV_SECONDARY } from "./admin-nav";

export function AdminSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <div className={styles.root}>
      <div className={styles.header}>
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
                active ? styles.linkPrimaryActive : undefined,
              )}
            >
              <Icon className={styles.icon} aria-hidden />
              {label}
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
                active ? styles.linkSecondaryActive : undefined,
              )}
            >
              <Icon className={styles.icon} aria-hidden />
              {label}
            </Link>
          );
        })}
      </nav>
      <div className={styles.footer}>
        <Link href="/portal" className={styles.footerLink} onClick={onNavigate}>
          Client portal
        </Link>
        <Link href="/" className={styles.footerLink} onClick={onNavigate}>
          Marketing site
        </Link>
      </div>
    </div>
  );
}
