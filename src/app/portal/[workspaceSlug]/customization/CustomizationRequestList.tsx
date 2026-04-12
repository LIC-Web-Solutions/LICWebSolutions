"use client";

import type { CustomizationRequest, User, WorkspaceRole } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { approveCustomizationAction } from "@/app/portal/[workspaceSlug]/customization/actions";
import { hasPermission, PERMISSIONS } from "@/lib/auth/permissions";

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
    return (
      <p className="rounded-lg border border-white/10 bg-white/[0.03] p-5 text-sm opacity-80">
        No customization requests yet.
      </p>
    );
  }

  return (
    <ul className="space-y-4">
      {rows.map((r) => {
        const canApproveThis =
          canApprove && (r.status === "DRAFT" || r.status === "QUOTED");
        return (
          <li
            key={r.id}
            className="rounded-lg border border-white/10 bg-white/[0.03] p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-wide opacity-60">
                  {r.type}
                </p>
                <h3 className="mt-1 text-lg font-semibold">{r.status}</h3>
                <p className="mt-2 whitespace-pre-wrap text-sm opacity-85">
                  {r.specification}
                </p>
                <p className="mt-3 text-xs opacity-60">
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
                  className="rounded-full border border-emerald-400/40 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-200 disabled:opacity-40"
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
