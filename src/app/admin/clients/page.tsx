import type { Metadata } from "next";
import { ClientsDataTable } from "@/components/admin/clients/ClientsDataTable";
import { mockClients } from "@/lib/admin/mock-data";

export const metadata: Metadata = {
  title: "Clients",
};

export default function AdminClientsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-50">
          Clients
        </h1>
        <p className="mt-1 text-sm text-zinc-400">
          Mock directory — TanStack Table with row selection.
        </p>
      </div>
      <ClientsDataTable data={mockClients} />
    </div>
  );
}
