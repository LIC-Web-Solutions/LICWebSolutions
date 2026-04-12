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
      <p className="rounded-lg border border-white/10 bg-white/[0.03] p-5 text-sm opacity-80">
        No threads yet. Open one above if you have permission.
      </p>
    );
  }

  return (
    <ul className="space-y-6">
      {threads.map((t) => (
        <li
          key={t.id}
          className="rounded-lg border border-white/10 bg-white/[0.03] p-5"
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold">{t.subject}</h3>
              <p className="mt-1 text-xs opacity-70">
                Opened by {who(t.createdBy)} · {t.status.replaceAll("_", " ")}
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
                className="rounded-full border border-white/25 px-3 py-1 text-xs font-semibold uppercase tracking-wide disabled:opacity-40"
              >
                Mark resolved
              </button>
            ) : null}
          </div>
          <ul className="mt-4 space-y-3 border-t border-white/10 pt-4">
            {t.messages.map((m) => (
              <li key={m.id} className="text-sm">
                <p className="text-xs opacity-60">{who(m.createdBy)}</p>
                <p className="mt-1 whitespace-pre-wrap opacity-90">{m.body}</p>
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
