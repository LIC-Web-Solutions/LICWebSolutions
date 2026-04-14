import type { Ticket, TicketStatus, User, WorkspaceRole } from "@prisma/client";
import { TicketStatusSelect } from "@/app/portal/[workspaceSlug]/tickets/TicketStatusSelect";
import { hasPermission, PERMISSIONS } from "@/lib/auth/permissions";
import { cn } from "@/lib/utils";
import portalStyle from "@/styles/portal.module.css";
import styles from "./TicketTable.module.css";

type TicketRow = Ticket & {
  createdBy: Pick<User, "id" | "email" | "fullName">;
  assignedTo: Pick<User, "id" | "email" | "fullName"> | null;
};

function displayName(u: Pick<User, "email" | "fullName">) {
  return u.fullName?.trim() || u.email || "Unknown";
}

function TicketRowFields({
  t,
  workspaceSlug,
  membershipRole,
  currentUserId,
}: {
  t: TicketRow;
  workspaceSlug: string;
  membershipRole: WorkspaceRole;
  currentUserId: string;
}) {
  const canAssign = hasPermission(membershipRole, PERMISSIONS.ticketsAssign);
  const canCreate = hasPermission(membershipRole, PERMISSIONS.ticketsCreate);
  const canEditStatus =
    canAssign || (canCreate && t.createdById === currentUserId);

  return (
    <>
      <div className={styles.rowHead}>
        <div className={styles.rowBody}>
          <p className={styles.title}>{t.title}</p>
          {t.description ? (
            <p className={styles.description}>{t.description}</p>
          ) : null}
        </div>
        <div className={styles.statusCell}>
          <TicketStatusSelect
            workspaceSlug={workspaceSlug}
            ticketId={t.id}
            value={t.status as TicketStatus}
            disabled={!canEditStatus}
          />
        </div>
      </div>
      <dl className={styles.meta}>
        <div>
          <dt className={styles.metaLabel}>Priority</dt>
          <dd className={styles.metaValuePriority}>{t.priority}</dd>
        </div>
        <div>
          <dt className={styles.metaLabel}>Created by</dt>
          <dd className={styles.metaValue}>{displayName(t.createdBy)}</dd>
        </div>
        <div className={styles.metaFull}>
          <dt className={styles.metaLabel}>Assignee</dt>
          <dd className={styles.metaValue}>
            {t.assignedTo ? displayName(t.assignedTo) : "—"}
          </dd>
        </div>
      </dl>
    </>
  );
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
  if (tickets.length === 0) {
    return (
      <p className={portalStyle.empty}>
        No tickets yet. Create one using the form above.
      </p>
    );
  }

  return (
    <>
      <div className={portalStyle.mobileStack}>
        {tickets.map((t) => (
          <article key={t.id} className={portalStyle.listItem}>
            <TicketRowFields
              t={t}
              workspaceSlug={workspaceSlug}
              membershipRole={membershipRole}
              currentUserId={currentUserId}
            />
          </article>
        ))}
      </div>

      <div className={cn(portalStyle.desktopTable, portalStyle.tableScroll)}>
        <table className={styles.table}>
          <thead className={portalStyle.thead}>
            <tr>
              <th className={portalStyle.th}>Title</th>
              <th className={portalStyle.th}>Status</th>
              <th className={portalStyle.th}>Priority</th>
              <th className={portalStyle.th}>Created by</th>
              <th className={portalStyle.th}>Assignee</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((t) => {
              const canAssign = hasPermission(
                membershipRole,
                PERMISSIONS.ticketsAssign,
              );
              const canCreate = hasPermission(
                membershipRole,
                PERMISSIONS.ticketsCreate,
              );
              const canEditStatus =
                canAssign || (canCreate && t.createdById === currentUserId);
              return (
                <tr key={t.id} className={portalStyle.tbodyRow}>
                  <td className={portalStyle.td}>
                    <p className={styles.tableTitle}>{t.title}</p>
                    {t.description ? (
                      <p className={styles.tableDescription}>{t.description}</p>
                    ) : null}
                  </td>
                  <td className={portalStyle.td}>
                    <TicketStatusSelect
                      workspaceSlug={workspaceSlug}
                      ticketId={t.id}
                      value={t.status as TicketStatus}
                      disabled={!canEditStatus}
                    />
                  </td>
                  <td className={cn(portalStyle.td, styles.tableMuted)}>
                    {t.priority}
                  </td>
                  <td className={cn(portalStyle.td, styles.tableMuted)}>
                    {displayName(t.createdBy)}
                  </td>
                  <td className={cn(portalStyle.td, styles.tableMuted)}>
                    {t.assignedTo ? displayName(t.assignedTo) : "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
