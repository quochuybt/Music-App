import clsx from "clsx";

export default function Input({ label, error, className, ...props }) {
  return (
    <label className="block space-y-1.5">
      {label && <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{label}</span>}
      <input
        className={clsx("h-11 w-full rounded-md border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-violet-900", className)}
        {...props}
      />
      {error && <p className="text-xs text-rose-500">{error}</p>}
    </label>
  );
}
