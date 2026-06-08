import { Link } from "react-router-dom";
import { DEFAULT_IMAGE } from "../../utils/constants";
import FavoriteButton from "./FavoriteButton";
import PlayButton from "./PlayButton";

export default function SongCard({ song, queue = [], compactMobile = false }) {
  if (compactMobile) {
    return (
      <article className="group flex items-center gap-3 rounded-2xl bg-white/[0.04] p-2 ring-1 ring-white/10 transition duration-300 hover:bg-white/[0.07] sm:block sm:p-2">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-slate-900 sm:aspect-square sm:h-auto sm:w-full sm:rounded-[1rem]">
          <img src={song.imageUrl || DEFAULT_IMAGE} alt={song.title} className="h-full w-full object-cover transition duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105" />
          <div className="absolute inset-0 hidden bg-gradient-to-t from-black/72 via-black/10 to-transparent opacity-80 sm:block" />
          <div className="absolute inset-x-3 bottom-3 hidden justify-between opacity-100 transition duration-300 sm:flex md:opacity-0 md:group-hover:opacity-100">
            <PlayButton song={song} queue={queue} compact />
            <FavoriteButton songId={song.id} />
          </div>
        </div>
        <div className="min-w-0 flex-1 px-0 py-1 sm:px-1 sm:pb-2 sm:pt-3">
          <Link to={`/songs/${song.id}`} className="block truncate text-sm font-semibold text-white transition hover:text-emerald-200 sm:text-base">{song.title}</Link>
          <p className="truncate text-xs text-slate-400 sm:text-sm">{song.artistName || "VietMusic"} {song.duration ? `- ${song.duration}` : ""}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2 sm:hidden">
          <PlayButton song={song} queue={queue} compact />
          <FavoriteButton songId={song.id} size="lg" />
        </div>
      </article>
    );
  }

  return (
    <article className="group rounded-2xl bg-white/[0.04] p-2 ring-1 ring-white/10 transition duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:bg-white/[0.07]">
      <div className="relative aspect-square overflow-hidden rounded-[1rem] bg-slate-900">
        <img src={song.imageUrl || DEFAULT_IMAGE} alt={song.title} className="h-full w-full object-cover transition duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/10 to-transparent opacity-80" />
        <div className="absolute inset-x-3 bottom-3 flex justify-between opacity-100 transition duration-300 md:opacity-0 md:group-hover:opacity-100">
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
