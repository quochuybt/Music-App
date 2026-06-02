export default function Loading({ label = "Đang tải..." }) {
  return (
    <div className="app-surface rounded-2xl p-5">
      <div className="mb-4 h-5 w-32 animate-pulse rounded-full bg-white/10" />
      <div className="grid gap-3">
        {[0, 1, 2].map((item) => <div key={item} className="h-14 animate-pulse rounded-xl bg-white/[0.06]" />)}
      </div>
      <p className="mt-4 text-sm text-slate-400">{label}</p>
    </div>
  );
}
