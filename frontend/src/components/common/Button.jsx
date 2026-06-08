import clsx from "clsx";

export default function Button({ children, variant = "primary", className, ...props }) {
  const variants = {
    primary: "bg-emerald-400 text-slate-950 shadow-[0_14px_34px_rgb(16_185_129/0.22)] hover:bg-emerald-300",
    secondary: "bg-white/10 text-white ring-1 ring-white/10 hover:bg-white/15",
    ghost: "bg-transparent text-slate-200 hover:bg-white/10 hover:text-white",
    danger: "bg-rose-500 text-white hover:bg-rose-400",
    dangerGhost: "bg-rose-500/12 text-rose-200 ring-1 ring-rose-400/20 hover:bg-rose-500 hover:text-white",
  };
  return (
    <button
      data-variant={variant}
      className={clsx("ui-button inline-flex h-10 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold transition duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50", variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}
