import Link from "next/link";
import { redirect } from "next/navigation";
import { PortalModuleShell } from "@/components/portal/PortalModuleShell";
import {
  AuthorizationError,
  requireWorkspaceAccess,
  roleLabel,
} from "@/lib/auth/guards";

interface WorkspaceOverviewPageProps {
  params: Promise<{ workspaceSlug: string }>;
}

const modules = [
  {
    title: "Tickets",
    description:
      "Track requests, bugs, and delivery status for your applications.",
    hrefSuffix: "tickets",
  },
  {
    title: "Support",
    description:
      "Open support threads and keep implementation context in one place.",
    hrefSuffix: "support",
  },
  {
    title: "Customization",
    description:
      "Submit and review scoped change requests with approval milestones.",
    hrefSuffix: "customization",
  },
  {
    title: "Monitoring",
    description:
      "View uptime checks and incident updates for your managed properties.",
    hrefSuffix: "monitoring",
  },
];

export default async function WorkspaceOverviewPage({
  params,
}: WorkspaceOverviewPageProps) {
  const { workspaceSlug } = await params;

  try {
    const { workspace, membership } =
      await requireWorkspaceAccess(workspaceSlug);

    return (
      <PortalModuleShell
        title="Workspace dashboard"
        description="Use the modules below to manage delivery workflows and operational support."
        role={roleLabel(membership.role)}
        workspaceName={workspace.name}
      >
        <div className="grid gap-4 md:grid-cols-2">
          {modules.map((module) => (
            <Link
              key={module.title}
              href={`/portal/${workspace.slug}/${module.hrefSuffix}`}
              className="rounded-lg border border-white/10 bg-white/[0.03] p-5 transition hover:bg-white/[0.08]"
            >
              <h2 className="text-lg font-semibold">{module.title}</h2>
              <p className="mt-2 text-sm opacity-80">{module.description}</p>
            </Link>
          ))}
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
