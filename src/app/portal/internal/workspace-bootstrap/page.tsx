import { BootstrapWorkspaceForm } from "@/app/portal/internal/workspace-bootstrap/BootstrapWorkspaceForm";
import { requireInternalAdmin } from "@/lib/auth/internal-admin";
import { cn } from "@/lib/utils";
import portalStyle from "@/styles/portal.module.css";

export default async function WorkspaceBootstrapPage() {
  await requireInternalAdmin();

  return (
    <main className={cn(portalStyle.narrowFrame, portalStyle.mainShell)}>
      <h1 className={cn(portalStyle.h1Page, portalStyle.h1Compact)}>
        Internal · workspace bootstrap
      </h1>
      <p className={portalStyle.proseBlock}>
        Creates a new workspace and adds you as{" "}
        <strong className={portalStyle.proseStrong}>OWNER</strong>. Only Clerk
        user ids listed in{" "}
        <code className={portalStyle.codeInline}>INTERNAL_ADMIN_CLERK_IDS</code>{" "}
        can access this page. For local development only unless you lock this
        down further.
      </p>
      <div className={portalStyle.sectionBoundary}>
        <BootstrapWorkspaceForm />
      </div>
    </main>
  );
}
