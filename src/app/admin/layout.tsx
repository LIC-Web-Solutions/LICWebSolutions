import type { Metadata } from "next";
import { AdminAppChrome } from "@/components/admin/AdminAppChrome";
import { requireInternalAdmin } from "@/lib/auth/internal-admin";
import styles from "./AdminLayout.module.css";

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
    <div className={`dashboard-root ${styles.root}`}>
      <AdminAppChrome>{children}</AdminAppChrome>
    </div>
  );
}
