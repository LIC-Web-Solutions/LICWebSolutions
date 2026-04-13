"use client";

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Link from "next/link";
import { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Project } from "@/types/admin-dashboard";

export function ProjectsTable({ data }: { data: Project[] }) {
  const columns = useMemo<ColumnDef<Project>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Project",
        cell: ({ row }) => (
          <Link
            href={`/admin/projects/${row.original.id}`}
            className="font-medium text-sky-400 hover:underline"
          >
            {row.original.name}
          </Link>
        ),
      },
      { accessorKey: "clientName", header: "Client" },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue }) => (
          <Badge variant="secondary">
            {String(getValue()).replace(/_/g, " ")}
          </Badge>
        ),
      },
      { accessorKey: "startDate", header: "Start" },
      { accessorKey: "deadline", header: "Deadline" },
      {
        accessorKey: "budget",
        header: "Budget",
        cell: ({ getValue }) => (
          <span className="tabular-nums">
            ${Number(getValue()).toLocaleString()}
          </span>
        ),
      },
      {
        accessorKey: "percentComplete",
        header: "% Done",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <div className="h-2 w-20 overflow-hidden rounded-full bg-zinc-800">
              <div
                className="h-full rounded-full bg-sky-600"
                style={{
                  width: `${row.original.percentComplete}%`,
                }}
              />
            </div>
            <span className="text-xs tabular-nums text-zinc-400">
              {row.original.percentComplete}%
            </span>
          </div>
        ),
      },
    ],
    [],
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="sticky top-0 z-10 bg-zinc-900/95 backdrop-blur">
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id} className="border-b border-zinc-800">
                  {hg.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-zinc-500"
                    >
                      {flexRender(
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
                  className="border-b border-zinc-800/80 hover:bg-zinc-800/40"
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
