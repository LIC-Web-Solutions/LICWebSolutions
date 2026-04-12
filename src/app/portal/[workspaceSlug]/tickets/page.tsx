import { redirect } from "next/navigation";
import { TicketCreateForm } from "@/app/portal/[workspaceSlug]/tickets/TicketCreateForm";
import { TicketTable } from "@/app/portal/[workspaceSlug]/tickets/TicketTable";
import { PortalModuleShell } from "@/components/portal/PortalModuleShell";
import {
  AuthorizationError,
  requirePermission,
  roleLabel,
} from "@/lib/auth/guards";
import { hasPermission, PERMISSIONS } from "@/lib/auth/permissions";
import { requireCurrentAppUser } from "@/lib/auth/session";
import { listTicketsForWorkspaceSlug } from "@/lib/tickets/ticket-mutations";

interface TicketsPageProps {
  params: Promise<{ workspaceSlug: string }>;
}

export default async function TicketsPage({ params }: TicketsPageProps) {
  const { workspaceSlug } = await params;

  try {
    const { workspace, membership } = await requirePermission(
      workspaceSlug,
      PERMISSIONS.ticketsView,
    );

    const [tickets, appUser] = await Promise.all([
      listTicketsForWorkspaceSlug(workspaceSlug),
      requireCurrentAppUser(),
    ]);

    const canCreate = hasPermission(membership.role, PERMISSIONS.ticketsCreate);

    return (
      <PortalModuleShell
        title="Tickets"
        description="Create and triage development tickets for implementation, bug fixes, and QA."
        role={roleLabel(membership.role)}
        workspaceName={workspace.name}
      >
        <div className="space-y-8">
          {canCreate ? (
            <TicketCreateForm workspaceSlug={workspaceSlug} />
          ) : null}
          <section>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide opacity-70">
              All tickets
            </h2>
            <TicketTable
              workspaceSlug={workspaceSlug}
              tickets={tickets}
              membershipRole={membership.role}
              currentUserId={appUser.id}
            />
          </section>
        </div>
      </PortalModuleShell>
    );
  } catch (error) {
    if (error instanceof AuthorizationError) {
      redirect("/portal/access-denied");
    }
    throw error;
  }
}
