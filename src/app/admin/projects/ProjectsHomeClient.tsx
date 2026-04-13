"use client";

import { useState } from "react";
import { ProjectKanbanBoard } from "@/components/admin/projects/ProjectKanbanBoard";
import { ProjectsTable } from "@/components/admin/projects/ProjectsTable";
import { Button } from "@/components/ui/button";
import type { Project } from "@/types/admin-dashboard";

export function ProjectsHomeClient({ initial }: { initial: Project[] }) {
  const [projects, setProjects] = useState<Project[]>(initial);
  const [mode, setMode] = useState<"board" | "table">("board");

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-50">
            Projects
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            Kanban (dnd-kit) or table view — mock data; drag updates local state
            only.
          </p>
        </div>
        <div className="flex gap-1">
          <Button
            type="button"
            size="sm"
            variant={mode === "board" ? "default" : "outline"}
            onClick={() => setMode("board")}
          >
            Board
          </Button>
          <Button
            type="button"
            size="sm"
            variant={mode === "table" ? "default" : "outline"}
            onClick={() => setMode("table")}
          >
            Table
          </Button>
        </div>
      </div>
      {mode === "board" ? (
        <ProjectKanbanBoard projects={projects} onChange={setProjects} />
      ) : (
        <ProjectsTable data={projects} />
      )}
    </div>
  );
}
