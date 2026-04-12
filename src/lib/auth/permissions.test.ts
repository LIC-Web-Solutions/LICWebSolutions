import { describe, expect, it } from "vitest";
import { hasPermission, PERMISSIONS } from "@/lib/auth/permissions";

describe("permission matrix", () => {
  it("allows owners to manage members", () => {
    expect(hasPermission("OWNER", PERMISSIONS.membersManage)).toBe(true);
  });

  it("blocks viewers from creating tickets", () => {
    expect(hasPermission("VIEWER", PERMISSIONS.ticketsCreate)).toBe(false);
  });

  it("allows viewers to read tickets", () => {
    expect(hasPermission("VIEWER", PERMISSIONS.ticketsView)).toBe(true);
  });

  it("blocks viewers from managing monitoring checks", () => {
    expect(hasPermission("VIEWER", PERMISSIONS.monitoringManage)).toBe(false);
  });

  it("allows members to create support threads", () => {
    expect(hasPermission("MEMBER", PERMISSIONS.supportCreate)).toBe(true);
  });
});
