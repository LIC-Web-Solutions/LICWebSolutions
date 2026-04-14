import Link from "next/link";
import { AdminRevenueChart } from "@/components/admin/AdminRevenueChart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { parseCurrencyAmount } from "@/lib/admin/read-models";
import { prisma } from "@/lib/prisma";
import styles from "./AdminDashboardPage.module.css";

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
    return styles["adminDashboard__milestoneIndicator--high"];
  }
  if (days <= 7) {
    return styles["adminDashboard__milestoneIndicator--medium"];
  }
  return styles["adminDashboard__milestoneIndicator--low"];
}

function monthKeyFromDate(date: Date) {
  return date.toISOString().slice(0, 7);
}

function toDateOnly(date: Date) {
  return date.toISOString().slice(0, 10);
}

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

export default async function AdminDashboardPage() {
  const [projects, customizationRequests, actionEvents, tickets] =
    await Promise.all([
      prisma.project.findMany({
        include: { workspace: true },
      }),
      prisma.customizationRequest.findMany({
        include: { workspace: true },
      }),
      prisma.actionEvent.findMany({
        include: { workspace: true },
        orderBy: { createdAt: "desc" },
        take: 8,
      }),
      prisma.ticket.findMany({
        include: { workspace: true },
      }),
    ]);

  const activeProjects = projects.length;
  const now = new Date();
  const thisMonthKey = monthKeyFromDate(now);
  const prevMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const prevMonthKey = monthKeyFromDate(prevMonthDate);

  const mtdRevenue = customizationRequests
    .filter((row) => monthKeyFromDate(row.createdAt) === thisMonthKey)
    .reduce((sum, row) => sum + parseCurrencyAmount(row.estimate), 0);
  const prevRevenue = customizationRequests
    .filter((row) => monthKeyFromDate(row.createdAt) === prevMonthKey)
    .reduce((sum, row) => sum + parseCurrencyAmount(row.estimate), 0);
  const revDelta =
    prevRevenue > 0
      ? Math.round(((mtdRevenue - prevRevenue) / prevRevenue) * 100)
      : 0;

  const outstanding = customizationRequests
    .filter((row) => ["QUOTED", "APPROVED", "IN_PROGRESS"].includes(row.status))
    .reduce((sum, row) => sum + parseCurrencyAmount(row.estimate), 0);

  const overdueCount = customizationRequests.filter((row) => {
    if (!["QUOTED", "APPROVED", "IN_PROGRESS"].includes(row.status)) {
      return false;
    }
    return daysUntil(toDateOnly(addDays(row.createdAt, 14))) < 0;
  }).length;

  const projectsAtRisk = tickets.filter(
    (ticket) => ticket.status === "BLOCKED",
  ).length;

  const upcomingMilestones = projects
    .map((project) => ({
      id: project.id,
      title: `Delivery checkpoint`,
      projectName: project.name,
      dueDate: toDateOnly(addDays(project.updatedAt, 14)),
    }))
    .sort(
      (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
    )
    .slice(0, 5);

  const activityRows = actionEvents.map((event) => ({
    id: event.id,
    description: `${event.workspace.name}: ${event.action}`,
    timestamp: event.createdAt.toISOString(),
    href: event.workspace ? `/portal/${event.workspace.slug}` : undefined,
  }));

  const monthlyMap = new Map<
    string,
    { revenue: number; invoiceCount: number }
  >();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    monthlyMap.set(monthKeyFromDate(d), { revenue: 0, invoiceCount: 0 });
  }
  for (const row of customizationRequests) {
    const key = monthKeyFromDate(row.createdAt);
    const month = monthlyMap.get(key);
    if (!month) {
      continue;
    }
    month.revenue += parseCurrencyAmount(row.estimate);
    month.invoiceCount += 1;
  }
  const monthlyData = [...monthlyMap.entries()].map(([month, values]) => ({
    month,
    revenue: values.revenue,
    invoiceCount: values.invoiceCount,
  }));

  return (
    <div className={styles.adminDashboard}>
      <div className={styles.adminDashboard__intro}>
        <h1 className={styles.adminDashboard__title}>Dashboard</h1>
        <p className={styles.adminDashboard__subtitle}>
          Core operations snapshot for LIC delivery work.
        </p>
      </div>

      <div className={styles.adminDashboard__statsGrid}>
        <Card className="transition-colors hover:border-zinc-600">
          <CardHeader className="pb-2">
            <CardDescription>Active projects</CardDescription>
            <CardTitle className="text-3xl tabular-nums">
              {activeProjects}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-zinc-500">
              Across all active workspaces
            </p>
          </CardContent>
        </Card>
        <Card className="transition-colors hover:border-zinc-600">
          <CardHeader className="pb-2">
            <CardDescription>Revenue (MTD)</CardDescription>
            <CardTitle className="text-3xl tabular-nums">
              ${mtdRevenue.toLocaleString()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-zinc-500">
              {revDelta >= 0 ? "↑" : "↓"} {Math.abs(revDelta)}% vs last month
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
                {overdueCount} overdue
              </p>
            ) : (
              <p className="text-xs text-zinc-500">No overdue</p>
            )}
          </CardContent>
        </Card>
        <Card className="transition-colors hover:border-zinc-600">
          <CardHeader className="pb-2">
            <CardDescription>Projects at risk</CardDescription>
            <CardTitle className="text-3xl tabular-nums">
              {projectsAtRisk}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-zinc-500">Due in 7 days or less</p>
          </CardContent>
        </Card>
      </div>

      <div className={styles.adminDashboard__summaryGrid}>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-base">Recent activity</CardTitle>
            <CardDescription>Latest events across the agency</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className={styles.adminDashboard__activityList}>
              {activityRows.map((a) => (
                <li key={a.id} className={styles.adminDashboard__activityItem}>
                  <span
                    className={styles.adminDashboard__activityBullet}
                    aria-hidden
                  >
                    •
                  </span>
                  <div className={styles.adminDashboard__activityBody}>
                    {a.href ? (
                      <Link
                        href={a.href}
                        className={styles.adminDashboard__activityLink}
                      >
                        {a.description}
                      </Link>
                    ) : (
                      <p className={styles.adminDashboard__activityText}>
                        {a.description}
                      </p>
                    )}
                    <p className={styles.adminDashboard__activityTime}>
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
            <CardDescription>Next project checkpoints</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className={styles.adminDashboard__milestoneList}>
              {upcomingMilestones.map((m) => {
                const d = daysUntil(m.dueDate);
                return (
                  <li
                    key={m.id}
                    className={styles.adminDashboard__milestoneItem}
                  >
                    <span
                      className={`${styles.adminDashboard__milestoneIndicator} ${urgencyClass(d)}`}
                      title={`${d} days`}
                    />
                    <div className={styles.adminDashboard__milestoneBody}>
                      <p className={styles.adminDashboard__milestoneTitle}>
                        {m.title}
                      </p>
                      <p className={styles.adminDashboard__milestoneMeta}>
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

      <AdminRevenueChart data={monthlyData} />
    </div>
  );
}
