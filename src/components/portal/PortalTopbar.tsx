"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  humanizeWorkspaceSlug,
  parseWorkspaceSlugFromPathname,
} from "@/lib/portal/parse-workspace-slug";
import { cn } from "@/lib/utils";
import portalStyle from "@/styles/portal.module.css";
import styles from "./PortalTopbar.module.css";

export function PortalTopbar() {
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
    <header className={cn(styles.header, portalStyle.navBar)}>
      <div className={styles.inner}>
        <nav className={styles.crumbNav} aria-label="Breadcrumb">
          <div className={styles.crumbList}>
            {crumbItems.map((item, i) => (
              <span key={item.key} className={styles.crumbItem}>
                {i > 0 ? (
                  <span className={styles.crumbSlash} aria-hidden>
                    /
                  </span>
                ) : null}
                <span
                  className={
                    i === crumbItems.length - 1
                      ? styles.crumbActive
                      : styles.crumbInactive
                  }
                >
                  {item.label}
                </span>
              </span>
            ))}
          </div>
        </nav>

        <div className={styles.actions}>
          <span className={styles.kicker}>LIC client portal</span>
          {slug ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className={styles.workspaceButton}
              asChild
            >
              <Link href="/portal">
                <span className={styles.workspaceButtonDesktop}>
                  Switch workspace
                </span>
                <span className={styles.workspaceButtonMobile}>Workspaces</span>
              </Link>
            </Button>
          ) : null}
          <UserButton
            appearance={{
              elements: {
                avatarBox: styles.avatarBox,
              },
            }}
          />
        </div>
      </div>
    </header>
  );
}
