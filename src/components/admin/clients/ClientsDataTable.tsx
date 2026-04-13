"use client";

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Client } from "@/types/admin-dashboard";

function useColumns(): ColumnDef<Client>[] {
  return useMemo(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <input
            type="checkbox"
            className="size-4 rounded border-zinc-600 bg-zinc-900 accent-sky-600"
            checked={table.getIsAllPageRowsSelected()}
            onChange={table.getToggleAllPageRowsSelectedHandler()}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            className="size-4 rounded border-zinc-600 bg-zinc-900 accent-sky-600"
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
            aria-label="Select row"
          />
        ),
      },
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
          <div className="flex flex-col">
            <Link
              href={`/admin/clients/${row.original.id}`}
              className="font-medium text-sky-400 hover:underline"
            >
              {row.original.name}
            </Link>
            <span className="text-xs text-zinc-500">
              {row.original.company}
            </span>
          </div>
        ),
      },
      { accessorKey: "email", header: "Email" },
      {
        accessorKey: "activeProjects",
        header: "Projects",
        cell: ({ getValue }) => (
          <Badge variant="secondary">{String(getValue())}</Badge>
        ),
      },
      {
        accessorKey: "totalBilled",
        header: "Total billed",
        cell: ({ getValue }) => (
          <span className="tabular-nums">
            ${Number(getValue()).toLocaleString()}
          </span>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue }) => {
          const s = getValue() as Client["status"];
          return (
            <Badge variant={s === "ACTIVE" ? "success" : "secondary"}>
              {s === "ACTIVE" ? "Active" : "Archived"}
            </Badge>
          );
        },
      },
      { accessorKey: "lastContact", header: "Last contact" },
    ],
    [],
  );
}

export function ClientsDataTable({ data }: { data: Client[] }) {
  const [rowSelection, setRowSelection] = useState({});
  const columns = useColumns();

  const table = useReactTable({
    data,
    columns,
    state: { rowSelection },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: true,
  });

  const selectedCount = Object.keys(rowSelection).length;

  return (
    <Card>
      <CardContent className="p-0">
        {selectedCount > 0 ? (
          <div className="flex flex-wrap items-center gap-2 border-b border-zinc-800 bg-zinc-900/50 px-4 py-2">
            <span className="text-sm text-zinc-400">
              {selectedCount} selected
            </span>
            <Button type="button" size="sm" variant="outline" disabled>
              Archive
            </Button>
            <Button type="button" size="sm" variant="outline" disabled>
              Export CSV
            </Button>
          </div>
        ) : null}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="sticky top-0 z-10 bg-zinc-900/95 backdrop-blur">
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id} className="border-b border-zinc-800">
                  {hg.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-zinc-500"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className={cn(
                    "border-b border-zinc-800/80 transition-colors hover:bg-zinc-800/40",
                    row.getIsSelected() && "bg-zinc-800/30",
                  )}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3 text-zinc-300">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
