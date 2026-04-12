import type { CustomizationRequestStatus } from "@prisma/client";
import { recordActionEvent } from "@/lib/audit/events";
import { AuthorizationError, requirePermission } from "@/lib/auth/guards";
import { PERMISSIONS } from "@/lib/auth/permissions";
import { requireCurrentAppUser } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";

const TYPE_MAX = 80;

export async function listCustomizationRequestsForWorkspaceSlug(
  workspaceSlug: string,
) {
  const { workspace } = await requirePermission(
    workspaceSlug,
    PERMISSIONS.customizationView,
  );

  return prisma.customizationRequest.findMany({
    where: { workspaceId: workspace.id },
    orderBy: { updatedAt: "desc" },
    include: {
      createdBy: { select: { id: true, email: true, fullName: true } },
      approvedBy: { select: { id: true, email: true, fullName: true } },
    },
  });
}

export async function createCustomizationRequestForWorkspaceSlug(
  workspaceSlug: string,
  input: { type: string; specification: string },
) {
  const { workspace } = await requirePermission(
    workspaceSlug,
    PERMISSIONS.customizationCreate,
  );
  const user = await requireCurrentAppUser();
  const type = input.type.trim();
  const specification = input.specification.trim();
  if (!type || type.length > TYPE_MAX || !specification) {
    throw new Error("Type and specification are required");
  }

  const row = await prisma.customizationRequest.create({
    data: {
      workspaceId: workspace.id,
      createdById: user.id,
      type,
      specification,
    },
  });

  await recordActionEvent({
    workspaceId: workspace.id,
    action: "customization.request_created",
    targetType: "CustomizationRequest",
    targetId: row.id,
    actorId: user.id,
    metadata: { type: row.type },
  });

  return row;
}

export async function approveCustomizationRequestForWorkspaceSlug(
  workspaceSlug: string,
  requestId: string,
) {
  const { workspace } = await requirePermission(
    workspaceSlug,
    PERMISSIONS.customizationApprove,
  );
  const user = await requireCurrentAppUser();

  const row = await prisma.customizationRequest.findFirst({
    where: { id: requestId, workspaceId: workspace.id },
  });
  if (!row) {
    throw new AuthorizationError("Request not found");
  }

  const approvable: CustomizationRequestStatus[] = ["DRAFT", "QUOTED"];
  if (!approvable.includes(row.status)) {
    throw new Error("Request cannot be approved in its current status");
  }

  const updated = await prisma.customizationRequest.update({
    where: { id: row.id },
    data: {
      status: "APPROVED",
      approvedById: user.id,
    },
  });

  await recordActionEvent({
    workspaceId: workspace.id,
    action: "customization.request_approved",
    targetType: "CustomizationRequest",
    targetId: updated.id,
    actorId: user.id,
  });

  return updated;
}
