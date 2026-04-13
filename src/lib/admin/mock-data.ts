import type {
  Activity,
  Client,
  Invoice,
  Lead,
  Milestone,
  MonthlyRevenue,
  Project,
} from "@/types/admin-dashboard";

export const mockClients: Client[] = [
  {
    id: "c1",
    name: "Jordan Lee",
    company: "Acme Corp",
    email: "jordan@acme.example",
    activeProjects: 2,
    totalBilled: 12400,
    status: "ACTIVE",
    lastContact: "2026-04-08",
    tags: ["retainer", "web"],
  },
  {
    id: "c2",
    name: "Sam Rivera",
    company: "Northwind Labs",
    email: "sam@northwind.example",
    activeProjects: 1,
    totalBilled: 8200,
    status: "ACTIVE",
    lastContact: "2026-04-05",
    tags: ["mobile"],
  },
  {
    id: "c3",
    name: "Taylor Kim",
    company: "Contoso",
    email: "taylor@contoso.example",
    activeProjects: 0,
    totalBilled: 2100,
    status: "ARCHIVED",
    lastContact: "2026-01-12",
    tags: [],
  },
];

export const mockProjects: Project[] = [
  {
    id: "p1",
    name: "Marketing site refresh",
    clientId: "c1",
    clientName: "Acme Corp",
    status: "IN_PROGRESS",
    startDate: "2026-03-01",
    deadline: "2026-04-20",
    budget: 9000,
    percentComplete: 62,
    priority: "HIGH",
  },
  {
    id: "p2",
    name: "Starter Site",
    clientId: "c1",
    clientName: "Acme Corp",
    status: "IN_REVIEW",
    startDate: "2026-02-10",
    deadline: "2026-04-14",
    budget: 4500,
    percentComplete: 90,
    priority: "MEDIUM",
  },
  {
    id: "p3",
    name: "API integration",
    clientId: "c2",
    clientName: "Northwind Labs",
    status: "PROPOSAL",
    startDate: "2026-04-01",
    deadline: "2026-05-01",
    budget: 12000,
    percentComplete: 15,
    priority: "HIGH",
  },
  {
    id: "p4",
    name: "Landing experiment",
    clientId: "c2",
    clientName: "Northwind Labs",
    status: "LEAD",
    startDate: "2026-04-10",
    deadline: "2026-04-28",
    budget: 2800,
    percentComplete: 5,
    priority: "LOW",
  },
  {
    id: "p5",
    name: "Maintenance window",
    clientId: "c1",
    clientName: "Acme Corp",
    status: "COMPLETED",
    startDate: "2026-01-05",
    deadline: "2026-03-30",
    budget: 1500,
    percentComplete: 100,
    priority: "LOW",
  },
];

export const mockInvoices: Invoice[] = [
  {
    id: "i1",
    number: "1042",
    clientId: "c1",
    clientName: "Acme Corp",
    amount: 3200,
    issueDate: "2026-03-28",
    dueDate: "2026-04-12",
    status: "PAID",
    taxPercent: 8,
    discount: 0,
    lineItems: [
      {
        id: "l1",
        description: "Sprint delivery — March",
        quantity: 1,
        rate: 3200,
      },
    ],
  },
  {
    id: "i2",
    number: "1043",
    clientId: "c2",
    clientName: "Northwind Labs",
    amount: 4100,
    issueDate: "2026-04-02",
    dueDate: "2026-04-16",
    status: "SENT",
    taxPercent: 8,
    discount: 100,
    lineItems: [
      {
        id: "l2",
        description: "Discovery workshop",
        quantity: 2,
        rate: 1500,
      },
      {
        id: "l3",
        description: "Wireframes",
        quantity: 1,
        rate: 1100,
      },
    ],
  },
  {
    id: "i3",
    number: "1044",
    clientId: "c1",
    clientName: "Acme Corp",
    amount: 1800,
    issueDate: "2026-02-15",
    dueDate: "2026-03-01",
    status: "OVERDUE",
    taxPercent: 8,
    discount: 0,
    lineItems: [
      {
        id: "l4",
        description: "Bugfix bundle",
        quantity: 6,
        rate: 300,
      },
    ],
  },
];

export const mockLeads: Lead[] = [
  {
    id: "lead1",
    name: "Alex Morgan",
    email: "alex@startup.example",
    phone: "555-0100",
    source: "WEBSITE",
    submittedAt: "2026-04-09",
    status: "NEW",
    estimatedValue: 15000,
    notes: "Interested in full rebuild.",
  },
  {
    id: "lead2",
    name: "Jamie Chen",
    email: "jamie@designco.example",
    source: "REFERRAL",
    submittedAt: "2026-04-07",
    status: "CONTACTED",
    estimatedValue: 6000,
  },
  {
    id: "lead3",
    name: "Riley Scott",
    email: "riley@saas.example",
    source: "LINKEDIN",
    submittedAt: "2026-04-01",
    status: "QUALIFIED",
    estimatedValue: 22000,
  },
];

export const mockActivities: Activity[] = [
  {
    id: "a1",
    type: "invoice",
    description: "Invoice #1042 marked paid by Acme Corp",
    timestamp: "2026-04-10T14:22:00Z",
    href: "/admin/invoices/i1",
  },
  {
    id: "a2",
    type: "lead",
    description: "New lead submitted via website — Alex Morgan",
    timestamp: "2026-04-09T18:05:00Z",
    href: "/admin/leads",
  },
  {
    id: "a3",
    type: "project",
    description: "Project “Starter Site” moved to In Review",
    timestamp: "2026-04-08T11:40:00Z",
    href: "/admin/projects/p2",
  },
];

export const mockMilestones: Milestone[] = [
  {
    id: "m1",
    projectId: "p2",
    projectName: "Starter Site",
    title: "Client UAT sign-off",
    dueDate: "2026-04-14",
  },
  {
    id: "m2",
    projectId: "p1",
    projectName: "Marketing site refresh",
    title: "Content freeze",
    dueDate: "2026-04-18",
  },
  {
    id: "m3",
    projectId: "p3",
    projectName: "API integration",
    title: "SOW approval",
    dueDate: "2026-04-22",
  },
];

export const mockMonthlyRevenue: MonthlyRevenue[] = [
  { month: "2025-11", revenue: 8200, invoiceCount: 4 },
  { month: "2025-12", revenue: 10100, invoiceCount: 5 },
  { month: "2026-01", revenue: 7600, invoiceCount: 3 },
  { month: "2026-02", revenue: 9300, invoiceCount: 4 },
  { month: "2026-03", revenue: 11200, invoiceCount: 5 },
  { month: "2026-04", revenue: 6400, invoiceCount: 3 },
];

export function getClientById(id: string): Client | undefined {
  return mockClients.find((c) => c.id === id);
}

export function getProjectById(id: string): Project | undefined {
  return mockProjects.find((p) => p.id === id);
}

export function getInvoiceById(id: string): Invoice | undefined {
  return mockInvoices.find((i) => i.id === id);
}

export function getLeadById(id: string): Lead | undefined {
  return mockLeads.find((l) => l.id === id);
}

export function getProjectsForClient(clientId: string): Project[] {
  return mockProjects.filter((p) => p.clientId === clientId);
}

export function getInvoicesForClient(clientId: string): Invoice[] {
  return mockInvoices.filter((i) => i.clientId === clientId);
}
