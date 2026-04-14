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
import portalStyle from "@/styles/portal.module.css";
import styles from "./PortalSidebar.module.css";

const ICONS = {
  "": LayoutGrid,
  tickets: Ticket,
  support: LifeBuoy,
  customization: Palette,
  monitoring: LineChart,
} as const;

export function PortalSidebar({
  onNavigate,
  onClose,
}: {
  onNavigate?: () => void;
  onClose?: () => void;
}) {
  const pathname = usePathname();
  const slug = parseWorkspaceSlugFromPathname(pathname);

  return (
    <div className={portalStyle.sidebarShell}>
      <div className={portalStyle.sidebarHeader}>
        <Link href="/portal" className={styles.brandLink} onClick={onNavigate}>
          LIC
        </Link>
        <span className={styles.brandSuffix}>Portal</span>
        {onClose ? (
          <button
            type="button"
            className={styles.mobileClose}
            onClick={onClose}
            aria-label="Close sidebar"
          >
            ✕
          </button>
        ) : null}
      </div>
      <nav className={portalStyle.sidebarNav} aria-label="Portal">
        {!slug ? (
          <Link
            href="/portal"
            onClick={onNavigate}
            className={cn(portalStyle.navLink, portalStyle.navLinkActive)}
          >
            <LayoutGrid className={styles.navIcon} aria-hidden />
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
                  portalStyle.navLink,
                  active ? portalStyle.navLinkActive : undefined,
                )}
              >
                <Icon className={styles.navIcon} aria-hidden />
                {section.label}
              </Link>
            );
          })
        )}
      </nav>
      {slug ? (
        <div className={styles.workspaceMeta}>
          <p className={styles.workspaceMetaTitle}>
            {humanizeWorkspaceSlug(slug)}
          </p>
          <p className={styles.workspaceMetaSlug}>{slug}</p>
        </div>
      ) : null}
      <div className={styles.footerSlot}>
        <Link href="/" className={styles.marketingLink} onClick={onNavigate}>
          Marketing site
        </Link>
      </div>
    </div>
  );
}
