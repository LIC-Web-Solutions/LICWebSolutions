"use client";

import type { TicketStatus } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { updateTicketStatusAction } from "@/app/portal/[workspaceSlug]/tickets/actions";
import { cn } from "@/lib/utils";
import portalStyle from "@/styles/portal.module.css";

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
      className={cn(portalStyle.select, portalStyle.selectWide)}
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
