import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  AuthorizationError,
  getUserWorkspaces,
  requirePermission,
  requireWorkspaceAccess,
} from "@/lib/auth/guards";
import { PERMISSIONS } from "@/lib/auth/permissions";

const { mockFindMany, mockFindFirst } = vi.hoisted(() => ({
  mockFindMany: vi.fn(),
  mockFindFirst: vi.fn(),
}));

vi.mock("@/lib/prisma", () => ({
  prisma: {
    workspaceMember: {
      findMany: mockFindMany,
      findFirst: mockFindFirst,
    },
  },
}));

vi.mock("@/lib/auth/session", () => ({
  requireCurrentAppUser: vi.fn().mockResolvedValue({
    id: "user_1",
  }),
}));

describe("workspace guards", () => {
  beforeEach(() => {
    mockFindMany.mockReset();
    mockFindFirst.mockReset();
  });

  it("scopes workspace lookup by active membership", async () => {
    mockFindMany.mockResolvedValue([]);
    await getUserWorkspaces();

    expect(mockFindMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          userId: "user_1",
          workspace: {
            status: {
              not: "ARCHIVED",
            },
          },
        }),
      }),
    );
  });

  it("blocks cross-workspace tampering by slug", async () => {
    mockFindFirst.mockResolvedValue(null);

    await expect(
      requireWorkspaceAccess("other-workspace"),
    ).rejects.toBeInstanceOf(AuthorizationError);
  });

  it("blocks unauthorized role permissions", async () => {
    mockFindFirst.mockResolvedValue({
      id: "membership_1",
      role: "VIEWER",
      workspaceId: "workspace_1",
      userId: "user_1",
      createdAt: new Date(),
      updatedAt: new Date(),
      workspace: {
        id: "workspace_1",
        slug: "lic-main",
        name: "LIC Main",
        status: "ACTIVE",
        primaryDomain: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    await expect(
      requirePermission("lic-main", PERMISSIONS.customizationApprove),
    ).rejects.toBeInstanceOf(AuthorizationError);
  });
});
