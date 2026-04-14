"use client";

import type { CustomizationRequest, User, WorkspaceRole } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { approveCustomizationAction } from "@/app/portal/[workspaceSlug]/customization/actions";
import { hasPermission, PERMISSIONS } from "@/lib/auth/permissions";
import { cn } from "@/lib/utils";
import portalStyle from "@/styles/portal.module.css";
import styles from "./CustomizationRequestList.module.css";

type Row = CustomizationRequest & {
  createdBy: Pick<User, "id" | "email" | "fullName">;
  approvedBy: Pick<User, "id" | "email" | "fullName"> | null;
};

function who(u: Pick<User, "email" | "fullName">) {
  return u.fullName?.trim() || u.email || "Unknown";
}

export function CustomizationRequestList({
  workspaceSlug,
  rows,
  membershipRole,
}: {
  workspaceSlug: string;
  rows: Row[];
  membershipRole: WorkspaceRole;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const canApprove = hasPermission(
    membershipRole,
    PERMISSIONS.customizationApprove,
  );

  if (rows.length === 0) {
    return <p className={portalStyle.empty}>No customization requests yet.</p>;
  }

  return (
    <ul className={styles.list}>
      {rows.map((r) => {
        const canApproveThis =
          canApprove && (r.status === "DRAFT" || r.status === "QUOTED");
        return (
          <li key={r.id} className={portalStyle.listItem}>
            <div className={styles.row}>
              <div className={styles.body}>
                <p className={portalStyle.eyebrow}>{r.type}</p>
                <h3 className={cn(portalStyle.h2Section, styles.status)}>
                  {r.status.replaceAll("_", " ").toLowerCase()}
                </h3>
                <p className={styles.spec}>{r.specification}</p>
                <p className={styles.meta}>
                  By {who(r.createdBy)}
                  {r.approvedBy ? ` · Approved by ${who(r.approvedBy)}` : ""}
                </p>
              </div>
              {canApproveThis ? (
                <button
                  type="button"
                  disabled={pending}
                  onClick={() => {
                    startTransition(async () => {
                      await approveCustomizationAction(workspaceSlug, r.id);
                      router.refresh();
                    });
                  }}
                  className={cn(portalStyle.btnPrimary, styles.approveButton)}
                >
                  Approve
                </button>
              ) : null}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
