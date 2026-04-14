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

function inferHostingProvider(repoUrl?: string | null) {
  if (!repoUrl) {
    return "Not connected";
  }
  const normalized = repoUrl.toLowerCase();
  if (normalized.includes("vercel")) {
    return "Vercel";
  }
  if (normalized.includes("netlify")) {
    return "Netlify";
  }
  if (normalized.includes("cloudflare")) {
    return "Cloudflare";
  }
  if (normalized.includes("github")) {
    return "GitHub deployment pipeline";
  }
  if (normalized.includes("gitlab")) {
    return "GitLab deployment pipeline";
  }
  return "Custom";
}

export default async function WorkspaceOverviewPage({
  params,
}: WorkspaceOverviewPageProps) {
  const { workspaceSlug } = await params;

  try {
    const { workspace, membership } =
      await requireWorkspaceAccess(workspaceSlug);

    const wid = workspace.id;
    const [openTickets, projects, members] = await Promise.all([
      prisma.ticket.count({
        where: { workspaceId: wid, status: { not: "CLOSED" } },
      }),
      prisma.project.findMany({
        where: { workspaceId: wid },
        orderBy: { createdAt: "desc" },
      }),
      prisma.workspaceMember.findMany({
        where: { workspaceId: wid },
        include: {
          user: {
            select: {
              email: true,
              fullName: true,
            },
          },
        },
      }),
    ]);

    const primaryProject = projects[0];
    const environments = Array.from(
      new Set(projects.map((project) => project.environment).filter(Boolean)),
    ) as string[];
    const contactEmails = Array.from(
      new Set(members.map((member) => member.user.email).filter(Boolean)),
    ) as string[];
    const hostingProvider = inferHostingProvider(primaryProject?.repoUrl);
    const emailProvider =
      contactEmails.length > 0 ? "Client-managed inboxes" : "Not connected";

    return (
      <PortalModuleShell
        title="Workspace dashboard"
        description="Centralize your project operations: delivery queue, hosting profile, domain details, and team contacts."
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
                Hosting provider
              </CardDescription>
              <CardTitle className={styles.statValue}>
                {hostingProvider}
              </CardTitle>
            </CardHeader>
            <CardContent className={styles.statContent}>
              <p className={portalStyle.helperText}>
                Based on your linked repository and deployment metadata.
              </p>
            </CardContent>
          </Card>
          <Card className={styles.statCard}>
            <CardHeader className={styles.statHeader}>
              <CardDescription className={styles.statDesc}>
                Primary domain
              </CardDescription>
              <CardTitle className={styles.statValue}>
                {workspace.primaryDomain || "Not set"}
              </CardTitle>
            </CardHeader>
            <CardContent className={styles.statContent}>
              <p className={portalStyle.helperText}>
                DNS and SSL are managed against this domain target.
              </p>
            </CardContent>
          </Card>
          <Card className={styles.statCard}>
            <CardHeader className={styles.statHeader}>
              <CardDescription className={styles.statDesc}>
                Email and contacts
              </CardDescription>
              <CardTitle className={styles.statValue}>
                {emailProvider}
              </CardTitle>
            </CardHeader>
            <CardContent className={styles.statContent}>
              <p className={portalStyle.helperText}>
                {contactEmails.length > 0
                  ? contactEmails.join(", ")
                  : "No member emails available yet."}
              </p>
            </CardContent>
          </Card>
        </div>
        <div className={styles.modulesGrid}>
          <Card className={styles.statCard}>
            <CardHeader className={styles.statHeader}>
              <CardDescription className={styles.statDesc}>
                Environments
              </CardDescription>
              <CardTitle className={styles.statValue}>
                {environments.length > 0
                  ? environments.join(", ")
                  : "Not tagged"}
              </CardTitle>
            </CardHeader>
            <CardContent className={styles.statContent}>
              <p className={portalStyle.helperText}>
                Set per project (`production`, `staging`, etc.) for clearer
                rollout visibility.
              </p>
            </CardContent>
          </Card>
          <Card className={styles.statCard}>
            <CardHeader className={styles.statHeader}>
              <CardDescription className={styles.statDesc}>
                Repositories
              </CardDescription>
              <CardTitle className={styles.statValue}>
                {projects.length === 0
                  ? "No projects yet"
                  : `${projects.length} linked`}
              </CardTitle>
            </CardHeader>
            <CardContent className={styles.statContent}>
              <p className={portalStyle.helperText}>
                {primaryProject?.repoUrl ||
                  "Add project repository URLs to show code ownership."}
              </p>
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
