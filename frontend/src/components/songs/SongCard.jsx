import { Link } from "react-router-dom";
import { DEFAULT_IMAGE } from "../../utils/constants";
import FavoriteButton from "./FavoriteButton";
import PlayButton from "./PlayButton";

export default function SongCard({ song, queue = [] }) {
  return (
    <article className="group rounded-2xl bg-white/[0.04] p-2 ring-1 ring-white/10 transition duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:bg-white/[0.07]">
      <div className="relative aspect-square overflow-hidden rounded-[1rem] bg-slate-900">
        <img src={song.imageUrl || DEFAULT_IMAGE} alt={song.title} className="h-full w-full object-cover transition duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/10 to-transparent opacity-80" />
        <div className="absolute inset-x-3 bottom-3 flex justify-between opacity-0 transition duration-300 group-hover:opacity-100">
          <PlayButton song={song} queue={queue} compact />
          <FavoriteButton songId={song.id} />
        </div>
      </div>
      <div className="px-1 pb-2 pt-3">
        <Link to={`/songs/${song.id}`} className="block truncate font-semibold text-white transition hover:text-emerald-200">{song.title}</Link>
        <p className="truncate text-sm text-slate-400">{song.artistName || "VietMusic"} {song.duration ? `- ${song.duration}` : ""}</p>
      </div>
    </article>
  );
}
