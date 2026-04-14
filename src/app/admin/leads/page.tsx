import type { Metadata } from "next";
import { LeadsPageClient } from "@/components/admin/leads/LeadsPageClient";
import { listAdminLeads } from "@/lib/admin/read-models";

export const metadata: Metadata = {
  title: "Leads",
};

export default async function AdminLeadsPage() {
  const leads = await listAdminLeads();
  return <LeadsPageClient leads={leads} />;
}
