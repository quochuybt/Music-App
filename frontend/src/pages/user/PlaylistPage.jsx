import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { playlistApi } from "../../api/playlistApi";
import Button from "../../components/common/Button";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import Input from "../../components/common/Input";
import Loading from "../../components/common/Loading";
import Modal from "../../components/common/Modal";
import PlaylistCard from "../../components/playlist/PlaylistCard";
import { playlistSchema } from "../../utils/validators";

export default function PlaylistPage() {
  const [items, setItems] = useState(null);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ resolver: zodResolver(playlistSchema) });
  const load = () => playlistApi.list().then(setItems);
  useEffect(() => { load(); }, []);
  const submit = async (values) => {
    try {
      editing ? await playlistApi.update(editing.id, values) : await playlistApi.create(values);
      toast.success("Đã lưu playlist");
      setOpen(false); setEditing(null); reset(); load();
    } catch (error) { toast.error(error.response?.data?.message || "Không lưu được"); }
  };
  const remove = async () => { await playlistApi.remove(deleting.id); toast.success("Đã xóa playlist"); setDeleting(null); load(); };
  if (!items) return <Loading />;
  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between gap-4"><div><p className="page-kicker">Cá nhân</p><h1 className="mt-2 text-3xl font-extrabold text-white">Playlist của bạn</h1><p className="mt-2 text-sm text-slate-400">Tạo và quản lý bộ sưu tập nhạc.</p></div><Button onClick={() => setOpen(true)}>Tạo playlist</Button></div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{items.map((playlist) => <div key={playlist.id} className="space-y-2"><PlaylistCard playlist={playlist} /><div className="flex gap-2"><Button variant="secondary" onClick={() => { setEditing(playlist); reset(playlist); setOpen(true); }}>Sửa</Button><Button variant="danger" onClick={() => setDeleting(playlist)}>Xóa</Button></div></div>)}</div>
      <Modal open={open} title={editing ? "Sửa playlist" : "Tạo playlist"} onClose={() => { setOpen(false); setEditing(null); reset(); }}>
        <form className="space-y-4" onSubmit={handleSubmit(submit)}>
          <Input label="Ten playlist" {...register("name")} error={errors.name?.message} />
          <Input label="Mô tả" {...register("description")} />
          <Button>Lưu</Button>
        </form>
      </Modal>
      <ConfirmDialog open={Boolean(deleting)} message={`Xóa playlist ${deleting?.name}?`} onCancel={() => setDeleting(null)} onConfirm={remove} />
    </div>
  );
}
