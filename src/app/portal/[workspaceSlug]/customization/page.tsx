import { redirect } from "next/navigation";

interface CustomizationPageProps {
  params: Promise<{ workspaceSlug: string }>;
}

export default async function CustomizationPage({
  params,
}: CustomizationPageProps) {
  const { workspaceSlug } = await params;
  redirect(`/portal/${workspaceSlug}/tickets`);
}
