import type { WorkspaceRole } from "@prisma/client";

export const PERMISSIONS = {
  ticketsView: "tickets:view",
  ticketsCreate: "tickets:create",
  ticketsAssign: "tickets:assign",
  supportView: "support:view",
  supportCreate: "support:create",
  supportResolve: "support:resolve",
  customizationView: "customization:view",
  customizationCreate: "customization:create",
  customizationApprove: "customization:approve",
  monitoringView: "monitoring:view",
  monitoringManage: "monitoring:manage",
  membersManage: "members:manage",
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

const ROLE_PERMISSIONS: Record<WorkspaceRole, Set<Permission>> = {
  OWNER: new Set(Object.values(PERMISSIONS)),
  ADMIN: new Set(Object.values(PERMISSIONS)),
  MEMBER: new Set([
    PERMISSIONS.ticketsView,
    PERMISSIONS.ticketsCreate,
    PERMISSIONS.supportView,
    PERMISSIONS.supportCreate,
    PERMISSIONS.customizationView,
    PERMISSIONS.customizationCreate,
    PERMISSIONS.monitoringView,
  ]),
  VIEWER: new Set([
    PERMISSIONS.ticketsView,
    PERMISSIONS.supportView,
    PERMISSIONS.customizationView,
    PERMISSIONS.monitoringView,
  ]),
};

export function hasPermission(role: WorkspaceRole, permission: Permission) {
  return ROLE_PERMISSIONS[role]?.has(permission) ?? false;
}
