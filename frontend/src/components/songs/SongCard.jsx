import { Link } from "react-router-dom";
import { DEFAULT_IMAGE } from "../../utils/constants";
import FavoriteButton from "./FavoriteButton";
import PlayButton from "./PlayButton";

export default function SongCard({ song, queue = [] }) {
  return (
    <div className="group rounded-lg border border-slate-200 bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      <div className="relative aspect-square overflow-hidden rounded-md bg-slate-100 dark:bg-slate-800">
        <img src={song.imageUrl || DEFAULT_IMAGE} alt={song.title} className="h-full w-full object-cover" />
        <div className="absolute inset-x-3 bottom-3 flex justify-between opacity-0 transition group-hover:opacity-100">
          <PlayButton song={song} queue={queue} compact />
          <FavoriteButton songId={song.id} />
        </div>
      </div>
      <Link to={`/songs/${song.id}`} className="mt-3 block truncate font-semibold hover:text-violet-600">{song.title}</Link>
      <p className="truncate text-sm text-slate-500 dark:text-slate-400">{song.artistName || "VietMusic"} {song.duration ? `- ${song.duration}` : ""}</p>
    </div>
  );
}
