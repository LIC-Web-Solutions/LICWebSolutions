import { cn } from "@/lib/utils";
import portalStyle from "@/styles/portal.module.css";

export default function PortalLoading() {
  return (
    <div
      className={cn(
        portalStyle.loadingFrame,
        portalStyle.mainShell,
        portalStyle.loadingPulse,
      )}
    >
      <div className={portalStyle.loadingLineLg} />
      <div className={portalStyle.loadingLineMd} />
      <div className={portalStyle.loadingLineSm} />
    </div>
  );
}
