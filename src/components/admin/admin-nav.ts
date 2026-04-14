import {
  ClipboardList,
  CreditCard,
  FolderKanban,
  LayoutDashboard,
  MessageSquare,
  Settings,
  UserPlus,
  Users,
} from "lucide-react";

export const ADMIN_NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/clients", label: "Clients", icon: Users },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/invoices", label: "Invoices", icon: CreditCard },
] as const;

export const ADMIN_NAV_SECONDARY = [
  {
    href: "/admin/workspace-requests",
    label: "Workspace Requests",
    icon: ClipboardList,
  },
  { href: "/admin/leads", label: "Leads", icon: UserPlus },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare },
  { href: "/admin/settings", label: "Settings", icon: Settings },
] as const;
