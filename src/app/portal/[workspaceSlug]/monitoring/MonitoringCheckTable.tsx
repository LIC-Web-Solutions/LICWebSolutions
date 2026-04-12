import type { MonitoringCheck, Project } from "@prisma/client";

type Row = MonitoringCheck & {
  project: Pick<Project, "id" | "name"> | null;
};

export function MonitoringCheckTable({ rows }: { rows: Row[] }) {
  if (rows.length === 0) {
    return (
      <p className="rounded-lg border border-white/10 bg-white/[0.03] p-5 text-sm opacity-80">
        No monitoring checks configured yet.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-white/10">
      <table className="w-full min-w-[520px] text-left text-sm">
        <thead className="border-b border-white/10 bg-white/[0.04] text-xs uppercase tracking-wide opacity-75">
          <tr>
            <th className="px-4 py-3 font-medium">Endpoint</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Latency ms</th>
            <th className="px-4 py-3 font-medium">Checked</th>
            <th className="px-4 py-3 font-medium">Project</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-b border-white/5 last:border-0">
              <td className="px-4 py-3 align-top font-mono text-xs opacity-90">
                {r.endpoint}
              </td>
              <td className="px-4 py-3 align-top text-xs">{r.latestStatus}</td>
              <td className="px-4 py-3 align-top text-xs opacity-80">
                {r.latestLatencyMs ?? "—"}
              </td>
              <td className="px-4 py-3 align-top text-xs opacity-70">
                {r.checkedAt.toISOString().slice(0, 16).replace("T", " ")}
              </td>
              <td className="px-4 py-3 align-top text-xs opacity-80">
                {r.project?.name ?? "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
