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
    <main className="mx-auto w-full max-w-7xl px-6 py-10 pb-16">
      <p className="text-xs uppercase tracking-[0.16em] text-zinc-400">
        {workspaceName} · {role}
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-50">
        {title}
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400">
        {description}
      </p>
      {children ? (
        <div className="mt-8 space-y-8 border-t border-zinc-800/80 pt-8">
          {children}
        </div>
      ) : null}
    </main>
  );
}
