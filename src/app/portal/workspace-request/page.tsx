import type { WorkspaceRequestStatus } from "@prisma/client";
import Link from "next/link";
import { WorkspaceRequestForm } from "@/app/portal/workspace-request/WorkspaceRequestForm";
import { cn } from "@/lib/utils";
import { listWorkspaceRequestsForCurrentUser } from "@/lib/workspace-requests/workspace-request-mutations";
import portalStyle from "@/styles/portal.module.css";

const STATUS_LABEL: Record<WorkspaceRequestStatus, string> = {
  NEW: "New",
  IN_REVIEW: "In review",
  APPROVED: "Approved",
  REJECTED: "Rejected",
};

export default async function WorkspaceRequestPage() {
  const requests = await listWorkspaceRequestsForCurrentUser();

  return (
    <main className={cn(portalStyle.pageFrame, portalStyle.mainShell)}>
      <h1 className={cn(portalStyle.h1Page, portalStyle.h1Medium)}>
        Workspace requests
      </h1>
      <p className={portalStyle.lede}>
        Submit a new workspace request when your team needs a dedicated project
        hub. Approved requests are provisioned in the portal automatically.
      </p>
      <div className={portalStyle.sectionBoundary}>
        <WorkspaceRequestForm />
      </div>
      <section className={portalStyle.sectionBoundary}>
        <h2 className={portalStyle.h2Section}>Your recent requests</h2>
        {requests.length === 0 ? (
          <p className={portalStyle.helperText}>No requests submitted yet.</p>
        ) : (
          <ul className={portalStyle.workspaceList}>
            {requests.map((request) => (
              <li key={request.id} className={portalStyle.workspacePickerCard}>
                <div className={portalStyle.workspaceCardHeader}>
                  <p className={portalStyle.workspaceName}>
                    {request.proposedName}
                  </p>
                  <span className={portalStyle.badgeRole}>
                    {STATUS_LABEL[request.status]}
                  </span>
                </div>
                <p className={portalStyle.workspacePath}>
                  /portal/{request.proposedSlug}
                </p>
                <p className={portalStyle.helperText}>
                  Invites: {request.invites.length} · Submitted{" "}
                  {request.createdAt.toLocaleDateString()}
                </p>
                {request.status === "APPROVED" &&
                request.approvedWorkspaceId ? (
                  <p className={portalStyle.workspaceAction}>
                    Approved.{" "}
                    <Link href="/portal" className={portalStyle.linkAccent}>
                      Open workspace chooser
                    </Link>
                  </p>
                ) : null}
                {request.adminNote ? (
                  <p className={portalStyle.helperText}>
                    Admin note: {request.adminNote}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
