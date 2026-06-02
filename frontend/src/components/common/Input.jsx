import clsx from "clsx";

export default function Input({ label, error, className, ...props }) {
  return (
    <label className="block space-y-1.5">
      {label && <span className="text-sm font-medium text-slate-200">{label}</span>}
      <input
        className={clsx("h-11 w-full rounded-xl border border-white/10 bg-white/[0.06] px-3 text-sm text-slate-100 outline-none transition duration-300 placeholder:text-slate-500 focus:border-emerald-300/60 focus:ring-4 focus:ring-emerald-300/10", className)}
        {...props}
      />
      {error && <p className="text-xs text-rose-500">{error}</p>}
    </label>
  );
}
