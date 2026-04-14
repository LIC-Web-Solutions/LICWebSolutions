import Link from "next/link";
import { cn } from "@/lib/utils";
import portalStyle from "@/styles/portal.module.css";

export default function AccessDeniedPage() {
  return (
    <main className={cn(portalStyle.pageFrame, portalStyle.mainShell)}>
      <h1 className={cn(portalStyle.h1Page, portalStyle.h1Small)}>
        Access denied
      </h1>
      <p className={portalStyle.lede}>
        You are signed in, but you are not a member of this workspace URL, or
        your role does not allow this page. Check the slug in the address bar,
        or return to the portal home to see workspaces you can open.
      </p>
      <p className={portalStyle.proseBlock}>
        <strong className={portalStyle.proseStrong}>What to do next:</strong>{" "}
        use{" "}
        <Link href="/portal" className={portalStyle.linkAccent}>
          portal home
        </Link>{" "}
        to pick a workspace you belong to. If this workspace should be visible
        to you, ask LIC to update your workspace membership. For local dev, run{" "}
        <code className={portalStyle.codeInline}>pnpm prisma:seed</code> after
        signing in once.
      </p>
      <div className={portalStyle.buttonRow}>
        <Link
          href="/portal"
          className={cn(portalStyle.btnPrimary, portalStyle.centerBtn)}
        >
          Return to portal
        </Link>
        <Link
          href="/"
          className={cn(portalStyle.btnOutline, portalStyle.centerBtn)}
        >
          Marketing site
        </Link>
      </div>
    </main>
  );
}
