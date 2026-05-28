import { Edit, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { adminApi } from "../../api/adminApi";
import Badge from "../../components/common/Badge";
import Button from "../../components/common/Button";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import DataTable from "../../components/admin/DataTable";

export default function AdminSongsPage() {
  const [page, setPage] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const load = () => adminApi.songs.list({ size: 100 }).then(setPage);
  useEffect(() => { load(); }, []);
  const remove = async () => { await adminApi.songs.remove(deleting.id); toast.success("Đã xóa bài hát"); setDeleting(null); load(); };
  const toggle = async (row) => { await adminApi.songs.status(row.id, row.status === "ACTIVE" ? "INACTIVE" : "ACTIVE"); toast.success("Đã cập nhật trạng thái"); load(); };
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between"><h1 className="text-2xl font-bold">Quản lý bài hát</h1><Link to="/admin/songs/create"><Button><Plus size={16} /> Thêm</Button></Link></div>
      <DataTable loading={!page} rows={page?.content || []} columns={[
        { key: "title", header: "Bài hát" },
        { key: "artistName", header: "Ca sĩ" },
        { key: "genreName", header: "Thể loại" },
        { key: "status", header: "Trạng thái", render: (r) => <button onClick={() => toggle(r)}><Badge tone={r.status === "ACTIVE" ? "green" : "red"}>{r.status}</Badge></button> },
        { key: "actions", header: "", render: (r) => <div className="flex gap-2"><Link to={`/admin/songs/edit/${r.id}`}><Button variant="ghost" className="h-9 w-9 px-0"><Edit size={16} /></Button></Link><Button variant="danger" className="h-9 w-9 px-0" onClick={() => setDeleting(r)}><Trash2 size={16} /></Button></div> },
      ]} />
      <ConfirmDialog open={Boolean(deleting)} message={`Xóa bài hát ${deleting?.title}?`} onCancel={() => setDeleting(null)} onConfirm={remove} />
    </div>
  );
}
