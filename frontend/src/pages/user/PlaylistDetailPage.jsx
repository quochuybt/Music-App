import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { playlistApi } from "../../api/playlistApi";
import Loading from "../../components/common/Loading";
import SongList from "../../components/songs/SongList";

export default function PlaylistDetailPage() {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const load = useCallback(() => playlistApi.get(id).then(setPlaylist), [id]);
  useEffect(() => { load(); }, [load]);
  const remove = async (song) => { await playlistApi.removeSong(id, song.id); toast.success("Đã xóa khỏi playlist"); load(); };
  if (!playlist) return <Loading />;
  return (
    <div className="space-y-6">
      <header className="app-surface rounded-2xl p-6">
        <p className="page-kicker">Playlist</p>
        <h1 className="mt-2 text-3xl font-extrabold text-white">{playlist.name}</h1>
        <p className="mt-2 text-slate-400">{playlist.description}</p>
      </header>
      <SongList songs={playlist.songs || []} onRemove={remove} />
    </div>
  );
}
