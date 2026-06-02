import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { genreApi } from "../../api/genreApi";
import Loading from "../../components/common/Loading";
import SongList from "../../components/songs/SongList";

export default function GenreDetailPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  useEffect(() => { Promise.all([genreApi.get(id), genreApi.songs(id, { size: 30 })]).then(([genre, songs]) => setData({ genre, songs: songs.content || [] })); }, [id]);
  if (!data) return <Loading />;
  return (
    <div className="space-y-6">
      <header className="app-surface rounded-2xl p-6">
        <p className="page-kicker">Thể loại</p>
        <h1 className="mt-2 text-3xl font-extrabold text-white">{data.genre.name}</h1>
        <p className="mt-2 text-slate-400">{data.genre.description}</p>
      </header>
      <SongList songs={data.songs} />
    </div>
  );
}
