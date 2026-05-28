import clsx from "clsx";

export default function Button({ children, variant = "primary", className, ...props }) {
  const variants = {
    primary: "bg-violet-600 text-white hover:bg-violet-700 dark:bg-violet-500 dark:hover:bg-violet-600",
    secondary: "bg-cyan-500 text-white hover:bg-cyan-600",
    ghost: "bg-transparent text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800",
    danger: "bg-rose-600 text-white hover:bg-rose-700",
  };
  return (
    <button
      className={clsx("inline-flex h-10 items-center justify-center gap-2 rounded-md px-4 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60", variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}
