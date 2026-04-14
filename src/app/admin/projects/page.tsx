import type { Metadata } from "next";
import { ProjectsHomeClient } from "@/app/admin/projects/ProjectsHomeClient";
import { listAdminProjects } from "@/lib/admin/read-models";

export const metadata: Metadata = {
  title: "Projects",
};

export default async function AdminProjectsPage() {
  const projects = await listAdminProjects();
  return <ProjectsHomeClient initial={projects} />;
}
