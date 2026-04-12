import { redirect } from "next/navigation";
import { AuthorizationError, requireWorkspaceAccess } from "@/lib/auth/guards";

interface WorkspaceLayoutProps {
  children: React.ReactNode;
  params: Promise<{ workspaceSlug: string }>;
}

export default async function WorkspaceLayout({
  children,
  params,
}: WorkspaceLayoutProps) {
  const { workspaceSlug } = await params;

  try {
    await requireWorkspaceAccess(workspaceSlug);
  } catch (error) {
    if (error instanceof AuthorizationError) {
      redirect("/portal/access-denied");
    }
    throw error;
  }

  return <>{children}</>;
}
