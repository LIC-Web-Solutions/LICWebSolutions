import { beforeEach, describe, expect, it, vi } from "vitest";

const {
  mockRequirePermission,
  mockRequireWorkspaceAccess,
  mockRequireCurrentAppUser,
  mockFindMany,
  mockCreate,
  mockFindFirst,
  mockUpdate,
  mockRecordActionEvent,
} = vi.hoisted(() => ({
  mockRequirePermission: vi.fn(),
  mockRequireWorkspaceAccess: vi.fn(),
  mockRequireCurrentAppUser: vi.fn(),
  mockFindMany: vi.fn(),
  mockCreate: vi.fn(),
  mockFindFirst: vi.fn(),
  mockUpdate: vi.fn(),
  mockRecordActionEvent: vi.fn(),
}));

vi.mock("@/lib/auth/guards", () => ({
  AuthorizationError: class AuthorizationError extends Error {
    override name = "AuthorizationError";
  },
  requirePermission: (...args: unknown[]) => mockRequirePermission(...args),
  requireWorkspaceAccess: (...args: unknown[]) =>
    mockRequireWorkspaceAccess(...args),
  getUserWorkspaces: vi.fn(),
}));

vi.mock("@/lib/auth/session", () => ({
  requireCurrentAppUser: () => mockRequireCurrentAppUser(),
}));

vi.mock("@/lib/prisma", () => ({
  prisma: {
    ticket: {
      findMany: mockFindMany,
      create: mockCreate,
      findFirst: mockFindFirst,
      update: mockUpdate,
    },
  },
}));

vi.mock("@/lib/audit/events", () => ({
  recordActionEvent: (...args: unknown[]) => mockRecordActionEvent(...args),
}));

import { AuthorizationError } from "@/lib/auth/guards";
import { PERMISSIONS } from "@/lib/auth/permissions";
import {
  createTicketForWorkspaceSlug,
  listTicketsForWorkspaceSlug,
  updateTicketStatusForWorkspaceSlug,
} from "@/lib/tickets/ticket-mutations";

describe("ticket mutations", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockRequirePermission.mockResolvedValue({
      workspace: { id: "ws_1", slug: "demo", name: "Demo" },
      membership: { role: "MEMBER" },
    });
    mockRequireWorkspaceAccess.mockResolvedValue({
      workspace: { id: "ws_1", slug: "demo", name: "Demo" },
      membership: { role: "MEMBER" },
    });
    mockRequireCurrentAppUser.mockResolvedValue({ id: "u_1" });
  });

  it("lists tickets scoped by workspace from requirePermission", async () => {
    mockFindMany.mockResolvedValue([]);
    await listTicketsForWorkspaceSlug("demo");

    expect(mockRequirePermission).toHaveBeenCalledWith(
      "demo",
      PERMISSIONS.ticketsView,
    );
    expect(mockFindMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { workspaceId: "ws_1" },
      }),
    );
  });

  it("creates a ticket and records audit", async () => {
    mockCreate.mockResolvedValue({
      id: "t_1",
      workspaceId: "ws_1",
      title: "Hello",
    });

    await createTicketForWorkspaceSlug("demo", {
      title: "Hello",
      description: null,
      priority: "MEDIUM",
    });

    expect(mockCreate).toHaveBeenCalled();
    expect(mockRecordActionEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        workspaceId: "ws_1",
        action: "ticket.created",
        targetType: "Ticket",
        targetId: "t_1",
        actorId: "u_1",
      }),
    );
  });

  it("rejects empty titles", async () => {
    await expect(
      createTicketForWorkspaceSlug("demo", {
        title: "   ",
        description: null,
        priority: "LOW",
      }),
    ).rejects.toThrow("Invalid title");
  });

  it("blocks status updates when user lacks assign and is not creator", async () => {
    mockRequireCurrentAppUser.mockResolvedValueOnce({ id: "u_other" });
    mockFindFirst.mockResolvedValue({
      id: "t_1",
      workspaceId: "ws_1",
      createdById: "u_creator",
      status: "OPEN",
    });

    await expect(
      updateTicketStatusForWorkspaceSlug("demo", "t_1", "CLOSED"),
    ).rejects.toBeInstanceOf(AuthorizationError);
  });
});
