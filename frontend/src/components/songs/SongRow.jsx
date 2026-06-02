import { Link } from "react-router-dom";
import { ListPlus } from "lucide-react";
import { DEFAULT_IMAGE } from "../../utils/constants";
import Button from "../common/Button";
import FavoriteButton from "./FavoriteButton";
import PlayButton from "./PlayButton";

export default function SongRow({ song, queue = [], onAddToPlaylist, onRemove, showFavorite = true }) {
  return (
    <div className="grid grid-cols-[auto_minmax(0,1fr)_146px] items-center gap-3 rounded-2xl bg-white/[0.04] p-3 ring-1 ring-white/10 transition duration-300 hover:bg-white/[0.07] md:grid-cols-[auto_minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1fr)_146px]">
      <img src={song.imageUrl || DEFAULT_IMAGE} alt={song.title} className="h-13 w-13 rounded-xl object-cover ring-1 ring-white/10" />
      <div className="min-w-0">
        <Link to={`/songs/${song.id}`} className="block truncate font-semibold text-white transition hover:text-emerald-200">{song.title}</Link>
        <p className="truncate text-sm text-slate-400 md:hidden">{song.artistName}</p>
      </div>
      <p className="hidden truncate text-sm text-slate-400 md:block">{song.artistName}</p>
      <p className="hidden truncate text-sm text-slate-400 md:block">{song.albumTitle || song.genreName}</p>
      <div className="flex items-center justify-end gap-1">
        <PlayButton song={song} queue={queue} compact />
        {showFavorite && <FavoriteButton songId={song.id} />}
        {onAddToPlaylist && <Button variant="ghost" className="h-11 w-11 px-0" onClick={() => onAddToPlaylist(song)}><ListPlus size={21} /></Button>}
        {onRemove && <Button variant="danger" className="h-9 px-3" onClick={() => onRemove(song)}>Xóa</Button>}
      </div>
    </div>
  );
}
