import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { favoriteApi } from "../../api/favoriteApi";
import Loading from "../../components/common/Loading";
import SongList from "../../components/songs/SongList";

export default function FavoritesPage() {
  const [songs, setSongs] = useState(null);
  const load = () => favoriteApi.list().then(setSongs);
  useEffect(() => { load(); }, []);
  const remove = async (song) => { await favoriteApi.remove(song.id); toast.success("Đã bỏ yêu thích"); load(); };
  if (!songs) return <Loading />;
  return <div><h1 className="mb-5 text-2xl font-bold">Bài hát yêu thích</h1><SongList songs={songs} onRemove={remove} /></div>;
}
