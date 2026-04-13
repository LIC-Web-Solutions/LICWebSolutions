"use client";

import {
  DndContext,
  type DragEndEvent,
  PointerSensor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Project, ProjectStatus } from "@/types/admin-dashboard";

const COLUMNS: { id: ProjectStatus; label: string }[] = [
  { id: "LEAD", label: "Lead" },
  { id: "PROPOSAL", label: "Proposal" },
  { id: "IN_PROGRESS", label: "In progress" },
  { id: "IN_REVIEW", label: "In review" },
  { id: "COMPLETED", label: "Completed" },
  { id: "ARCHIVED", label: "Archived" },
];

function KanbanCard({ project }: { project: Project }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: project.id,
      data: { project },
    });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <Card
        className={cn(
          "cursor-grab active:cursor-grabbing",
          isDragging && "opacity-60",
        )}
      >
        <CardContent className="space-y-2 p-4">
          <Link
            href={`/admin/projects/${project.id}`}
            className="text-sm font-medium text-sky-400 hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            {project.name}
          </Link>
          <p className="text-xs text-zinc-500">{project.clientName}</p>
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>Due {project.deadline}</span>
            <span
              className={cn(
                "size-2 rounded-full",
                project.priority === "HIGH" && "bg-red-500",
                project.priority === "MEDIUM" && "bg-amber-500",
                project.priority === "LOW" && "bg-emerald-500",
              )}
              title={`Priority: ${project.priority}`}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function KanbanColumn({
  col,
  projects,
}: {
  col: (typeof COLUMNS)[number];
  projects: Project[];
}) {
  const { setNodeRef, isOver } = useDroppable({ id: col.id });

  return (
    <div className="flex w-64 shrink-0 flex-col">
      <div className="mb-2 flex items-center justify-between px-1">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
          {col.label}
        </h3>
        <span className="text-xs text-zinc-600">{projects.length}</span>
      </div>
      <div
        ref={setNodeRef}
        className={cn(
          "flex min-h-48 flex-1 flex-col gap-2 rounded-lg border border-dashed p-2",
          isOver ? "border-sky-500/60 bg-sky-950/20" : "border-zinc-800",
        )}
      >
        {projects.map((p) => (
          <KanbanCard key={p.id} project={p} />
        ))}
      </div>
    </div>
  );
}

export function ProjectKanbanBoard({
  projects,
  onChange,
}: {
  projects: Project[];
  onChange: (next: Project[]) => void;
}) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
  );

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) {
      return;
    }
    const activeId = String(active.id);
    const overId = String(over.id) as ProjectStatus;
    const colIds = new Set(COLUMNS.map((c) => c.id));
    const targetStatus = colIds.has(overId)
      ? overId
      : (projects.find((p) => p.id === over.id)?.status ?? null);
    if (!targetStatus) {
      return;
    }
    const next = projects.map((p) =>
      p.id === activeId ? { ...p, status: targetStatus } : p,
    );
    onChange(next);
  }

  return (
    <DndContext sensors={sensors} onDragEnd={onDragEnd}>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {COLUMNS.map((col) => (
          <KanbanColumn
            key={col.id}
            col={col}
            projects={projects.filter((p) => p.status === col.id)}
          />
        ))}
      </div>
    </DndContext>
  );
}
