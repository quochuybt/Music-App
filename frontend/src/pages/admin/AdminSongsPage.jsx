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
  const remove = async () => {
    try {
      await adminApi.songs.remove(deleting.id);
      toast.success("Đã xóa bài hát");
      setDeleting(null);
      load();
    } catch (error) {
      toast.error(error.response?.data?.message || "Không xóa được bài hát");
    }
  };
  const toggle = async (row) => {
    try {
      await adminApi.songs.status(row.id, row.status === "ACTIVE" ? "INACTIVE" : "ACTIVE");
      toast.success("Đã cập nhật trạng thái");
      load();
    } catch (error) {
      toast.error(error.response?.data?.message || "Không cập nhật được trạng thái");
    }
  };
  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between gap-4"><div><p className="page-kicker">Nội dung</p><h1 className="mt-2 text-3xl font-extrabold text-white">Quản lý bài hát</h1></div><Link to="/admin/songs/create"><Button><Plus size={20} /> Thêm</Button></Link></div>
      <DataTable loading={!page} rows={page?.content || []} columns={[
        { key: "title", header: "Bài hát" },
        { key: "artistName", header: "Ca sĩ" },
        { key: "genreName", header: "Thể loại" },
        { key: "status", header: "Trạng thái", render: (r) => <button onClick={() => toggle(r)}><Badge tone={r.status === "ACTIVE" ? "green" : "red"}>{r.status}</Badge></button> },
        { key: "actions", header: "", render: (r) => <div className="flex justify-end gap-2"><Link to={`/admin/songs/edit/${r.id}`}><Button variant="secondary" className="h-11 w-11 px-0" title="Sửa"><Edit size={20} /></Button></Link><Button variant="dangerGhost" className="h-11 w-11 px-0" title="Xóa" onClick={() => setDeleting(r)}><Trash2 size={20} /></Button></div> },
      ]} />
      <ConfirmDialog open={Boolean(deleting)} message={`Xóa bài hát ${deleting?.title}?`} onCancel={() => setDeleting(null)} onConfirm={remove} />
    </div>
  );
}
