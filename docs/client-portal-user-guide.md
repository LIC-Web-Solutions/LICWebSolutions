# LIC client portal — user guide

This guide is for **clients and stakeholders** who use the signed-in portal at `/portal`. It explains what each screen does and how to work with LIC Web Solutions through the app.

For technical architecture (Clerk, Prisma, routes), see [portal-architecture.md](./portal-architecture.md).

## How you get in

1. From the marketing site, use **Client login** (or your invite link). You sign in with **Clerk** at `/sign-in`.
2. After sign-in, you land on **`/portal`**. Depending on your account:
   - You pick which client workspace to open from the workspace chooser.
   - **No workspace yet:** you see **Access pending** until LIC adds you to a workspace in the database.

Workspace membership is **not** managed in the Clerk Dashboard; LIC assigns you to a `Workspace` in Postgres. Until that exists, the portal cannot show your project data.

## Workspace home (`/portal/[workspaceSlug]`)

This is your **dashboard** for one commissioned engagement (one **workspace**):

- **Summary numbers** at the top reflect live data for that workspace: open tickets, open support threads, active customization requests, and how many monitoring checks exist.
- **Module cards** below take you to the four main areas: **Tickets**, **Support**, **Customization**, and **Monitoring**.

Use the **sidebar** to move between Overview and those modules. Use **Switch workspace** in the top bar when you belong to more than one workspace.

## Modules (what each is for)

### Tickets

Track requests, bugs, and delivery-related items for your workspace. What you can do (create, edit, assign) depends on your **role** in that workspace (OWNER, ADMIN, MEMBER, VIEWER). LIC configures roles when you are added.

### Support

Start or continue **support threads** with LIC so questions and context stay in one place instead of only email.

### Customization

Submit and follow **scoped change requests** (quotes, approvals, delivery states) for work beyond the original scope, when your agreement includes that workflow.

### Monitoring

See **uptime checks** and status information LIC has configured for properties or endpoints tied to your workspace.

## If something looks wrong

| Screen | Meaning |
|--------|---------|
| **Access pending** | You are signed in but LIC has not linked you to any workspace yet. Contact your LIC contact so they can add your account to the correct workspace. |
| **Access denied** | You opened a workspace URL you are not a member of, or your role cannot use that page. Use **portal home** to pick a workspace you belong to, or ask LIC to fix membership or the link they sent you. |

## Privacy and security

- You only see data for workspaces where you have a **membership** row in the database.
- Do not share sign-in links or workspace URLs with people outside your organization unless LIC has agreed to add them.
