import { redirect } from "next/navigation";

interface MonitoringPageProps {
  params: Promise<{ workspaceSlug: string }>;
}

export default async function MonitoringPage({ params }: MonitoringPageProps) {
  const { workspaceSlug } = await params;
  redirect(`/portal/${workspaceSlug}/tickets`);
}
