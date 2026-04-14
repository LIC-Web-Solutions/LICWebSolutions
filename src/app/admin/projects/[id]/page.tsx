import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAdminProjectById } from "@/lib/admin/read-models";
import styles from "../ProjectDetailPage.module.css";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const p = await getAdminProjectById(id);
  return { title: p?.name ?? "Project" };
}

export default async function AdminProjectDetailPage({ params }: Props) {
  const { id } = await params;
  const project = await getAdminProjectById(id);
  if (!project) {
    notFound();
  }

  return (
    <div className={styles.projectDetail}>
      <div className={styles.projectDetail__header}>
        <p className={styles.projectDetail__eyebrow}>Project</p>
        <h1 className={styles.projectDetail__title}>{project.name}</h1>
        <p className={styles.projectDetail__meta}>
          Client: <span className="text-zinc-200">{project.clientName}</span> ·{" "}
          <Badge variant="secondary">{project.status.replace(/_/g, " ")}</Badge>
        </p>
        <p className={styles.projectDetail__metaSecondary}>
          {project.startDate} → {project.deadline} · Budget $
          {project.budget.toLocaleString()}
        </p>
      </div>

      <div className={styles.projectDetail__infoGrid}>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Milestones / tasks</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-zinc-500">
            Milestone tracking is represented through task completion and ticket
            throughput for this project.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Files</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-zinc-500">
            Deliverables repository metadata can be mapped from `repoUrl` in the
            project record as this area evolves.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Time log</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-zinc-500">
            Time logging is not modeled yet; this panel remains informational.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Notes / updates</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-zinc-500">
            Status is derived from live project ticket completion percentages.
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
