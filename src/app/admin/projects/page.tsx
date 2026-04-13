import type { Metadata } from "next";
import { ProjectsHomeClient } from "@/app/admin/projects/ProjectsHomeClient";
import { mockProjects } from "@/lib/admin/mock-data";

export const metadata: Metadata = {
  title: "Projects",
};

export default function AdminProjectsPage() {
  return <ProjectsHomeClient initial={mockProjects} />;
}
