import { ListMusic, Plus } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { playlistApi } from "../../api/playlistApi";
import { useAuth } from "../../hooks/useAuth";
import Button from "../common/Button";
import Input from "../common/Input";
import Modal from "../common/Modal";

export default function AddToPlaylistModal({ open, onClose, song, playlists = [], onCreated }) {
  const { isAuthenticated } = useAuth();
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState("");

  const add = async (playlistId) => {
    if (!isAuthenticated) return toast.error("Vui lòng đăng nhập");
    if (!song?.id) return;

    try {
      await playlistApi.addSong(playlistId, song.id);
      toast.success("Đã thêm vào playlist");
      onClose();
    } catch (error) {
      toast.error(error.response?.status === 401 ? "Phiên đăng nhập đã hết hạn" : error.response?.data?.message || "Không thêm được");
    }
  };

  const createAndAdd = async (event) => {
    event.preventDefault();
    if (!isAuthenticated) return toast.error("Vui lòng đăng nhập");

    const playlistName = name.trim();
    if (!playlistName) return toast.error("Nhập tên playlist");

    setCreating(true);
    try {
      const created = await playlistApi.create({ name: playlistName, description: "" });
      onCreated?.(created);
      setName("");

      if (song?.id) {
        await playlistApi.addSong(created.id, song.id);
        toast.success("Đã tạo playlist và thêm bài hát");
      } else {
        toast.success("Đã tạo playlist");
      }
      onClose();
    } catch (error) {
      toast.error(error.response?.status === 401 ? "Phiên đăng nhập đã hết hạn" : error.response?.data?.message || "Không tạo được playlist");
    } finally {
      setCreating(false);
    }
  };

  return (
    <Modal open={open} title="Thêm vào playlist" onClose={onClose}>
      <div className="space-y-4">
        <form onSubmit={createAndAdd} className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
          <div className="flex gap-2">
            <div className="min-w-0 flex-1">
              <Input
                className="h-10"
                placeholder="Tên playlist mới"
                value={name}
                onChange={(event) => setName(event.target.value)}
                aria-label="Tên playlist mới"
              />
            </div>
            <Button type="submit" className="h-10 shrink-0 px-3" disabled={creating}>
              <Plus size={18} />
              Tạo
            </Button>
          </div>
        </form>

        <div className="max-h-72 space-y-2 overflow-y-auto pr-1">
          {playlists.map((playlist) => (
            <Button key={playlist.id} variant="ghost" className="h-12 w-full justify-start rounded-2xl" onClick={() => add(playlist.id)}>
              <ListMusic size={19} />
              <span className="truncate">{playlist.name}</span>
            </Button>
          ))}
          {!playlists.length && <p className="rounded-2xl bg-white/[0.04] px-4 py-3 text-sm text-slate-400">Bạn chưa có playlist. Tạo playlist mới ở trên để thêm bài hát ngay.</p>}
        </div>
      </div>
    </Modal>
  );
}
