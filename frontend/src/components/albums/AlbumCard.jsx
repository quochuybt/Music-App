import { Link } from "react-router-dom";
import { DEFAULT_IMAGE } from "../../utils/constants";

export default function AlbumCard({ album }) {
  return (
    <Link to={`/albums/${album.id}`} className="group rounded-2xl bg-white/[0.04] p-2 ring-1 ring-white/10 transition duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:bg-white/[0.07]">
      <img src={album.imageUrl || DEFAULT_IMAGE} alt={album.title} className="aspect-square w-full rounded-[1rem] object-cover transition duration-700 group-hover:scale-[1.03]" />
      <div className="px-1 pb-2 pt-3">
        <h3 className="truncate font-semibold text-white">{album.title}</h3>
        <p className="truncate text-sm text-slate-400">{album.artistName || album.releaseYear || "VietMusic"}</p>
      </div>
    </Link>
  );
}
