import { recordActionEvent } from "@/lib/audit/events";
import { requirePermission } from "@/lib/auth/guards";
import { PERMISSIONS } from "@/lib/auth/permissions";
import { requireCurrentAppUser } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";

const ENDPOINT_MAX = 255;

export async function listMonitoringChecksForWorkspaceSlug(
  workspaceSlug: string,
) {
  const { workspace } = await requirePermission(
    workspaceSlug,
    PERMISSIONS.monitoringView,
  );

  return prisma.monitoringCheck.findMany({
    where: { workspaceId: workspace.id },
    orderBy: { checkedAt: "desc" },
    include: {
      project: { select: { id: true, name: true } },
    },
  });
}

export async function createMonitoringCheckForWorkspaceSlug(
  workspaceSlug: string,
  endpoint: string,
) {
  const { workspace } = await requirePermission(
    workspaceSlug,
    PERMISSIONS.monitoringManage,
  );
  const user = await requireCurrentAppUser();
  const url = endpoint.trim();
  if (!url || url.length > ENDPOINT_MAX) {
    throw new Error("Valid endpoint URL required");
  }

  const row = await prisma.monitoringCheck.create({
    data: {
      workspaceId: workspace.id,
      endpoint: url,
    },
  });

  await recordActionEvent({
    workspaceId: workspace.id,
    action: "monitoring.check_created",
    targetType: "MonitoringCheck",
    targetId: row.id,
    actorId: user.id,
    metadata: { endpoint: row.endpoint },
  });

  return row;
}
