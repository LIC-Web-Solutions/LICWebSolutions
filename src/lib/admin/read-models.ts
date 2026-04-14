import type {
  CustomizationRequestStatus,
  WorkspaceRequestStatus,
} from "@prisma/client";
import { prisma } from "@/lib/prisma";
import type {
  Invoice,
  Lead,
  LeadStatus,
  Project,
} from "@/types/admin-dashboard";

function toDateOnly(date: Date) {
  return date.toISOString().slice(0, 10);
}

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

export function parseCurrencyAmount(input?: string | null): number {
  if (!input) {
    return 0;
  }
  const match = input.replace(/,/g, "").match(/-?\d+(\.\d+)?/);
  if (!match) {
    return 0;
  }
  const value = Number(match[0]);
  return Number.isFinite(value) ? value : 0;
}

function invoiceStatusFromCustomization(
  status: CustomizationRequestStatus,
): Invoice["status"] {
  switch (status) {
    case "DRAFT":
      return "DRAFT";
    case "QUOTED":
    case "APPROVED":
    case "IN_PROGRESS":
      return "SENT";
    case "REJECTED":
      return "DRAFT";
    case "DELIVERED":
      return "PAID";
    default:
      return "DRAFT";
  }
}

export async function listAdminInvoices(): Promise<Invoice[]> {
  const rows = await prisma.customizationRequest.findMany({
    include: {
      workspace: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return rows.map((row, index) => ({
    id: row.id,
    number: `CR-${String(index + 1).padStart(4, "0")}`,
    clientId: row.workspaceId,
    clientName: row.workspace.name,
    amount: parseCurrencyAmount(row.estimate),
    issueDate: toDateOnly(row.createdAt),
    dueDate: toDateOnly(addDays(row.createdAt, 14)),
    status: invoiceStatusFromCustomization(row.status),
    lineItems: [
      {
        id: `${row.id}-line`,
        description: row.type,
        quantity: 1,
        rate: parseCurrencyAmount(row.estimate),
      },
    ],
    taxPercent: 0,
    discount: 0,
    notes: row.specification,
  }));
}

export async function getAdminInvoiceById(id: string): Promise<Invoice | null> {
  const row = await prisma.customizationRequest.findUnique({
    where: { id },
    include: {
      workspace: true,
    },
  });
  if (!row) {
    return null;
  }
  const amount = parseCurrencyAmount(row.estimate);
  return {
    id: row.id,
    number: `CR-${row.id.slice(-6).toUpperCase()}`,
    clientId: row.workspaceId,
    clientName: row.workspace.name,
    amount,
    issueDate: toDateOnly(row.createdAt),
    dueDate: toDateOnly(addDays(row.createdAt, 14)),
    status: invoiceStatusFromCustomization(row.status),
    lineItems: [
      {
        id: `${row.id}-line`,
        description: row.type,
        quantity: 1,
        rate: amount,
      },
    ],
    taxPercent: 0,
    discount: 0,
    notes: row.specification,
  };
}

function priorityFromTicketStatus(
  statuses: Array<"OPEN" | "IN_PROGRESS" | "BLOCKED" | "CLOSED">,
): Project["priority"] {
  if (statuses.includes("BLOCKED")) {
    return "HIGH";
  }
  if (statuses.includes("IN_PROGRESS")) {
    return "MEDIUM";
  }
  return "LOW";
}

function statusFromCompletion(
  completion: number,
  ticketCount: number,
): Project["status"] {
  if (ticketCount === 0) {
    return "PROPOSAL";
  }
  if (completion >= 100) {
    return "COMPLETED";
  }
  if (completion >= 80) {
    return "IN_REVIEW";
  }
  return "IN_PROGRESS";
}

export async function listAdminProjects(): Promise<Project[]> {
  const rows = await prisma.project.findMany({
    include: {
      workspace: true,
      tickets: true,
      customizationRequests: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return rows.map((row) => {
    const closedCount = row.tickets.filter(
      (ticket) => ticket.status === "CLOSED",
    ).length;
    const totalCount = row.tickets.length;
    const completion =
      totalCount > 0 ? Math.round((closedCount / totalCount) * 100) : 0;
    const budget = row.customizationRequests.reduce(
      (sum, request) => sum + parseCurrencyAmount(request.estimate),
      0,
    );
    const deadlineBase =
      row.updatedAt > row.createdAt ? row.updatedAt : row.createdAt;
    return {
      id: row.id,
      name: row.name,
      clientId: row.workspaceId,
      clientName: row.workspace.name,
      status: statusFromCompletion(completion, totalCount),
      startDate: toDateOnly(row.createdAt),
      deadline: toDateOnly(addDays(deadlineBase, 21)),
      budget,
      percentComplete: completion,
      priority: priorityFromTicketStatus(
        row.tickets.map((ticket) => ticket.status),
      ),
    };
  });
}

export async function getAdminProjectById(id: string): Promise<Project | null> {
  const row = await prisma.project.findUnique({
    where: { id },
    include: {
      workspace: true,
      tickets: true,
      customizationRequests: true,
    },
  });
  if (!row) {
    return null;
  }
  const closedCount = row.tickets.filter(
    (ticket) => ticket.status === "CLOSED",
  ).length;
  const totalCount = row.tickets.length;
  const completion =
    totalCount > 0 ? Math.round((closedCount / totalCount) * 100) : 0;
  const budget = row.customizationRequests.reduce(
    (sum, request) => sum + parseCurrencyAmount(request.estimate),
    0,
  );
  return {
    id: row.id,
    name: row.name,
    clientId: row.workspaceId,
    clientName: row.workspace.name,
    status: statusFromCompletion(completion, totalCount),
    startDate: toDateOnly(row.createdAt),
    deadline: toDateOnly(addDays(row.updatedAt, 21)),
    budget,
    percentComplete: completion,
    priority: priorityFromTicketStatus(
      row.tickets.map((ticket) => ticket.status),
    ),
  };
}

function leadStatusFromWorkspaceRequest(
  status: WorkspaceRequestStatus,
): LeadStatus {
  switch (status) {
    case "NEW":
      return "NEW";
    case "IN_REVIEW":
      return "CONTACTED";
    case "APPROVED":
      return "CONVERTED";
    case "REJECTED":
      return "LOST";
    default:
      return "NEW";
  }
}

export async function listAdminLeads(): Promise<Lead[]> {
  const rows = await prisma.workspaceRequest.findMany({
    include: {
      requestedBy: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return rows.map((row) => ({
    id: row.id,
    name: row.proposedName,
    email: row.requestedBy.email ?? "unknown@unknown.local",
    source: "WEBSITE",
    submittedAt: toDateOnly(row.createdAt),
    status: leadStatusFromWorkspaceRequest(row.status),
    estimatedValue: 0,
    notes: row.adminNote ?? undefined,
  }));
}
