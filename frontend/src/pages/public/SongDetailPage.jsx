import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { songApi } from "../../api/songApi";
import Loading from "../../components/common/Loading";
import FavoriteButton from "../../components/songs/FavoriteButton";
import PlayButton from "../../components/songs/PlayButton";
import { DEFAULT_IMAGE } from "../../utils/constants";

export default function SongDetailPage() {
  const { id } = useParams();
  const [song, setSong] = useState(null);
  useEffect(() => { songApi.get(id).then(setSong); }, [id]);
  if (!song) return <Loading />;
  return (
    <div className="app-surface grid gap-7 rounded-[2rem] p-5 md:grid-cols-[320px_1fr] md:p-7">
      <img src={song.imageUrl || DEFAULT_IMAGE} alt={song.title} className="aspect-square w-full rounded-2xl object-cover ring-1 ring-white/10" />
      <div className="flex flex-col justify-center space-y-4">
        <p className="page-kicker">Bài hát</p>
        <h1 className="text-4xl font-extrabold leading-tight text-white md:text-5xl">{song.title}</h1>
        <p className="text-slate-400">{song.artistName} - {song.albumTitle || song.genreName} - {song.duration}</p>
        <p className="max-w-2xl leading-7 text-slate-300">{song.description || "Một bài hát trong thư viện VietMusic."}</p>
        <div className="flex gap-2"><PlayButton song={song} /><FavoriteButton songId={song.id} /></div>
      </div>
    </div>
  );
}
