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
import portalStyle from "@/styles/portal.module.css";
import styles from "./WorkspaceOverviewPage.module.css";

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
        where: { workspaceId: wid, status: { not: "CLOSED" } },
      }),
      prisma.supportThread.count({
        where: {
          workspaceId: wid,
          status: { not: "RESOLVED" },
        },
      }),
      prisma.customizationRequest.count({
        where: {
          workspaceId: wid,
          status: {
            in: ["DRAFT", "QUOTED", "APPROVED", "IN_PROGRESS"],
          },
        },
      }),
      prisma.monitoringCheck.count({ where: { workspaceId: wid } }),
    ]);

    return (
      <PortalModuleShell
        title="Workspace dashboard"
        description="Centralize everything for this project workspace: track requests, ask for support, review scoped changes, and monitor service health."
        role={roleLabel(membership.role)}
        workspaceName={workspace.name}
      >
        <div className={styles.statsGrid}>
          <Card className={styles.statCard}>
            <CardHeader className={styles.statHeader}>
              <CardDescription className={styles.statDesc}>
                Open tickets
              </CardDescription>
              <CardTitle className={styles.statValue}>{openTickets}</CardTitle>
            </CardHeader>
            <CardContent className={styles.statContent}>
              <Link
                href={`/portal/${workspace.slug}/tickets`}
                className={portalStyle.linkAccent}
              >
                Review ticket queue →
              </Link>
            </CardContent>
          </Card>
          <Card className={styles.statCard}>
            <CardHeader className={styles.statHeader}>
              <CardDescription className={styles.statDesc}>
                Open support threads
              </CardDescription>
              <CardTitle className={styles.statValue}>
                {openSupportThreads}
              </CardTitle>
            </CardHeader>
            <CardContent className={styles.statContent}>
              <Link
                href={`/portal/${workspace.slug}/support`}
                className={portalStyle.linkAccent}
              >
                Open support conversations →
              </Link>
            </CardContent>
          </Card>
          <Card className={styles.statCard}>
            <CardHeader className={styles.statHeader}>
              <CardDescription className={styles.statDesc}>
                Active customizations
              </CardDescription>
              <CardTitle className={styles.statValue}>
                {activeCustomizations}
              </CardTitle>
            </CardHeader>
            <CardContent className={styles.statContent}>
              <Link
                href={`/portal/${workspace.slug}/customization`}
                className={portalStyle.linkAccent}
              >
                Track change requests →
              </Link>
            </CardContent>
          </Card>
          <Card className={styles.statCard}>
            <CardHeader className={styles.statHeader}>
              <CardDescription className={styles.statDesc}>
                Monitoring checks
              </CardDescription>
              <CardTitle className={styles.statValue}>
                {monitoringChecks}
              </CardTitle>
            </CardHeader>
            <CardContent className={styles.statContent}>
              <Link
                href={`/portal/${workspace.slug}/monitoring`}
                className={portalStyle.linkAccent}
              >
                View live status checks →
              </Link>
            </CardContent>
          </Card>
        </div>
        <div className={styles.modulesGrid}>
          {MODULE_CARDS.map((module) => (
            <Link
              key={module.path}
              href={`/portal/${workspace.slug}/${module.path}`}
              className={portalStyle.moduleCard}
            >
              <h2 className={styles.moduleTitle}>{module.label}</h2>
              <p className={styles.moduleText}>{module.description}</p>
              <p className={styles.moduleAction}>Open {module.label}</p>
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
