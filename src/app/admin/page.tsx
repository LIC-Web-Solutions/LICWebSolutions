import Link from "next/link";
import { AdminRevenueChart } from "@/components/admin/AdminRevenueChart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  mockActivities,
  mockInvoices,
  mockLeads,
  mockMilestones,
  mockMonthlyRevenue,
  mockProjects,
} from "@/lib/admin/mock-data";
import { cn } from "@/lib/utils";

function daysUntil(dateStr: string) {
  const d = new Date(dateStr);
  const now = new Date();
  return Math.ceil((d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

function formatRelative(iso: string) {
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  const diffSec = (new Date(iso).getTime() - Date.now()) / 1000;
  const abs = Math.abs(diffSec);
  if (abs < 60) {
    return rtf.format(Math.round(diffSec), "second");
  }
  if (abs < 3600) {
    return rtf.format(Math.round(diffSec / 60), "minute");
  }
  if (abs < 86400) {
    return rtf.format(Math.round(diffSec / 3600), "hour");
  }
  return rtf.format(Math.round(diffSec / 86400), "day");
}

function urgencyClass(days: number) {
  if (days < 3) {
    return "bg-red-500";
  }
  if (days <= 7) {
    return "bg-amber-500";
  }
  return "bg-emerald-500";
}

export default function AdminDashboardPage() {
  const activeProjects = mockProjects.filter(
    (p) => p.status !== "COMPLETED" && p.status !== "ARCHIVED",
  ).length;
  const mtd = mockMonthlyRevenue[mockMonthlyRevenue.length - 1];
  const prev = mockMonthlyRevenue[mockMonthlyRevenue.length - 2];
  const revDelta =
    prev && mtd
      ? Math.round(((mtd.revenue - prev.revenue) / prev.revenue) * 100)
      : 0;
  const outstanding = mockInvoices
    .filter((i) => i.status === "SENT" || i.status === "OVERDUE")
    .reduce((s, i) => s + i.amount, 0);
  const overdueCount = mockInvoices.filter(
    (i) => i.status === "OVERDUE",
  ).length;
  const pipelineLeads = mockLeads.filter(
    (l) => l.status !== "CONVERTED" && l.status !== "LOST",
  ).length;
  const newThisWeek = mockLeads.filter((l) => {
    const t = new Date(l.submittedAt).getTime();
    const week = Date.now() - 7 * 24 * 60 * 60 * 1000;
    return t >= week;
  }).length;

  const sortedMilestones = [...mockMilestones]
    .sort(
      (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
    )
    .slice(0, 5);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-50">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-zinc-400">
          Agency snapshot — mock data for UI demo.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="transition-colors hover:border-zinc-600">
          <CardHeader className="pb-2">
            <CardDescription>Active projects</CardDescription>
            <CardTitle className="text-3xl tabular-nums">
              {activeProjects}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-zinc-500">Across all clients (mock)</p>
          </CardContent>
        </Card>
        <Card className="transition-colors hover:border-zinc-600">
          <CardHeader className="pb-2">
            <CardDescription>Revenue (MTD)</CardDescription>
            <CardTitle className="text-3xl tabular-nums">
              ${mtd?.revenue.toLocaleString() ?? "0"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-zinc-500">
              {revDelta >= 0 ? "↑" : "↓"} {Math.abs(revDelta)}% vs last month
              (mock)
            </p>
          </CardContent>
        </Card>
        <Card className="transition-colors hover:border-zinc-600">
          <CardHeader className="pb-2">
            <CardDescription>Outstanding invoices</CardDescription>
            <CardTitle className="text-3xl tabular-nums">
              ${outstanding.toLocaleString()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {overdueCount > 0 ? (
              <p className="text-xs font-medium text-red-400">
                {overdueCount} overdue (mock)
              </p>
            ) : (
              <p className="text-xs text-zinc-500">No overdue (mock)</p>
            )}
          </CardContent>
        </Card>
        <Card className="transition-colors hover:border-zinc-600">
          <CardHeader className="pb-2">
            <CardDescription>Leads in pipeline</CardDescription>
            <CardTitle className="text-3xl tabular-nums">
              {pipelineLeads}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-zinc-500">
              {newThisWeek} new this week (mock)
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-base">Recent activity</CardTitle>
            <CardDescription>Latest events across the agency</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {mockActivities.map((a) => (
                <li
                  key={a.id}
                  className="flex gap-3 border-b border-zinc-800/80 pb-3 last:border-0 last:pb-0"
                >
                  <span className="mt-0.5 text-zinc-500" aria-hidden>
                    •
                  </span>
                  <div className="min-w-0 flex-1">
                    {a.href ? (
                      <Link
                        href={a.href}
                        className="text-sm text-zinc-200 hover:text-sky-400 hover:underline"
                      >
                        {a.description}
                      </Link>
                    ) : (
                      <p className="text-sm text-zinc-200">{a.description}</p>
                    )}
                    <p className="mt-0.5 text-xs text-zinc-500">
                      {formatRelative(a.timestamp)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Upcoming deadlines</CardTitle>
            <CardDescription>Next milestones (mock)</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {sortedMilestones.map((m) => {
                const d = daysUntil(m.dueDate);
                return (
                  <li key={m.id} className="flex items-start gap-3">
                    <span
                      className={cn(
                        "mt-1.5 size-2 shrink-0 rounded-full",
                        urgencyClass(d),
                      )}
                      title={`${d} days`}
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-zinc-100">
                        {m.title}
                      </p>
                      <p className="text-xs text-zinc-500">
                        {m.projectName} · {m.dueDate}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </CardContent>
        </Card>
      </div>

      <AdminRevenueChart data={mockMonthlyRevenue} />
    </div>
  );
}
