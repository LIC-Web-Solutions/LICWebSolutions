import {
  CustomizationRequestStatus,
  SupportThreadStatus,
  TicketStatus,
} from "@prisma/client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { PortalModuleShell } from "@/components/portal/PortalModuleShell";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AuthorizationError,
  requireWorkspaceAccess,
  roleLabel,
} from "@/lib/auth/guards";
import { PORTAL_WORKSPACE_SECTIONS } from "@/lib/portal/nav";
import { prisma } from "@/lib/prisma";

interface WorkspaceOverviewPageProps {
  params: Promise<{ workspaceSlug: string }>;
}

const MODULE_CARDS = PORTAL_WORKSPACE_SECTIONS.filter((s) => s.path !== "");

export default async function WorkspaceOverviewPage({
  params,
}: WorkspaceOverviewPageProps) {
  const { workspaceSlug } = await params;

  try {
    const { workspace, membership } =
      await requireWorkspaceAccess(workspaceSlug);

    const wid = workspace.id;
    const [
      openTickets,
      openSupportThreads,
      activeCustomizations,
      monitoringChecks,
    ] = await Promise.all([
      prisma.ticket.count({
        where: { workspaceId: wid, status: { not: TicketStatus.CLOSED } },
      }),
      prisma.supportThread.count({
        where: {
          workspaceId: wid,
          status: { not: SupportThreadStatus.RESOLVED },
        },
      }),
      prisma.customizationRequest.count({
        where: {
          workspaceId: wid,
          status: {
            in: [
              CustomizationRequestStatus.DRAFT,
              CustomizationRequestStatus.QUOTED,
              CustomizationRequestStatus.APPROVED,
              CustomizationRequestStatus.IN_PROGRESS,
            ],
          },
        },
      }),
      prisma.monitoringCheck.count({ where: { workspaceId: wid } }),
    ]);

    return (
      <PortalModuleShell
        title="Workspace dashboard"
        description="Use the modules below to manage delivery workflows and operational support."
        role={roleLabel(membership.role)}
        workspaceName={workspace.name}
      >
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Open tickets</CardDescription>
              <CardTitle className="text-2xl tabular-nums">
                {openTickets}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-zinc-500">Excludes closed</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Open support threads</CardDescription>
              <CardTitle className="text-2xl tabular-nums">
                {openSupportThreads}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-zinc-500">Excludes resolved</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Active customizations</CardDescription>
              <CardTitle className="text-2xl tabular-nums">
                {activeCustomizations}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-zinc-500">Draft through in progress</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Monitoring checks</CardDescription>
              <CardTitle className="text-2xl tabular-nums">
                {monitoringChecks}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-zinc-500">Total endpoints tracked</p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {MODULE_CARDS.map((module) => (
            <Link
              key={module.path}
              href={`/portal/${workspace.slug}/${module.path}`}
              className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 transition hover:border-zinc-600 hover:bg-zinc-900/70"
            >
              <h2 className="text-lg font-semibold text-zinc-50">
                {module.label}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                {module.description}
              </p>
              <p className="mt-4 font-mono text-xs text-zinc-500">
                /portal/…/{module.path}
              </p>
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
