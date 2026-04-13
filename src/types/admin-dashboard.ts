export type ClientStatus = "ACTIVE" | "ARCHIVED";

export type ProjectStatus =
  | "LEAD"
  | "PROPOSAL"
  | "IN_PROGRESS"
  | "IN_REVIEW"
  | "COMPLETED"
  | "ARCHIVED";

export type InvoiceStatus = "DRAFT" | "SENT" | "PAID" | "OVERDUE";

export type LeadStatus =
  | "NEW"
  | "CONTACTED"
  | "QUALIFIED"
  | "CONVERTED"
  | "LOST";

export type LeadSource = "WEBSITE" | "REFERRAL" | "LINKEDIN" | "MANUAL";

export interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  activeProjects: number;
  totalBilled: number;
  status: ClientStatus;
  lastContact: string;
  tags: string[];
}

export interface Project {
  id: string;
  name: string;
  clientId: string;
  clientName: string;
  status: ProjectStatus;
  startDate: string;
  deadline: string;
  budget: number;
  percentComplete: number;
  priority: "LOW" | "MEDIUM" | "HIGH";
}

export interface InvoiceLineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
}

export interface Invoice {
  id: string;
  number: string;
  clientId: string;
  clientName: string;
  amount: number;
  issueDate: string;
  dueDate: string;
  status: InvoiceStatus;
  lineItems: InvoiceLineItem[];
  taxPercent: number;
  discount: number;
  notes?: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  source: LeadSource;
  submittedAt: string;
  status: LeadStatus;
  estimatedValue: number;
  notes?: string;
}

export interface Activity {
  id: string;
  type: "invoice" | "lead" | "project" | "message";
  description: string;
  timestamp: string;
  href?: string;
}

export interface Milestone {
  id: string;
  projectId: string;
  projectName: string;
  title: string;
  dueDate: string;
}

export interface MonthlyRevenue {
  month: string;
  revenue: number;
  invoiceCount: number;
}
