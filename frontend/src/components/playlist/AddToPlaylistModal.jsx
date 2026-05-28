import toast from "react-hot-toast";
import { playlistApi } from "../../api/playlistApi";
import Button from "../common/Button";
import Modal from "../common/Modal";

export default function AddToPlaylistModal({ open, onClose, song, playlists = [] }) {
  const add = async (playlistId) => {
    try {
      await playlistApi.addSong(playlistId, song.id);
      toast.success("Đã thêm vào playlist");
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Không thêm được");
    }
  };
  return (
    <Modal open={open} title="Thêm vào playlist" onClose={onClose}>
      <div className="space-y-2">
        {playlists.map((playlist) => (
          <Button key={playlist.id} variant="ghost" className="w-full justify-start" onClick={() => add(playlist.id)}>
            {playlist.name}
          </Button>
        ))}
        {!playlists.length && <p className="text-sm text-slate-500">Bạn chưa có playlist.</p>}
      </div>
    </Modal>
  );
}
