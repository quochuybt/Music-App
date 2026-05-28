import { Link } from "react-router-dom";
import { DEFAULT_IMAGE } from "../../utils/constants";

export default function AlbumCard({ album }) {
  return (
    <Link to={`/albums/${album.id}`} className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      <img src={album.imageUrl || DEFAULT_IMAGE} alt={album.title} className="aspect-square w-full rounded-md object-cover" />
      <h3 className="mt-3 truncate font-semibold">{album.title}</h3>
      <p className="truncate text-sm text-slate-500 dark:text-slate-400">{album.artistName || album.releaseYear || "VietMusic"}</p>
    </Link>
  );
}
