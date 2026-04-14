import type { WorkspaceRequestStatus } from "@prisma/client";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { listWorkspaceRequestsForAdmin } from "@/lib/workspace-requests/workspace-request-mutations";
import {
  approveWorkspaceRequestAction,
  rejectWorkspaceRequestAction,
} from "./actions";
import styles from "./WorkspaceRequestsPage.module.css";

export const metadata: Metadata = {
  title: "Workspace Requests",
};

const statusLabel: Record<WorkspaceRequestStatus, string> = {
  NEW: "New",
  IN_REVIEW: "In review",
  APPROVED: "Approved",
  REJECTED: "Rejected",
};

function statusClass(status: WorkspaceRequestStatus) {
  if (status === "APPROVED") {
    return styles["workspaceRequests__status--approved"];
  }
  if (status === "REJECTED") {
    return styles["workspaceRequests__status--rejected"];
  }
  return styles["workspaceRequests__status--new"];
}

export default async function AdminWorkspaceRequestsPage() {
  const requests = await listWorkspaceRequestsForAdmin();

  return (
    <section className={styles.workspaceRequests}>
      <header className={styles.workspaceRequests__header}>
        <h1 className={styles.workspaceRequests__title}>Workspace requests</h1>
        <p className={styles.workspaceRequests__subtitle}>
          Review client requests and provision approved workspaces with initial
          member access.
        </p>
      </header>

      {requests.length === 0 ? (
        <div className={styles.workspaceRequests__empty}>
          No workspace requests yet.
        </div>
      ) : (
        <ul className={styles.workspaceRequests__list}>
          {requests.map((request) => (
            <li key={request.id} className={styles.workspaceRequests__card}>
              <div className={styles.workspaceRequests__cardTop}>
                <p className={styles.workspaceRequests__name}>
                  {request.proposedName}
                </p>
                <p
                  className={cn(
                    styles.workspaceRequests__status,
                    statusClass(request.status),
                  )}
                >
                  {statusLabel[request.status]}
                </p>
              </div>
              <p className={styles.workspaceRequests__meta}>
                /portal/{request.proposedSlug} · Requested by{" "}
                {request.requestedBy.fullName ||
                  request.requestedBy.email ||
                  "Unknown user"}
              </p>
              <p className={styles.workspaceRequests__invites}>
                Invite count: {request.invites.length}
                {request.invites.length > 0
                  ? ` (${request.invites.map((invite) => invite.email).join(", ")})`
                  : ""}
              </p>
              {request.adminNote ? (
                <p className={styles.workspaceRequests__meta}>
                  Admin note: {request.adminNote}
                </p>
              ) : null}
              {request.status === "NEW" || request.status === "IN_REVIEW" ? (
                <div className={styles.workspaceRequests__actions}>
                  <form action={approveWorkspaceRequestAction}>
                    <input type="hidden" name="requestId" value={request.id} />
                    <Input
                      className={styles.workspaceRequests__note}
                      name="adminNote"
                      placeholder="Approval note (optional)"
                    />
                    <div className={styles.workspaceRequests__actionsRow}>
                      <Button type="submit">Approve and provision</Button>
                    </div>
                  </form>
                  <form action={rejectWorkspaceRequestAction}>
                    <input type="hidden" name="requestId" value={request.id} />
                    <Input
                      className={styles.workspaceRequests__note}
                      name="adminNote"
                      placeholder="Rejection reason (optional)"
                    />
                    <div className={styles.workspaceRequests__actionsRow}>
                      <Button type="submit" variant="destructive">
                        Reject request
                      </Button>
                    </div>
                  </form>
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
