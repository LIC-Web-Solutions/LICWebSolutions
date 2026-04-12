"use client";

import type { TicketStatus } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { updateTicketStatusAction } from "@/app/portal/[workspaceSlug]/tickets/actions";

const STATUSES: TicketStatus[] = ["OPEN", "IN_PROGRESS", "BLOCKED", "CLOSED"];

export function TicketStatusSelect({
  workspaceSlug,
  ticketId,
  value,
  disabled,
}: {
  workspaceSlug: string;
  ticketId: string;
  value: TicketStatus;
  disabled: boolean;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <select
      value={value}
      disabled={disabled || pending}
      onChange={(e) => {
        const next = e.target.value as TicketStatus;
        startTransition(async () => {
          await updateTicketStatusAction(workspaceSlug, ticketId, next);
          router.refresh();
        });
      }}
      className="rounded border border-white/15 bg-black/30 px-2 py-1 text-xs outline-none focus:border-white/40 disabled:opacity-40"
      aria-label="Ticket status"
    >
      {STATUSES.map((s) => (
        <option key={s} value={s}>
          {s.replaceAll("_", " ")}
        </option>
      ))}
    </select>
  );
}
