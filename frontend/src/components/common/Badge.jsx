import clsx from "clsx";
export default function Badge({ children, tone = "slate" }) {
  const tones = {
    slate: "bg-white/10 text-slate-200 ring-1 ring-white/10",
    green: "bg-emerald-400/12 text-emerald-200 ring-1 ring-emerald-300/20",
    red: "bg-rose-400/12 text-rose-200 ring-1 ring-rose-300/20",
    violet: "bg-emerald-400/12 text-emerald-200 ring-1 ring-emerald-300/20",
  };
  return <span className={clsx("badge inline-flex rounded-full px-3 py-1 text-xs font-semibold", tones[tone])}>{children}</span>;
}
