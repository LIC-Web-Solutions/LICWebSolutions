"use client";

import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { Lead, LeadSource, LeadStatus } from "@/types/admin-dashboard";

function sourceLabel(s: LeadSource) {
  switch (s) {
    case "WEBSITE":
      return "Website";
    case "REFERRAL":
      return "Referral";
    case "LINKEDIN":
      return "LinkedIn";
    default:
      return "Manual";
  }
}

function statusVariant(
  s: LeadStatus,
): "default" | "secondary" | "success" | "warning" | "destructive" {
  switch (s) {
    case "NEW":
      return "default";
    case "QUALIFIED":
      return "success";
    case "CONVERTED":
      return "success";
    case "LOST":
      return "destructive";
    default:
      return "secondary";
  }
}

export function LeadsPageClient({ leads }: { leads: Lead[] }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<Lead | null>(null);

  function openLead(lead: Lead) {
    setActive(lead);
    setOpen(true);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-50">
            Leads
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            Mock pipeline — slide-over for quick actions.
          </p>
        </div>
        <Button type="button" disabled>
          Add lead
        </Button>
      </div>
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="sticky top-0 z-10 bg-zinc-900/95 backdrop-blur">
                <tr className="border-b border-zinc-800">
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                    Name
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                    Email
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                    Source
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                    Submitted
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                    Status
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                    Est. value
                  </th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="cursor-pointer border-b border-zinc-800/80 hover:bg-zinc-800/40"
                    onClick={() => openLead(lead)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        openLead(lead);
                      }
                    }}
                    tabIndex={0}
                  >
                    <td className="px-4 py-3 font-medium text-zinc-100">
                      {lead.name}
                    </td>
                    <td className="px-4 py-3 text-zinc-400">{lead.email}</td>
                    <td className="px-4 py-3 text-zinc-400">
                      {sourceLabel(lead.source)}
                    </td>
                    <td className="px-4 py-3 text-zinc-500">
                      {lead.submittedAt}
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={statusVariant(lead.status)}>
                        {lead.status.replace(/_/g, " ")}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 tabular-nums text-zinc-300">
                      ${lead.estimatedValue.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="flex flex-col">
          {active ? (
            <>
              <SheetHeader>
                <SheetTitle>{active.name}</SheetTitle>
                <SheetDescription>{active.email}</SheetDescription>
              </SheetHeader>
              <div className="mt-4 space-y-3 text-sm text-zinc-400">
                <p>
                  Source:{" "}
                  <span className="text-zinc-200">
                    {sourceLabel(active.source)}
                  </span>
                </p>
                <p>
                  Status:{" "}
                  <Badge variant={statusVariant(active.status)}>
                    {active.status}
                  </Badge>
                </p>
                <p>
                  Est. value:{" "}
                  <span className="tabular-nums text-zinc-100">
                    ${active.estimatedValue.toLocaleString()}
                  </span>
                </p>
                {active.notes ? (
                  <p className="text-zinc-300">{active.notes}</p>
                ) : null}
              </div>
              <div className="mt-auto flex flex-col gap-2 border-t border-zinc-800 pt-4">
                <Button type="button" variant="secondary" disabled>
                  Mark as contacted
                </Button>
                <Button type="button" disabled>
                  Convert to client + project
                </Button>
                <Button type="button" variant="destructive" disabled>
                  Mark as lost
                </Button>
                <Button type="button" variant="outline" asChild>
                  <Link href="/admin/clients">View clients (mock)</Link>
                </Button>
              </div>
            </>
          ) : null}
        </SheetContent>
      </Sheet>
    </div>
  );
}
