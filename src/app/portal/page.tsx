import Link from "next/link";
import { redirect } from "next/navigation";
import { getUserWorkspaces, roleLabel } from "@/lib/auth/guards";
import { cn } from "@/lib/utils";
import portalStyle from "@/styles/portal.module.css";

type WorkspaceListItem = {
  workspace: {
    id: string;
    slug: string;
    name: string;
  };
  role: Parameters<typeof roleLabel>[0];
};

export default async function PortalPage() {
  const memberships = await getUserWorkspaces();

  if (memberships.length === 0) {
    redirect("/portal/access-pending");
  }

  return (
    <main className={cn(portalStyle.pageFrame, portalStyle.mainShell)}>
      <h1 className={cn(portalStyle.h1Page, portalStyle.h1Medium)}>
        Choose a workspace
      </h1>
      <p className={portalStyle.lede}>
        Select the client workspace you want to work in. This is where you track
        delivery requests and project operations with LIC Web Solutions.
      </p>
      <p className={portalStyle.helperText}>
        Need a new workspace for a fresh project?{" "}
        <Link
          href="/portal/workspace-request"
          className={portalStyle.linkAccent}
        >
          Submit a workspace request
        </Link>
        .
      </p>
      <ul className={portalStyle.workspaceList}>
        {memberships.map(({ workspace, role }: WorkspaceListItem) => (
          <li key={workspace.id}>
            <Link
              href={`/portal/${workspace.slug}`}
              className={portalStyle.workspacePickerCard}
            >
              <div className={portalStyle.workspaceCardHeader}>
                <p className={portalStyle.workspaceName}>{workspace.name}</p>
                <span className={portalStyle.badgeRole}>{roleLabel(role)}</span>
              </div>
              <p className={portalStyle.workspacePath}>
                /portal/{workspace.slug}
              </p>
              <p className={portalStyle.workspaceAction}>Open workspace</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
