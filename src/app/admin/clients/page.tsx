import type { Metadata } from "next";
import { ClientsDataTable } from "@/components/admin/clients/ClientsDataTable";
import { prisma } from "@/lib/prisma";
import type { Client } from "@/types/admin-dashboard";

export const metadata: Metadata = {
  title: "Clients",
};

export default async function AdminClientsPage() {
  const users = await prisma.user.findMany({
    include: {
      memberships: {
        include: { workspace: true },
      },
      createdTickets: {
        select: { id: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  type AdminClientUser = (typeof users)[number];

  const clients: Client[] = users.map((user: AdminClientUser) => {
    const activeMemberships = user.memberships.filter(
      (membership: AdminClientUser["memberships"][number]) =>
        membership.workspace.status !== "ARCHIVED",
    );
    const primaryWorkspace = activeMemberships[0]?.workspace;
    return {
      id: user.id,
      name: user.fullName || user.email || "Unknown user",
      company: primaryWorkspace?.name || "Unassigned",
      email: user.email || "No email",
      activeProjects: 0,
      totalBilled: 0,
      status: activeMemberships.length > 0 ? "ACTIVE" : "ARCHIVED",
      lastContact: user.updatedAt.toISOString().slice(0, 10),
      tags: [],
    };
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-50">
          Clients
        </h1>
        <p className="mt-1 text-sm text-zinc-400">
          Live directory sourced from workspace memberships.
        </p>
      </div>
      <ClientsDataTable data={clients} />
    </div>
  );
}
