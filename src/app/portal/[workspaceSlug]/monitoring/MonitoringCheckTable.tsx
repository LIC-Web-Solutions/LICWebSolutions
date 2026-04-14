import type { MonitoringCheck, Project } from "@prisma/client";
import { cn } from "@/lib/utils";
import portalStyle from "@/styles/portal.module.css";
import styles from "./MonitoringCheckTable.module.css";

type Row = MonitoringCheck & {
  project: Pick<Project, "id" | "name"> | null;
};

export function MonitoringCheckTable({ rows }: { rows: Row[] }) {
  if (rows.length === 0) {
    return (
      <p className={portalStyle.empty}>No monitoring checks configured yet.</p>
    );
  }

  return (
    <>
      <div className={portalStyle.mobileStack}>
        {rows.map((r) => (
          <article key={r.id} className={portalStyle.listItem}>
            <p className={styles.endpoint}>{r.endpoint}</p>
            <dl className={styles.mobileMeta}>
              <div className={styles.metaRow}>
                <dt className={styles.metaLabel}>Status</dt>
                <dd className={styles.metaValueStrong}>{r.latestStatus}</dd>
              </div>
              <div className={styles.metaRow}>
                <dt className={styles.metaLabel}>Latency ms</dt>
                <dd className={styles.metaValue}>{r.latestLatencyMs ?? "—"}</dd>
              </div>
              <div className={styles.metaRow}>
                <dt className={styles.metaLabel}>Checked</dt>
                <dd className={styles.metaValueChecked}>
                  {r.checkedAt.toISOString().slice(0, 16).replace("T", " ")}
                </dd>
              </div>
              <div className={styles.metaRow}>
                <dt className={styles.metaLabel}>Project</dt>
                <dd className={styles.metaValue}>{r.project?.name ?? "—"}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>

      <div className={cn(portalStyle.desktopTable, portalStyle.tableScroll)}>
        <table className={styles.table}>
          <thead className={portalStyle.thead}>
            <tr>
              <th className={portalStyle.th}>Endpoint</th>
              <th className={portalStyle.th}>Status</th>
              <th className={portalStyle.th}>Latency ms</th>
              <th className={portalStyle.th}>Checked</th>
              <th className={portalStyle.th}>Project</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className={portalStyle.tbodyRow}>
                <td className={cn(portalStyle.td, styles.tdEndpoint)}>
                  {r.endpoint}
                </td>
                <td className={portalStyle.td}>{r.latestStatus}</td>
                <td className={cn(portalStyle.td, styles.tdMuted)}>
                  {r.latestLatencyMs ?? "—"}
                </td>
                <td className={cn(portalStyle.td, styles.tdFaint)}>
                  {r.checkedAt.toISOString().slice(0, 16).replace("T", " ")}
                </td>
                <td className={cn(portalStyle.td, styles.tdSoft)}>
                  {r.project?.name ?? "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
