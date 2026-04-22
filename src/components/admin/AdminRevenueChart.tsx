"use client";

import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { MonthlyRevenue } from "@/types/admin-dashboard";

type Mode = "revenue" | "invoices";

export function AdminRevenueChart({ data }: { data: MonthlyRevenue[] }) {
  const [mode, setMode] = useState<Mode>("revenue");

  const chartData = useMemo(
    () =>
      data.map((d) => ({
        month: d.month.slice(5),
        revenue: d.revenue,
        invoices: d.invoiceCount,
      })),
    [data],
  );

  return (
    <Card>
      <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-2 space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Trailing 6 months
        </CardTitle>
        <div className="flex gap-1">
          <Button
            type="button"
            size="sm"
            variant={mode === "revenue" ? "default" : "outline"}
            onClick={() => setMode("revenue")}
          >
            Revenue
          </Button>
          <Button
            type="button"
            size="sm"
            variant={mode === "invoices" ? "default" : "outline"}
            onClick={() => setMode("invoices")}
          >
            Invoices
          </Button>
        </div>
      </CardHeader>
      <CardContent className="min-w-0 pt-2">
        <div className="h-[280px] w-full min-w-0 min-h-0">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart
              data={chartData}
              margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
              <XAxis dataKey="month" tick={{ fill: "#a1a1aa", fontSize: 12 }} />
              <YAxis
                tick={{ fill: "#a1a1aa", fontSize: 12 }}
                tickFormatter={(v) =>
                  mode === "revenue" ? `$${Number(v) / 1000}k` : String(v)
                }
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#18181b",
                  border: "1px solid #3f3f46",
                  borderRadius: 8,
                }}
                labelStyle={{ color: "#fafafa" }}
                formatter={(value) => {
                  const n = typeof value === "number" ? value : Number(value);
                  if (Number.isNaN(n)) {
                    return ["—", ""];
                  }
                  return mode === "revenue"
                    ? [`$${n.toLocaleString()}`, "Revenue"]
                    : [String(n), "Invoices"];
                }}
              />
              {mode === "revenue" ? (
                <Bar dataKey="revenue" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
              ) : (
                <Bar dataKey="invoices" fill="#22c55e" radius={[4, 4, 0, 0]} />
              )}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
