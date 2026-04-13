import { PortalAppChrome } from "@/components/portal/PortalAppChrome";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dashboard-root flex min-h-full flex-col bg-zinc-950 text-zinc-50 antialiased">
      <PortalAppChrome>{children}</PortalAppChrome>
    </div>
  );
}
