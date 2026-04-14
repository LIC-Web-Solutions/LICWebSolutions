import { redirect } from "next/navigation";

interface SupportPageProps {
  params: Promise<{ workspaceSlug: string }>;
}

export default async function SupportPage({ params }: SupportPageProps) {
  const { workspaceSlug } = await params;
  redirect(`/portal/${workspaceSlug}/tickets`);
}
