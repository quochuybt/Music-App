import EmptyState from "../common/EmptyState";
import Loading from "../common/Loading";

export default function DataTable({ columns, rows = [], loading }) {
  if (loading) return <Loading />;
  if (!rows.length) return <EmptyState />;
  return (
    <div className="overflow-x-auto rounded-2xl bg-white/[0.04] ring-1 ring-white/10">
      <table className="min-w-full divide-y divide-white/10 text-sm">
        <thead className="bg-white/[0.04] text-left text-xs uppercase tracking-[0.12em] text-slate-400">
          <tr>{columns.map((col) => <th key={col.key} className="px-4 py-3 font-semibold">{col.header}</th>)}</tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {rows.map((row) => (
            <tr key={row.id} className="transition hover:bg-white/[0.05]">
              {columns.map((col) => <td key={col.key} className="px-4 py-4 align-middle text-slate-200">{col.render ? col.render(row) : row[col.key]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
