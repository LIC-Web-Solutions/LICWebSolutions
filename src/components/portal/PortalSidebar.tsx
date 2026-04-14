"use client";

import { DoorOpen, LayoutGrid, Menu, Palette, Ticket } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PORTAL_WORKSPACE_SECTIONS } from "@/lib/portal/nav";
import {
  humanizeWorkspaceSlug,
  parseWorkspaceSlugFromPathname,
} from "@/lib/portal/parse-workspace-slug";
import { cn } from "@/lib/utils";
import portalStyle from "@/styles/portal.module.css";
import styles from "./PortalSidebar.module.css";

const ICONS = {
  "": LayoutGrid,
  tickets: Ticket,
} as const;

export function PortalSidebar({
  isExpanded,
  onToggle,
  onNavigate,
}: {
  isExpanded: boolean;
  onToggle: () => void;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const slug = parseWorkspaceSlugFromPathname(pathname);

  return (
    <div
      className={cn(
        portalStyle.sidebarShell,
        !isExpanded ? styles.sidebarCollapsed : undefined,
      )}
    >
      <div className={portalStyle.sidebarHeader}>
        <button
          type="button"
          className={styles.toggleButton}
          onClick={onToggle}
          aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          <Menu className={styles.toggleIcon} aria-hidden />
        </button>
        <Link href="/portal" className={styles.brandLink} onClick={onNavigate}>
          LIC
        </Link>
        <span className={styles.brandSuffix}>Portal</span>
      </div>
      <nav className={portalStyle.sidebarNav} aria-label="Portal">
        {!slug ? (
          <>
            <Link
              href="/portal"
              onClick={onNavigate}
              className={cn(
                portalStyle.navLink,
                !isExpanded ? styles.navLinkCompact : undefined,
                pathname === "/portal" || pathname === "/portal/"
                  ? portalStyle.navLinkActive
                  : undefined,
              )}
            >
              <LayoutGrid className={styles.navIcon} aria-hidden />
              <span className={styles.navLabel}>Workspaces</span>
            </Link>
            <Link
              href="/portal/workspace-request"
              onClick={onNavigate}
              className={cn(
                portalStyle.navLink,
                !isExpanded ? styles.navLinkCompact : undefined,
                pathname === "/portal/workspace-request"
                  ? portalStyle.navLinkActive
                  : undefined,
              )}
            >
              <Palette className={styles.navIcon} aria-hidden />
              <span className={styles.navLabel}>Request workspace</span>
            </Link>
          </>
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
                  portalStyle.navLink,
                  !isExpanded ? styles.navLinkCompact : undefined,
                  active ? portalStyle.navLinkActive : undefined,
                )}
              >
                <Icon className={styles.navIcon} aria-hidden />
                <span className={styles.navLabel}>{section.label}</span>
              </Link>
            );
          })
        )}
      </nav>
      {slug ? (
        <div className={styles.workspaceMeta}>
          <p className={styles.workspaceMetaLabel}>Workspace display name</p>
          <p className={styles.workspaceMetaTitle}>
            {humanizeWorkspaceSlug(slug)}
          </p>
          <p className={styles.workspaceMetaLabel}>Workspace URL slug</p>
          <p className={styles.workspaceMetaSlug}>/{slug}</p>
          <p className={styles.workspaceMetaHint}>
            Need a rename? Open a ticket and request name/slug change.
          </p>
        </div>
      ) : null}
      <div className={styles.footerSlot}>
        <Link href="/" className={styles.leaveLink} onClick={onNavigate}>
          <DoorOpen className={styles.leaveIcon} aria-hidden />
          <span>Leave portal</span>
        </Link>
      </div>
    </div>
  );
}
