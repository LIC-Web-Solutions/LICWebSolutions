import type { Workspace, WorkspaceMember, WorkspaceRole } from "@prisma/client";
import { hasPermission, type Permission } from "@/lib/auth/permissions";
import { requireCurrentAppUser } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";

export class AuthorizationError extends Error {
  constructor(message = "User is not authorized to perform this action") {
    super(message);
    this.name = "AuthorizationError";
  }
}

export interface WorkspaceAccessContext {
  workspace: Workspace;
  membership: WorkspaceMember;
}

export async function getUserWorkspaces() {
  const user = await requireCurrentAppUser();

  const memberships = await prisma.workspaceMember.findMany({
    where: {
      userId: user.id,
      workspace: {
        status: {
          not: "ARCHIVED",
        },
      },
    },
    include: {
      workspace: true,
    },
    orderBy: {
      workspace: {
        name: "asc",
      },
    },
  });

  return memberships;
}

export async function requireWorkspaceAccess(
  workspaceSlug: string,
): Promise<WorkspaceAccessContext> {
  const user = await requireCurrentAppUser();

  const membership = await prisma.workspaceMember.findFirst({
    where: {
      userId: user.id,
      workspace: {
        slug: workspaceSlug,
        status: {
          not: "ARCHIVED",
        },
      },
    },
    include: {
      workspace: true,
    },
  });

  if (!membership) {
    throw new AuthorizationError("No access to this workspace");
  }

  return {
    workspace: membership.workspace,
    membership,
  };
}

export async function requirePermission(
  workspaceSlug: string,
  permission: Permission,
): Promise<WorkspaceAccessContext> {
  const context = await requireWorkspaceAccess(workspaceSlug);

  if (!hasPermission(context.membership.role, permission)) {
    throw new AuthorizationError(`Missing permission: ${permission}`);
  }

  return context;
}

export function roleLabel(role: WorkspaceRole) {
  return role.charAt(0) + role.slice(1).toLowerCase();
}
