import { Link } from "react-router-dom";
import { ListMusic } from "lucide-react";

export default function PlaylistCard({ playlist }) {
  return (
    <Link to={`/playlists/${playlist.id}`} className="group block rounded-2xl bg-white/[0.04] p-5 ring-1 ring-white/10 transition duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:bg-white/[0.07]">
      <div className="mb-4 grid h-20 w-20 place-items-center rounded-2xl bg-emerald-400/12 text-emerald-200 ring-1 ring-emerald-300/20 transition group-hover:bg-emerald-400 group-hover:text-slate-950">
        <ListMusic size={34} />
      </div>
      <h3 className="font-semibold text-white">{playlist.name}</h3>
      <p className="mt-1 text-sm text-slate-400">{playlist.songs?.length || 0} bài hát</p>
    </Link>
  );
}
