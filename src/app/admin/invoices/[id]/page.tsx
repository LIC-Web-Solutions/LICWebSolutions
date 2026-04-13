import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InvoiceEditor } from "@/components/admin/invoices/InvoiceEditor";
import { Badge } from "@/components/ui/badge";
import { getInvoiceById } from "@/lib/admin/mock-data";
import type { InvoiceStatus } from "@/types/admin-dashboard";

type Props = { params: Promise<{ id: string }> };

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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const inv = getInvoiceById(id);
  return { title: inv ? `Invoice #${inv.number}` : "Invoice" };
}

export default async function AdminInvoiceDetailPage({ params }: Props) {
  const { id } = await params;
  const invoice = getInvoiceById(id);
  if (!invoice) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-50">
          Invoice #{invoice.number}
        </h1>
        <Badge variant={statusVariant(invoice.status)}>{invoice.status}</Badge>
      </div>
      <InvoiceEditor invoice={invoice} />
    </div>
  );
}
