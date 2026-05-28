export default function Loading({ label = "Đang tải..." }) {
  return <div className="py-10 text-center text-sm text-slate-500 dark:text-slate-400">{label}</div>;
}
