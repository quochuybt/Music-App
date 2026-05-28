import Button from "./Button";

export default function Pagination({ page, onPage }) {
  if (!page || page.totalPages <= 1) return null;
  return (
    <div className="mt-6 flex items-center justify-center gap-3">
      <Button variant="ghost" disabled={page.first} onClick={() => onPage(page.number - 1)}>Trước</Button>
      <span className="text-sm text-slate-500">Trang {page.number + 1} / {page.totalPages}</span>
      <Button variant="ghost" disabled={page.last} onClick={() => onPage(page.number + 1)}>Sau</Button>
    </div>
  );
}
