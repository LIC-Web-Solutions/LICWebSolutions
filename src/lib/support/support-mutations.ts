import type { SupportThreadStatus } from "@prisma/client";
import { recordActionEvent } from "@/lib/audit/events";
import { AuthorizationError, requirePermission } from "@/lib/auth/guards";
import { PERMISSIONS } from "@/lib/auth/permissions";
import { requireCurrentAppUser } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";

const SUBJECT_MAX = 180;

export async function listSupportThreadsForWorkspaceSlug(
  workspaceSlug: string,
) {
  const { workspace } = await requirePermission(
    workspaceSlug,
    PERMISSIONS.supportView,
  );

  return prisma.supportThread.findMany({
    where: { workspaceId: workspace.id },
    orderBy: { updatedAt: "desc" },
    include: {
      createdBy: { select: { id: true, email: true, fullName: true } },
      messages: {
        orderBy: { createdAt: "asc" },
        include: {
          createdBy: { select: { id: true, email: true, fullName: true } },
        },
      },
    },
  });
}

export async function createSupportThreadForWorkspaceSlug(
  workspaceSlug: string,
  subject: string,
) {
  const { workspace } = await requirePermission(
    workspaceSlug,
    PERMISSIONS.supportCreate,
  );
  const user = await requireCurrentAppUser();
  const trimmed = subject.trim();
  if (!trimmed || trimmed.length > SUBJECT_MAX) {
    throw new Error("Invalid subject");
  }

  const thread = await prisma.supportThread.create({
    data: {
      workspaceId: workspace.id,
      createdById: user.id,
      subject: trimmed,
    },
  });

  await recordActionEvent({
    workspaceId: workspace.id,
    action: "support.thread_created",
    targetType: "SupportThread",
    targetId: thread.id,
    actorId: user.id,
    metadata: { subject: thread.subject },
  });

  return thread;
}

export async function addSupportMessageForWorkspaceSlug(
  workspaceSlug: string,
  threadId: string,
  body: string,
) {
  const { workspace } = await requirePermission(
    workspaceSlug,
    PERMISSIONS.supportCreate,
  );
  const user = await requireCurrentAppUser();
  const text = body.trim();
  if (!text) {
    throw new Error("Message cannot be empty");
  }

  const thread = await prisma.supportThread.findFirst({
    where: { id: threadId, workspaceId: workspace.id },
  });
  if (!thread) {
    throw new AuthorizationError("Thread not found");
  }

  const message = await prisma.supportMessage.create({
    data: {
      threadId: thread.id,
      workspaceId: workspace.id,
      createdById: user.id,
      body: text,
    },
  });

  await prisma.supportThread.update({
    where: { id: thread.id },
    data: { updatedAt: new Date() },
  });

  await recordActionEvent({
    workspaceId: workspace.id,
    action: "support.message_created",
    targetType: "SupportMessage",
    targetId: message.id,
    actorId: user.id,
  });

  return message;
}

export async function setSupportThreadStatusForWorkspaceSlug(
  workspaceSlug: string,
  threadId: string,
  status: SupportThreadStatus,
) {
  const { workspace } = await requirePermission(
    workspaceSlug,
    PERMISSIONS.supportResolve,
  );

  const thread = await prisma.supportThread.findFirst({
    where: { id: threadId, workspaceId: workspace.id },
  });
  if (!thread) {
    throw new AuthorizationError("Thread not found");
  }

  const updated = await prisma.supportThread.update({
    where: { id: thread.id },
    data: { status },
  });

  const user = await requireCurrentAppUser();
  await recordActionEvent({
    workspaceId: workspace.id,
    action: "support.thread_status_updated",
    targetType: "SupportThread",
    targetId: updated.id,
    actorId: user.id,
    metadata: { status: updated.status },
  });

  return updated;
}
