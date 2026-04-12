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
    <main className="mx-auto w-full max-w-6xl px-6 py-10">
      <p className="text-xs uppercase tracking-[0.16em] opacity-70">
        {workspaceName} · {role}
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-3 max-w-2xl text-sm opacity-80">{description}</p>
      {children ? <div className="mt-8">{children}</div> : null}
    </main>
  );
}
