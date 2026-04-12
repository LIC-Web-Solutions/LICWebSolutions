import type { TicketPriority, TicketStatus } from "@prisma/client";
import { recordActionEvent } from "@/lib/audit/events";
import {
  AuthorizationError,
  requirePermission,
  requireWorkspaceAccess,
} from "@/lib/auth/guards";
import { hasPermission, PERMISSIONS } from "@/lib/auth/permissions";
import { requireCurrentAppUser } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";

const TITLE_MAX = 180;

export async function listTicketsForWorkspaceSlug(workspaceSlug: string) {
  const { workspace } = await requirePermission(
    workspaceSlug,
    PERMISSIONS.ticketsView,
  );

  return prisma.ticket.findMany({
    where: { workspaceId: workspace.id },
    orderBy: { createdAt: "desc" },
    include: {
      createdBy: { select: { id: true, email: true, fullName: true } },
      assignedTo: { select: { id: true, email: true, fullName: true } },
    },
  });
}

export async function createTicketForWorkspaceSlug(
  workspaceSlug: string,
  input: {
    title: string;
    description: string | null;
    priority: TicketPriority;
  },
) {
  const { workspace, membership } = await requirePermission(
    workspaceSlug,
    PERMISSIONS.ticketsCreate,
  );

  const user = await requireCurrentAppUser();
  const title = input.title.trim();
  if (!title || title.length > TITLE_MAX) {
    throw new Error("Invalid title");
  }

  const ticket = await prisma.ticket.create({
    data: {
      workspaceId: workspace.id,
      createdById: user.id,
      title,
      description: input.description?.trim() || null,
      priority: input.priority,
    },
  });

  await recordActionEvent({
    workspaceId: workspace.id,
    action: "ticket.created",
    targetType: "Ticket",
    targetId: ticket.id,
    actorId: user.id,
    metadata: { title: ticket.title },
  });

  return { ticket, membershipRole: membership.role };
}

export async function updateTicketStatusForWorkspaceSlug(
  workspaceSlug: string,
  ticketId: string,
  status: TicketStatus,
) {
  const { workspace, membership } = await requireWorkspaceAccess(workspaceSlug);
  const user = await requireCurrentAppUser();

  const ticket = await prisma.ticket.findFirst({
    where: { id: ticketId, workspaceId: workspace.id },
  });

  if (!ticket) {
    throw new AuthorizationError("Ticket not found");
  }

  const canAssign = hasPermission(membership.role, PERMISSIONS.ticketsAssign);
  const canEditOwn =
    hasPermission(membership.role, PERMISSIONS.ticketsCreate) &&
    ticket.createdById === user.id;

  if (!canAssign && !canEditOwn) {
    throw new AuthorizationError("Cannot update this ticket");
  }

  const updated = await prisma.ticket.update({
    where: { id: ticket.id },
    data: { status },
  });

  await recordActionEvent({
    workspaceId: workspace.id,
    action: "ticket.status_updated",
    targetType: "Ticket",
    targetId: updated.id,
    actorId: user.id,
    metadata: { status: updated.status },
  });

  return updated;
}
