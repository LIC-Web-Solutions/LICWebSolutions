"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { Invoice, InvoiceLineItem } from "@/types/admin-dashboard";

function subtotal(items: InvoiceLineItem[]) {
  return items.reduce((s, l) => s + l.quantity * l.rate, 0);
}

export function InvoiceEditor({ invoice }: { invoice: Invoice }) {
  const [lineItems, setLineItems] = useState<InvoiceLineItem[]>(
    invoice.lineItems,
  );
  const [taxPercent, setTaxPercent] = useState(invoice.taxPercent);
  const [discount, setDiscount] = useState(invoice.discount);

  const sub = useMemo(() => subtotal(lineItems), [lineItems]);
  const taxAmount = useMemo(
    () => Math.round(sub * (taxPercent / 100) * 100) / 100,
    [sub, taxPercent],
  );
  const total = sub + taxAmount - discount;

  function updateLine(
    id: string,
    patch: Partial<Pick<InvoiceLineItem, "description" | "quantity" | "rate">>,
  ) {
    setLineItems((rows) =>
      rows.map((r) => (r.id === id ? { ...r, ...patch } : r)),
    );
  }

  function addRow() {
    setLineItems((rows) => [
      ...rows,
      {
        id: `new-${Date.now()}`,
        description: "",
        quantity: 1,
        rate: 0,
      },
    ]);
  }

  function removeRow(id: string) {
    setLineItems((rows) => rows.filter((r) => r.id !== id));
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Header</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs font-medium text-zinc-500">Client</p>
            <Input readOnly value={invoice.clientName} className="mt-1" />
          </div>
          <div>
            <p className="text-xs font-medium text-zinc-500">Invoice #</p>
            <Input readOnly value={invoice.number} className="mt-1" />
          </div>
          <div>
            <p className="text-xs font-medium text-zinc-500">Issue date</p>
            <Input readOnly value={invoice.issueDate} className="mt-1" />
          </div>
          <div>
            <p className="text-xs font-medium text-zinc-500">Due date</p>
            <Input readOnly value={invoice.dueDate} className="mt-1" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Line items</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead>
                <tr className="border-b border-zinc-800 text-xs uppercase text-zinc-500">
                  <th className="pb-2 pr-2">Description</th>
                  <th className="pb-2 pr-2">Qty</th>
                  <th className="pb-2 pr-2">Rate</th>
                  <th className="pb-2 pr-2">Amount</th>
                  <th className="pb-2" />
                </tr>
              </thead>
              <tbody>
                {lineItems.map((row) => (
                  <tr key={row.id} className="border-b border-zinc-800/60">
                    <td className="py-2 pr-2">
                      <Input
                        value={row.description}
                        onChange={(e) =>
                          updateLine(row.id, { description: e.target.value })
                        }
                      />
                    </td>
                    <td className="py-2 pr-2">
                      <Input
                        type="number"
                        min={0}
                        className="w-20"
                        value={row.quantity}
                        onChange={(e) =>
                          updateLine(row.id, {
                            quantity: Number(e.target.value) || 0,
                          })
                        }
                      />
                    </td>
                    <td className="py-2 pr-2">
                      <Input
                        type="number"
                        min={0}
                        className="w-28"
                        value={row.rate}
                        onChange={(e) =>
                          updateLine(row.id, {
                            rate: Number(e.target.value) || 0,
                          })
                        }
                      />
                    </td>
                    <td className="py-2 pr-2 tabular-nums text-zinc-300">
                      ${(row.quantity * row.rate).toLocaleString()}
                    </td>
                    <td className="py-2">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeRow(row.id)}
                        disabled={lineItems.length <= 1}
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Button type="button" variant="outline" size="sm" onClick={addRow}>
            Add line
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Totals</CardTitle>
        </CardHeader>
        <CardContent className="max-w-md space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-zinc-500">Subtotal</span>
            <span className="tabular-nums">${sub.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between gap-4 text-sm">
            <span className="text-zinc-500">Tax %</span>
            <Input
              type="number"
              className="w-24"
              value={taxPercent}
              onChange={(e) => setTaxPercent(Number(e.target.value) || 0)}
            />
          </div>
          <div className="flex items-center justify-between gap-4 text-sm">
            <span className="text-zinc-500">Discount $</span>
            <Input
              type="number"
              className="w-28"
              value={discount}
              onChange={(e) => setDiscount(Number(e.target.value) || 0)}
            />
          </div>
          <div className="flex justify-between border-t border-zinc-800 pt-3 text-base font-semibold">
            <span>Total</span>
            <span className="tabular-nums">${total.toLocaleString()}</span>
          </div>
          <textarea
            className="min-h-24 w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
            placeholder="Notes / terms…"
            defaultValue={invoice.notes ?? ""}
          />
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-2">
        <Button type="button" variant="secondary" disabled>
          Save draft
        </Button>
        <Button type="button" variant="outline" disabled>
          Send invoice
        </Button>
        <Button type="button" variant="outline" disabled>
          Mark paid
        </Button>
        <Button type="button" variant="outline" disabled>
          Download PDF
        </Button>
      </div>
    </div>
  );
}
