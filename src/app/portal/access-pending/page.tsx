import Link from "next/link";
import { cn } from "@/lib/utils";
import portalStyle from "@/styles/portal.module.css";

export default function AccessPendingPage() {
  return (
    <main className={cn(portalStyle.pageFrame, portalStyle.mainShell)}>
      <h1 className={cn(portalStyle.h1Page, portalStyle.h1Small)}>
        Access pending
      </h1>
      <p className={portalStyle.lede}>
        Your account is authenticated, but you are not assigned to a client
        workspace yet. Until a workspace membership is created for you, the
        portal cannot show tickets or other modules.
      </p>
      <p className={portalStyle.proseBlock}>
        <strong className={portalStyle.proseStrong}>What to do next:</strong>{" "}
        contact your LIC project manager or support and ask to be added to the
        correct workspace membership. Once assigned, refresh and continue in
        your portal workspace.
      </p>
      <div className={portalStyle.buttonRow}>
        <Link
          href="/portal/workspace-request"
          className={cn(portalStyle.btnPrimary, portalStyle.centerBtn)}
        >
          Request workspace
        </Link>
        <Link
          href="/"
          className={cn(portalStyle.btnOutline, portalStyle.centerBtn)}
        >
          Back to site
        </Link>
      </div>
    </main>
  );
}
