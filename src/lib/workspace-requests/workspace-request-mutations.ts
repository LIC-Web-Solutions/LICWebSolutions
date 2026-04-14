import { WorkspaceRequestStatus } from "@prisma/client";
import { assertInternalAdminOrThrow } from "@/lib/auth/internal-admin";
import { requireCurrentAppUser } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function normalizeInviteEmails(raw: string): string[] {
  if (!raw.trim()) {
    return [];
  }
  return Array.from(
    new Set(
      raw
        .split(/[,\n]/g)
        .map((token) => token.trim().toLowerCase())
        .filter(Boolean),
    ),
  );
}

function assertValidWorkspaceInput(name: string, slug: string) {
  if (!name || name.length > 120) {
    throw new Error("Workspace name is required (max 120 chars).");
  }
  if (!slug || slug.length > 80 || !SLUG_RE.test(slug)) {
    throw new Error(
      "Slug must use lowercase letters, numbers, and single hyphens.",
    );
  }
}

export async function createWorkspaceRequest(input: {
  proposedName: string;
  proposedSlug: string;
  inviteEmailsRaw: string;
}) {
  const user = await requireCurrentAppUser();
  const proposedName = input.proposedName.trim();
  const proposedSlug = input.proposedSlug.trim().toLowerCase();
  const inviteEmails = normalizeInviteEmails(input.inviteEmailsRaw);

  assertValidWorkspaceInput(proposedName, proposedSlug);

  const existingWorkspace = await prisma.workspace.findUnique({
    where: { slug: proposedSlug },
    select: { id: true },
  });
  if (existingWorkspace) {
    throw new Error("That workspace slug is already in use.");
  }

  const openRequest = await prisma.workspaceRequest.findFirst({
    where: {
      proposedSlug,
      status: { in: ["NEW", "IN_REVIEW"] },
    },
    select: { id: true },
  });
  if (openRequest) {
    throw new Error("A pending request already exists for this slug.");
  }

  return prisma.workspaceRequest.create({
    data: {
      requestedById: user.id,
      proposedName,
      proposedSlug,
      inviteEmailsCsv: inviteEmails.join(", "),
      invites: {
        create: inviteEmails.map((email) => ({ email })),
      },
    },
    include: {
      invites: true,
    },
  });
}

export async function listWorkspaceRequestsForCurrentUser() {
  const user = await requireCurrentAppUser();
  return prisma.workspaceRequest.findMany({
    where: { requestedById: user.id },
    include: {
      invites: true,
      reviewedBy: { select: { id: true, fullName: true, email: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function listWorkspaceRequestsForAdmin() {
  await assertInternalAdminOrThrow();
  return prisma.workspaceRequest.findMany({
    include: {
      requestedBy: { select: { id: true, fullName: true, email: true } },
      reviewedBy: { select: { id: true, fullName: true, email: true } },
      invites: true,
    },
    orderBy: [{ status: "asc" }, { createdAt: "desc" }],
  });
}

export async function approveWorkspaceRequest(
  requestId: string,
  adminNote?: string,
) {
  await assertInternalAdminOrThrow();
  const admin = await requireCurrentAppUser();

  const request = await prisma.workspaceRequest.findUnique({
    where: { id: requestId },
    include: { invites: true },
  });
  if (!request) {
    throw new Error("Workspace request not found.");
  }
  if (request.status === WorkspaceRequestStatus.APPROVED) {
    throw new Error("Workspace request is already approved.");
  }
  if (request.status === WorkspaceRequestStatus.REJECTED) {
    throw new Error("Rejected requests cannot be approved.");
  }

  const existingWorkspace = await prisma.workspace.findUnique({
    where: { slug: request.proposedSlug },
    select: { id: true },
  });
  if (existingWorkspace) {
    throw new Error("A workspace with this slug already exists.");
  }

  const invitedEmails = request.invites.map((invite) => invite.email);
  const invitedUsers = invitedEmails.length
    ? await prisma.user.findMany({
        where: { email: { in: invitedEmails } },
        select: { id: true, email: true },
      })
    : [];
  const invitedUserIds = Array.from(new Set(invitedUsers.map((u) => u.id)));

  return prisma.$transaction(async (tx) => {
    const workspace = await tx.workspace.create({
      data: {
        name: request.proposedName,
        slug: request.proposedSlug,
      },
    });

    await tx.workspaceMember.create({
      data: {
        workspaceId: workspace.id,
        userId: request.requestedById,
        role: "OWNER",
      },
    });

    if (invitedUserIds.length > 0) {
      await tx.workspaceMember.createMany({
        data: invitedUserIds.map((userId) => ({
          workspaceId: workspace.id,
          userId,
          role: "MEMBER",
        })),
        skipDuplicates: true,
      });

      for (const user of invitedUsers) {
        if (!user.email) {
          continue;
        }
        await tx.workspaceRequestInvite.updateMany({
          where: { requestId: request.id, email: user.email },
          data: { invitedUserId: user.id },
        });
      }
    }

    return tx.workspaceRequest.update({
      where: { id: request.id },
      data: {
        status: WorkspaceRequestStatus.APPROVED,
        reviewedById: admin.id,
        adminNote: adminNote?.trim() || null,
        approvedWorkspaceId: workspace.id,
      },
      include: {
        requestedBy: { select: { id: true, fullName: true, email: true } },
        invites: true,
      },
    });
  });
}

export async function rejectWorkspaceRequest(
  requestId: string,
  adminNote?: string,
) {
  await assertInternalAdminOrThrow();
  const admin = await requireCurrentAppUser();
  const request = await prisma.workspaceRequest.findUnique({
    where: { id: requestId },
    select: { id: true, status: true },
  });
  if (!request) {
    throw new Error("Workspace request not found.");
  }
  if (request.status === WorkspaceRequestStatus.APPROVED) {
    throw new Error("Approved requests cannot be rejected.");
  }

  return prisma.workspaceRequest.update({
    where: { id: request.id },
    data: {
      status: WorkspaceRequestStatus.REJECTED,
      reviewedById: admin.id,
      adminNote: adminNote?.trim() || null,
    },
  });
}
