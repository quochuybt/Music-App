import { Music } from "lucide-react";
export default function EmptyState({ title = "Chưa có dữ liệu", description = "Thử lại sau hoặc thay đổi bộ lọc." }) {
  return (
    <div className="rounded-lg border border-dashed border-slate-300 p-8 text-center dark:border-slate-700">
      <Music className="mx-auto mb-3 h-8 w-8 text-slate-400" />
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{description}</p>
    </div>
  );
}
