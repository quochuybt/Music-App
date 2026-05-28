import { Link } from "react-router-dom";
import { ListMusic } from "lucide-react";

export default function PlaylistCard({ playlist }) {
  return (
    <Link to={`/playlists/${playlist.id}`} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-3 grid h-20 w-20 place-items-center rounded-md bg-violet-100 text-violet-600 dark:bg-violet-950 dark:text-violet-300">
        <ListMusic size={34} />
      </div>
      <h3 className="font-semibold">{playlist.name}</h3>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{playlist.songs?.length || 0} bài hát</p>
    </Link>
  );
}
