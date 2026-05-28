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
    <div className="grid gap-6 md:grid-cols-[320px_1fr]">
      <img src={song.imageUrl || DEFAULT_IMAGE} alt={song.title} className="aspect-square w-full rounded-lg object-cover" />
      <div className="space-y-4">
        <p className="text-sm uppercase text-violet-600">Song</p>
        <h1 className="text-4xl font-bold">{song.title}</h1>
        <p className="text-slate-500 dark:text-slate-400">{song.artistName} - {song.albumTitle || song.genreName} - {song.duration}</p>
        <p className="max-w-2xl text-slate-600 dark:text-slate-300">{song.description || "Một bài hát trong thư viện VietMusic."}</p>
        <div className="flex gap-2"><PlayButton song={song} /><FavoriteButton songId={song.id} /></div>
      </div>
    </div>
  );
}
