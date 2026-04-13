import type { Metadata } from "next";
import { AdminAppChrome } from "@/components/admin/AdminAppChrome";
import { requireInternalAdmin } from "@/lib/auth/internal-admin";

export const metadata: Metadata = {
  title: {
    template: "%s · LIC Admin",
    default: "Dashboard · LIC Admin",
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireInternalAdmin();

  return (
    <div className="dashboard-root min-h-full">
      <AdminAppChrome>{children}</AdminAppChrome>
    </div>
  );
}
