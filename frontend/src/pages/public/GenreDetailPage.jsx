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
  return <div><h1 className="mb-2 text-3xl font-bold">{data.genre.name}</h1><p className="mb-5 text-slate-500">{data.genre.description}</p><SongList songs={data.songs} /></div>;
}
