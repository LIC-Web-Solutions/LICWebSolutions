import type { Ticket, TicketStatus, User, WorkspaceRole } from "@prisma/client";
import { TicketStatusSelect } from "@/app/portal/[workspaceSlug]/tickets/TicketStatusSelect";
import { hasPermission, PERMISSIONS } from "@/lib/auth/permissions";

type TicketRow = Ticket & {
  createdBy: Pick<User, "id" | "email" | "fullName">;
  assignedTo: Pick<User, "id" | "email" | "fullName"> | null;
};

function displayName(u: Pick<User, "email" | "fullName">) {
  return u.fullName?.trim() || u.email || "Unknown";
}

export function TicketTable({
  workspaceSlug,
  tickets,
  membershipRole,
  currentUserId,
}: {
  workspaceSlug: string;
  tickets: TicketRow[];
  membershipRole: WorkspaceRole;
  currentUserId: string;
}) {
  const canAssign = hasPermission(membershipRole, PERMISSIONS.ticketsAssign);
  const canCreate = hasPermission(membershipRole, PERMISSIONS.ticketsCreate);

  if (tickets.length === 0) {
    return (
      <p className="rounded-lg border border-white/10 bg-white/[0.03] p-5 text-sm opacity-80">
        No tickets yet. Create one using the form above.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-white/10">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="border-b border-white/10 bg-white/[0.04] text-xs uppercase tracking-wide opacity-75">
          <tr>
            <th className="px-4 py-3 font-medium">Title</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Priority</th>
            <th className="px-4 py-3 font-medium">Created by</th>
            <th className="px-4 py-3 font-medium">Assignee</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((t) => {
            const canEditStatus =
              canAssign || (canCreate && t.createdById === currentUserId);
            return (
              <tr key={t.id} className="border-b border-white/5 last:border-0">
                <td className="px-4 py-3 align-top">
                  <p className="font-medium">{t.title}</p>
                  {t.description ? (
                    <p className="mt-1 max-w-md text-xs opacity-70">
                      {t.description}
                    </p>
                  ) : null}
                </td>
                <td className="px-4 py-3 align-top">
                  <TicketStatusSelect
                    workspaceSlug={workspaceSlug}
                    ticketId={t.id}
                    value={t.status as TicketStatus}
                    disabled={!canEditStatus}
                  />
                </td>
                <td className="px-4 py-3 align-top text-xs opacity-80">
                  {t.priority}
                </td>
                <td className="px-4 py-3 align-top text-xs opacity-80">
                  {displayName(t.createdBy)}
                </td>
                <td className="px-4 py-3 align-top text-xs opacity-80">
                  {t.assignedTo ? displayName(t.assignedTo) : "—"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
