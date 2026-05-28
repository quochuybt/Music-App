import clsx from "clsx";

export default function Select({ label, error, children, className, ...props }) {
  return (
    <label className="block space-y-1.5">
      {label && <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{label}</span>}
      <select className={clsx("h-11 w-full rounded-md border border-slate-200 bg-white px-3 text-sm outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100", className)} {...props}>
        {children}
      </select>
      {error && <p className="text-xs text-rose-500">{error}</p>}
    </label>
  );
}
