import { PortalAppChrome } from "@/components/portal/PortalAppChrome";
import styles from "./PortalLayout.module.css";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`dashboard-root ${styles.root}`}>
      <PortalAppChrome>{children}</PortalAppChrome>
    </div>
  );
}
