import { redirect } from "next/navigation";
import { CustomizationRequestList } from "@/app/portal/[workspaceSlug]/customization/CustomizationRequestList";
import { NewCustomizationForm } from "@/app/portal/[workspaceSlug]/customization/NewCustomizationForm";
import { PortalModuleShell } from "@/components/portal/PortalModuleShell";
import {
  AuthorizationError,
  requirePermission,
  roleLabel,
} from "@/lib/auth/guards";
import { hasPermission, PERMISSIONS } from "@/lib/auth/permissions";
import { listCustomizationRequestsForWorkspaceSlug } from "@/lib/customization/customization-mutations";
import portalStyle from "@/styles/portal.module.css";

interface CustomizationPageProps {
  params: Promise<{ workspaceSlug: string }>;
}

export default async function CustomizationPage({
  params,
}: CustomizationPageProps) {
  const { workspaceSlug } = await params;

  try {
    const { workspace, membership } = await requirePermission(
      workspaceSlug,
      PERMISSIONS.customizationView,
    );

    const rows = await listCustomizationRequestsForWorkspaceSlug(workspaceSlug);
    const canCreate = hasPermission(
      membership.role,
      PERMISSIONS.customizationCreate,
    );

    return (
      <PortalModuleShell
        title="Customization requests"
        description="Submit scoped customization work and track approvals before implementation."
        role={roleLabel(membership.role)}
        workspaceName={workspace.name}
      >
        <div className={portalStyle.contentStack}>
          {canCreate ? (
            <NewCustomizationForm workspaceSlug={workspaceSlug} />
          ) : null}
          <section>
            <h2 className={portalStyle.sectionTitleXs}>Requests</h2>
            <CustomizationRequestList
              workspaceSlug={workspaceSlug}
              rows={rows}
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
