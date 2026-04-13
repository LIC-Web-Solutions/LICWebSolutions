/** Workspace-scoped portal sections (Overview + modules). Used by header tabs and workspace home cards. */
export const PORTAL_WORKSPACE_SECTIONS = [
  {
    label: "Overview",
    path: "" as const,
    description: "Summary of your workspace and quick links to every module.",
  },
  {
    label: "Tickets",
    path: "tickets" as const,
    description:
      "Track requests, bugs, and delivery status for your applications.",
  },
  {
    label: "Support",
    path: "support" as const,
    description:
      "Open support threads and keep implementation context in one place.",
  },
  {
    label: "Customization",
    path: "customization" as const,
    description:
      "Submit and review scoped change requests with approval milestones.",
  },
  {
    label: "Monitoring",
    path: "monitoring" as const,
    description:
      "View uptime checks and incident updates for your managed properties.",
  },
] as const;

export type PortalWorkspaceSectionPath =
  (typeof PORTAL_WORKSPACE_SECTIONS)[number]["path"];

/** Sections shown in the workspace sub-nav (skip Overview duplicate on dashboard home). */
export const PORTAL_WORKSPACE_NAV_TABS = PORTAL_WORKSPACE_SECTIONS.filter(
  (s) => s.path !== "",
);
