import { redirect } from "next/navigation";
import { NewSupportThreadForm } from "@/app/portal/[workspaceSlug]/support/NewSupportThreadForm";
import { SupportThreadList } from "@/app/portal/[workspaceSlug]/support/SupportThreadList";
import { PortalModuleShell } from "@/components/portal/PortalModuleShell";
import {
  AuthorizationError,
  requirePermission,
  roleLabel,
} from "@/lib/auth/guards";
import { hasPermission, PERMISSIONS } from "@/lib/auth/permissions";
import { listSupportThreadsForWorkspaceSlug } from "@/lib/support/support-mutations";
import portalStyle from "@/styles/portal.module.css";

interface SupportPageProps {
  params: Promise<{ workspaceSlug: string }>;
}

export default async function SupportPage({ params }: SupportPageProps) {
  const { workspaceSlug } = await params;

  try {
    const { workspace, membership } = await requirePermission(
      workspaceSlug,
      PERMISSIONS.supportView,
    );

    const threads = await listSupportThreadsForWorkspaceSlug(workspaceSlug);
    const canCreate = hasPermission(membership.role, PERMISSIONS.supportCreate);

    return (
      <PortalModuleShell
        title="Support"
        description="Coordinate support threads with your delivery team and keep response history."
        role={roleLabel(membership.role)}
        workspaceName={workspace.name}
      >
        <div className={portalStyle.contentStack}>
          {canCreate ? (
            <NewSupportThreadForm workspaceSlug={workspaceSlug} />
          ) : null}
          <section>
            <h2 className={portalStyle.sectionTitleXs}>Threads</h2>
            <SupportThreadList
              workspaceSlug={workspaceSlug}
              threads={threads}
              membershipRole={membership.role}
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
