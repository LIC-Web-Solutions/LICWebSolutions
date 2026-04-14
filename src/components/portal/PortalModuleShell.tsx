import { cn } from "@/lib/utils";
import portalStyle from "@/styles/portal.module.css";

interface PortalModuleShellProps {
  title: string;
  description: string;
  role: string;
  workspaceName: string;
  children?: React.ReactNode;
}

export function PortalModuleShell({
  title,
  description,
  role,
  workspaceName,
  children,
}: PortalModuleShellProps) {
  return (
    <main className={cn(portalStyle.pageFrame, portalStyle.mainShell)}>
      <p className={portalStyle.eyebrow}>
        {workspaceName} · {role}
      </p>
      <h1 className={cn(portalStyle.h1Offset, portalStyle.h1Page)}>{title}</h1>
      <p className={portalStyle.lede}>{description}</p>
      {children ? (
        <div className={portalStyle.sectionBoundary}>{children}</div>
      ) : null}
    </main>
  );
}
