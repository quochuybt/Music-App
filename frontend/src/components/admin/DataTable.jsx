import EmptyState from "../common/EmptyState";
import Loading from "../common/Loading";

export default function DataTable({ columns, rows = [], loading }) {
  if (loading) return <Loading />;
  if (!rows.length) return <EmptyState />;
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <table className="min-w-full divide-y divide-slate-200 text-sm dark:divide-slate-800">
        <thead className="bg-slate-50 text-left text-xs uppercase text-slate-500 dark:bg-slate-950 dark:text-slate-400">
          <tr>{columns.map((col) => <th key={col.key} className="px-4 py-3 font-semibold">{col.header}</th>)}</tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {rows.map((row) => (
            <tr key={row.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/60">
              {columns.map((col) => <td key={col.key} className="px-4 py-3 align-middle">{col.render ? col.render(row) : row[col.key]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
