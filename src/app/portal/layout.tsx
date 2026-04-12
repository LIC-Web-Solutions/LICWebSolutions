import { PortalHeader } from "@/components/portal/PortalHeader";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-full flex-col">
      <PortalHeader />
      <div className="flex-1">{children}</div>
    </div>
  );
}
