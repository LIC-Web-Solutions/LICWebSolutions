import { beforeEach, describe, expect, it, vi } from "vitest";

const {
  mockAssertInternalAdminOrThrow,
  mockRequireCurrentAppUser,
  mockWorkspaceFindUnique,
  mockWorkspaceRequestFindFirst,
  mockWorkspaceRequestCreate,
  mockWorkspaceRequestFindUnique,
  mockWorkspaceRequestFindMany,
  mockWorkspaceRequestUpdate,
  mockUserFindMany,
  mockTransaction,
  txWorkspaceCreate,
  txWorkspaceMemberCreate,
  txWorkspaceMemberCreateMany,
  txWorkspaceRequestInviteUpdateMany,
  txWorkspaceRequestUpdate,
} = vi.hoisted(() => ({
  mockAssertInternalAdminOrThrow: vi.fn(),
  mockRequireCurrentAppUser: vi.fn(),
  mockWorkspaceFindUnique: vi.fn(),
  mockWorkspaceRequestFindFirst: vi.fn(),
  mockWorkspaceRequestCreate: vi.fn(),
  mockWorkspaceRequestFindUnique: vi.fn(),
  mockWorkspaceRequestFindMany: vi.fn(),
  mockWorkspaceRequestUpdate: vi.fn(),
  mockUserFindMany: vi.fn(),
  txWorkspaceCreate: vi.fn(),
  txWorkspaceMemberCreate: vi.fn(),
  txWorkspaceMemberCreateMany: vi.fn(),
  txWorkspaceRequestInviteUpdateMany: vi.fn(),
  txWorkspaceRequestUpdate: vi.fn(),
  mockTransaction: vi.fn(),
}));

vi.mock("@/lib/auth/internal-admin", () => ({
  assertInternalAdminOrThrow: (...args: unknown[]) =>
    mockAssertInternalAdminOrThrow(...args),
}));

vi.mock("@/lib/auth/session", () => ({
  requireCurrentAppUser: (...args: unknown[]) =>
    mockRequireCurrentAppUser(...args),
}));

vi.mock("@/lib/prisma", () => ({
  prisma: {
    workspace: {
      findUnique: (...args: unknown[]) => mockWorkspaceFindUnique(...args),
    },
    workspaceRequest: {
      findFirst: (...args: unknown[]) => mockWorkspaceRequestFindFirst(...args),
      create: (...args: unknown[]) => mockWorkspaceRequestCreate(...args),
      findUnique: (...args: unknown[]) =>
        mockWorkspaceRequestFindUnique(...args),
      findMany: (...args: unknown[]) => mockWorkspaceRequestFindMany(...args),
      update: (...args: unknown[]) => mockWorkspaceRequestUpdate(...args),
    },
    user: {
      findMany: (...args: unknown[]) => mockUserFindMany(...args),
    },
    $transaction: (...args: unknown[]) => mockTransaction(...args),
  },
}));

import {
  approveWorkspaceRequest,
  createWorkspaceRequest,
  rejectWorkspaceRequest,
} from "@/lib/workspace-requests/workspace-request-mutations";

describe("workspace request mutations", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockRequireCurrentAppUser.mockResolvedValue({ id: "u_admin" });
    mockWorkspaceFindUnique.mockResolvedValue(null);
    mockWorkspaceRequestFindFirst.mockResolvedValue(null);
    mockAssertInternalAdminOrThrow.mockResolvedValue("clerk_admin");
    mockUserFindMany.mockResolvedValue([]);

    mockTransaction.mockImplementation(
      async (callback: (tx: unknown) => Promise<unknown>) =>
        callback({
          workspace: { create: txWorkspaceCreate },
          workspaceMember: {
            create: txWorkspaceMemberCreate,
            createMany: txWorkspaceMemberCreateMany,
          },
          workspaceRequestInvite: {
            updateMany: txWorkspaceRequestInviteUpdateMany,
          },
          workspaceRequest: { update: txWorkspaceRequestUpdate },
        }),
    );
  });

  it("creates request with normalized, deduplicated invite emails", async () => {
    mockRequireCurrentAppUser.mockResolvedValueOnce({ id: "u_client" });
    mockWorkspaceRequestCreate.mockResolvedValue({ id: "wr_1" });

    await createWorkspaceRequest({
      proposedName: "  Acme Build  ",
      proposedSlug: "  ACME-BUILD ",
      inviteEmailsRaw: "A@acme.com,\n a@acme.com, b@acme.com",
    });

    expect(mockWorkspaceRequestCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          requestedById: "u_client",
          proposedName: "Acme Build",
          proposedSlug: "acme-build",
          inviteEmailsCsv: "a@acme.com, b@acme.com",
          invites: {
            create: [{ email: "a@acme.com" }, { email: "b@acme.com" }],
          },
        }),
      }),
    );
  });

  it("blocks create when open request already exists", async () => {
    mockWorkspaceRequestFindFirst.mockResolvedValueOnce({ id: "wr_existing" });

    await expect(
      createWorkspaceRequest({
        proposedName: "Acme Build",
        proposedSlug: "acme-build",
        inviteEmailsRaw: "",
      }),
    ).rejects.toThrow("pending request");
  });

  it("approves request and provisions workspace memberships", async () => {
    mockRequireCurrentAppUser.mockResolvedValueOnce({ id: "u_admin" });
    mockWorkspaceRequestFindUnique.mockResolvedValueOnce({
      id: "wr_1",
      status: "NEW",
      proposedName: "Acme Build",
      proposedSlug: "acme-build",
      requestedById: "u_client",
      invites: [{ email: "teammate@acme.com" }],
    });
    mockUserFindMany.mockResolvedValueOnce([
      { id: "u_teammate", email: "teammate@acme.com" },
    ]);
    txWorkspaceCreate.mockResolvedValueOnce({ id: "ws_1" });
    txWorkspaceRequestUpdate.mockResolvedValueOnce({
      id: "wr_1",
      status: "APPROVED",
    });

    await approveWorkspaceRequest("wr_1", "Looks good");

    expect(txWorkspaceCreate).toHaveBeenCalledWith({
      data: { name: "Acme Build", slug: "acme-build" },
    });
    expect(txWorkspaceMemberCreate).toHaveBeenCalledWith({
      data: { workspaceId: "ws_1", userId: "u_client", role: "OWNER" },
    });
    expect(txWorkspaceMemberCreateMany).toHaveBeenCalledWith(
      expect.objectContaining({
        data: [{ workspaceId: "ws_1", userId: "u_teammate", role: "MEMBER" }],
        skipDuplicates: true,
      }),
    );
    expect(txWorkspaceRequestUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: "wr_1" },
        data: expect.objectContaining({
          status: "APPROVED",
          reviewedById: "u_admin",
          approvedWorkspaceId: "ws_1",
        }),
      }),
    );
  });

  it("rejects approved requests from being rejected again", async () => {
    mockWorkspaceRequestFindUnique.mockResolvedValueOnce({
      id: "wr_approved",
      status: "APPROVED",
    });

    await expect(rejectWorkspaceRequest("wr_approved")).rejects.toThrow(
      "Approved requests cannot be rejected.",
    );
  });
});
