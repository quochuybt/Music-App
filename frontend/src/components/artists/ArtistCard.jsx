import { Link } from "react-router-dom";
import { DEFAULT_IMAGE } from "../../utils/constants";

export default function ArtistCard({ artist }) {
  return (
    <Link to={`/artists/${artist.id}`} className="rounded-lg border border-slate-200 bg-white p-4 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      <img src={artist.imageUrl || DEFAULT_IMAGE} alt={artist.name} className="mx-auto h-28 w-28 rounded-full object-cover" />
      <h3 className="mt-3 truncate font-semibold">{artist.name}</h3>
      <p className="mt-1 line-clamp-2 text-sm text-slate-500 dark:text-slate-400">{artist.bio || "Nghe những bài hát nổi bật"}</p>
    </Link>
  );
}
