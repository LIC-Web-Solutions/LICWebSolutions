"use client";

import type {
  SupportMessage,
  SupportThread,
  User,
  WorkspaceRole,
} from "@prisma/client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { resolveSupportThreadAction } from "@/app/portal/[workspaceSlug]/support/actions";
import { SupportReplyForm } from "@/app/portal/[workspaceSlug]/support/SupportReplyForm";
import { hasPermission, PERMISSIONS } from "@/lib/auth/permissions";
import { cn } from "@/lib/utils";
import portalStyle from "@/styles/portal.module.css";
import styles from "./SupportThreadList.module.css";

type Msg = SupportMessage & {
  createdBy: Pick<User, "id" | "email" | "fullName">;
};

type Row = SupportThread & {
  createdBy: Pick<User, "id" | "email" | "fullName">;
  messages: Msg[];
};

function who(u: Pick<User, "email" | "fullName">) {
  return u.fullName?.trim() || u.email || "Unknown";
}

export function SupportThreadList({
  workspaceSlug,
  threads,
  membershipRole,
}: {
  workspaceSlug: string;
  threads: Row[];
  membershipRole: WorkspaceRole;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const canCreate = hasPermission(membershipRole, PERMISSIONS.supportCreate);
  const canResolve = hasPermission(membershipRole, PERMISSIONS.supportResolve);

  if (threads.length === 0) {
    return (
      <p className={portalStyle.empty}>
        No threads yet. Open one above if you have permission.
      </p>
    );
  }

  return (
    <ul className={styles.list}>
      {threads.map((t) => (
        <li key={t.id} className={portalStyle.listItem}>
          <div className={styles.header}>
            <div className={styles.headerBody}>
              <h3 className={cn(portalStyle.h2Section, styles.title)}>
                {t.subject}
              </h3>
              <p className={styles.meta}>
                Opened by {who(t.createdBy)} ·{" "}
                {t.status.replaceAll("_", " ").toLowerCase()}
              </p>
            </div>
            {canResolve && t.status !== "RESOLVED" ? (
              <button
                type="button"
                disabled={pending}
                onClick={() => {
                  startTransition(async () => {
                    await resolveSupportThreadAction(workspaceSlug, t.id);
                    router.refresh();
                  });
                }}
                className={cn(portalStyle.btnOutline, styles.resolveButton)}
              >
                Mark resolved
              </button>
            ) : null}
          </div>
          <ul className={styles.messages}>
            {t.messages.map((m) => (
              <li key={m.id} className={styles.messageItem}>
                <p className={styles.messageAuthor}>{who(m.createdBy)}</p>
                <p className={styles.messageBody}>{m.body}</p>
              </li>
            ))}
          </ul>
          {canCreate ? (
            <SupportReplyForm workspaceSlug={workspaceSlug} threadId={t.id} />
          ) : null}
        </li>
      ))}
    </ul>
  );
}
