import type { Metadata } from "next";
import { LeadsPageClient } from "@/components/admin/leads/LeadsPageClient";
import { mockLeads } from "@/lib/admin/mock-data";

export const metadata: Metadata = {
  title: "Leads",
};

export default function AdminLeadsPage() {
  return <LeadsPageClient leads={mockLeads} />;
}
