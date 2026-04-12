"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";

const workspaceSections = [
  { label: "Overview", path: "" },
  { label: "Tickets", path: "tickets" },
  { label: "Support", path: "support" },
  { label: "Customization", path: "customization" },
  { label: "Monitoring", path: "monitoring" },
];

export function PortalHeader() {
  const pathname = usePathname();
  const pathParts = pathname.split("/").filter(Boolean);
  const workspaceSlug = pathParts[1];

  return (
    <header className="border-b border-white/15 px-6 py-4">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4">
        <Link
          href="/"
          className="text-sm font-medium opacity-90 transition-opacity hover:opacity-100"
        >
          ← LIC Web Solutions
        </Link>
        <UserButton />
      </div>
      {workspaceSlug ? (
        <div className="mx-auto mt-3 flex w-full max-w-6xl flex-wrap gap-2">
          {workspaceSections.map((section) => {
            const href = section.path
              ? `/portal/${workspaceSlug}/${section.path}`
              : `/portal/${workspaceSlug}`;
            const isActive = pathname === href;

            return (
              <Link
                key={section.label}
                href={href}
                className={`rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-wide transition ${
                  isActive
                    ? "border-white/55 bg-white/15"
                    : "border-white/20 opacity-80 hover:opacity-100"
                }`}
              >
                {section.label}
              </Link>
            );
          })}
        </div>
      ) : null}
    </header>
  );
}
