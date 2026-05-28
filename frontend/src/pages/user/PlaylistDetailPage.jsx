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
  return <div className="space-y-4"><div><h1 className="text-2xl font-bold">{playlist.name}</h1><p className="text-slate-500">{playlist.description}</p></div><SongList songs={playlist.songs || []} onRemove={remove} /></div>;
}
