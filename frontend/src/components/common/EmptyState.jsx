import { Music } from "lucide-react";

export default function EmptyState({ title = "Chưa có dữ liệu", description = "Thử lại sau hoặc thay đổi bộ lọc." }) {
  return (
    <div className="app-surface rounded-2xl p-8 text-center">
      <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-emerald-400/12 text-emerald-200">
        <Music className="h-6 w-6" />
      </div>
      <h3 className="font-semibold text-white">{title}</h3>
      <p className="mt-1 text-sm text-slate-400">{description}</p>
    </div>
  );
}
