import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getProjectById } from "@/lib/admin/mock-data";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const p = getProjectById(id);
  return { title: p?.name ?? "Project" };
}

export default async function AdminProjectDetailPage({ params }: Props) {
  const { id } = await params;
  const project = getProjectById(id);
  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
          Project
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-50">
          {project.name}
        </h1>
        <p className="mt-2 text-sm text-zinc-400">
          Client: <span className="text-zinc-200">{project.clientName}</span> ·{" "}
          <Badge variant="secondary">{project.status.replace(/_/g, " ")}</Badge>
        </p>
        <p className="mt-1 text-sm text-zinc-500">
          {project.startDate} → {project.deadline} · Budget $
          {project.budget.toLocaleString()}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Milestones / tasks</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-zinc-500">
            Checklist with assignees — stub for future team use (mock).
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Files</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-zinc-500">
            Deliverables list — stub (mock).
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Time log</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-zinc-500">
            Hours summary — stub (mock).
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Notes / updates</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-zinc-500">
            Status timeline — stub (mock).
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
