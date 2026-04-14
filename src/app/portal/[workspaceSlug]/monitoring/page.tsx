import { redirect } from "next/navigation";
import { MonitoringCheckTable } from "@/app/portal/[workspaceSlug]/monitoring/MonitoringCheckTable";
import { NewMonitoringCheckForm } from "@/app/portal/[workspaceSlug]/monitoring/NewMonitoringCheckForm";
import { PortalModuleShell } from "@/components/portal/PortalModuleShell";
import {
  AuthorizationError,
  requirePermission,
  roleLabel,
} from "@/lib/auth/guards";
import { hasPermission, PERMISSIONS } from "@/lib/auth/permissions";
import { listMonitoringChecksForWorkspaceSlug } from "@/lib/monitoring/monitoring-mutations";
import portalStyle from "@/styles/portal.module.css";

interface MonitoringPageProps {
  params: Promise<{ workspaceSlug: string }>;
}

export default async function MonitoringPage({ params }: MonitoringPageProps) {
  const { workspaceSlug } = await params;

  try {
    const { workspace, membership } = await requirePermission(
      workspaceSlug,
      PERMISSIONS.monitoringView,
    );

    const rows = await listMonitoringChecksForWorkspaceSlug(workspaceSlug);
    const canManage = hasPermission(
      membership.role,
      PERMISSIONS.monitoringManage,
    );

    return (
      <PortalModuleShell
        title="Site monitoring"
        description="Review endpoint health and incident history for your production properties."
        role={roleLabel(membership.role)}
        workspaceName={workspace.name}
      >
        <div className={portalStyle.contentStack}>
          {canManage ? (
            <NewMonitoringCheckForm workspaceSlug={workspaceSlug} />
          ) : null}
          <section>
            <h2 className={portalStyle.sectionTitleXs}>Checks</h2>
            <MonitoringCheckTable rows={rows} />
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
