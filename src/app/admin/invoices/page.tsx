import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { listAdminInvoices } from "@/lib/admin/read-models";
import type { InvoiceStatus } from "@/types/admin-dashboard";

export const metadata: Metadata = {
  title: "Invoices",
};

function statusVariant(
  s: InvoiceStatus,
): "default" | "secondary" | "success" | "warning" | "destructive" {
  switch (s) {
    case "PAID":
      return "success";
    case "SENT":
      return "warning";
    case "OVERDUE":
      return "destructive";
    default:
      return "secondary";
  }
}

export default async function AdminInvoicesPage() {
  const invoices = await listAdminInvoices();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-50">
            Invoices
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            Derived from customization estimates and approval lifecycle states.
          </p>
        </div>
        <Button type="button" asChild>
          <Link href="/admin/invoices/new">Create invoice</Link>
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {(["ALL", "DRAFT", "SENT", "PAID", "OVERDUE"] as const).map((chip) => (
          <Button
            key={chip}
            type="button"
            size="sm"
            variant={chip === "ALL" ? "default" : "outline"}
            disabled={chip !== "ALL"}
          >
            {chip === "ALL" ? "All statuses" : chip}
          </Button>
        ))}
      </div>
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="sticky top-0 z-10 bg-zinc-900/95 backdrop-blur">
                <tr className="border-b border-zinc-800">
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                    #
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                    Client
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                    Issue
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                    Due
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv) => (
                  <tr
                    key={inv.id}
                    className="border-b border-zinc-800/80 hover:bg-zinc-800/40"
                  >
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/invoices/${inv.id}`}
                        className="font-medium text-sky-400 hover:underline"
                      >
                        {inv.number}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-zinc-300">
                      {inv.clientName}
                    </td>
                    <td className="px-4 py-3 tabular-nums text-zinc-300">
                      ${inv.amount.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-zinc-500">{inv.issueDate}</td>
                    <td className="px-4 py-3 text-zinc-500">{inv.dueDate}</td>
                    <td className="px-4 py-3">
                      <Badge variant={statusVariant(inv.status)}>
                        {inv.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
                {invoices.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-6 text-sm text-zinc-500">
                      No invoice records available yet.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
