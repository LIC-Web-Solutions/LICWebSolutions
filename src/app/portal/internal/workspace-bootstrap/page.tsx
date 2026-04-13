import { BootstrapWorkspaceForm } from "@/app/portal/internal/workspace-bootstrap/BootstrapWorkspaceForm";
import { requireInternalAdmin } from "@/lib/auth/internal-admin";

export default async function WorkspaceBootstrapPage() {
  await requireInternalAdmin();

  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="text-2xl font-semibold tracking-tight">
        Internal · workspace bootstrap
      </h1>
      <p className="mt-3 text-sm opacity-80">
        Creates a new workspace and adds you as <strong>OWNER</strong>. Only
        Clerk user ids listed in{" "}
        <code className="rounded bg-white/10 px-1 text-xs">
          INTERNAL_ADMIN_CLERK_IDS
        </code>{" "}
        can access this page. For local development only unless you lock this
        down further.
      </p>
      <div className="mt-8">
        <BootstrapWorkspaceForm />
      </div>
    </main>
  );
}
