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
] as const;

export type PortalWorkspaceSectionPath =
  (typeof PORTAL_WORKSPACE_SECTIONS)[number]["path"];

/** Sections shown in the workspace sub-nav (skip Overview duplicate on dashboard home). */
export const PORTAL_WORKSPACE_NAV_TABS = PORTAL_WORKSPACE_SECTIONS.filter(
  (s) => s.path !== "",
);
