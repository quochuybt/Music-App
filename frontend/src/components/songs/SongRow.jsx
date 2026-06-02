import { Link } from "react-router-dom";
import { ListPlus } from "lucide-react";
import { DEFAULT_IMAGE } from "../../utils/constants";
import Button from "../common/Button";
import FavoriteButton from "./FavoriteButton";
import PlayButton from "./PlayButton";

export default function SongRow({ song, queue = [], onAddToPlaylist, onRemove, showFavorite = true }) {
  return (
    <div className="grid grid-cols-[auto_minmax(0,1fr)_146px] items-center gap-3 rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900 md:grid-cols-[auto_minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1fr)_146px]">
      <img src={song.imageUrl || DEFAULT_IMAGE} alt={song.title} className="h-12 w-12 rounded-md object-cover" />
      <div className="min-w-0">
        <Link to={`/songs/${song.id}`} className="block truncate font-semibold hover:text-violet-600">{song.title}</Link>
        <p className="truncate text-sm text-slate-500 md:hidden">{song.artistName}</p>
      </div>
      <p className="hidden truncate text-sm text-slate-500 dark:text-slate-400 md:block">{song.artistName}</p>
      <p className="hidden truncate text-sm text-slate-500 dark:text-slate-400 md:block">{song.albumTitle || song.genreName}</p>
      <div className="flex items-center justify-end gap-1">
        <PlayButton song={song} queue={queue} compact />
        {showFavorite && <FavoriteButton songId={song.id} />}
        {onAddToPlaylist && <Button variant="ghost" className="h-11 w-11 px-0" onClick={() => onAddToPlaylist(song)}><ListPlus size={21} /></Button>}
        {onRemove && <Button variant="danger" className="h-9 px-3" onClick={() => onRemove(song)}>Xóa</Button>}
      </div>
    </div>
  );
}
