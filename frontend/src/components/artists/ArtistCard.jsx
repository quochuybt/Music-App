import { Link } from "react-router-dom";
import { DEFAULT_IMAGE } from "../../utils/constants";

export default function ArtistCard({ artist }) {
  return (
    <Link to={`/artists/${artist.id}`} className="group rounded-2xl bg-white/[0.04] p-5 text-center ring-1 ring-white/10 transition duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:bg-white/[0.07]">
      <img src={artist.imageUrl || DEFAULT_IMAGE} alt={artist.name} className="mx-auto h-30 w-30 rounded-2xl object-cover ring-1 ring-white/10 transition duration-700 group-hover:scale-[1.03]" />
      <h3 className="mt-4 truncate font-semibold text-white">{artist.name}</h3>
      <p className="mt-1 line-clamp-2 text-sm text-slate-400">{artist.bio || "Những bản nhạc được nghe nhiều"}</p>
    </Link>
  );
}
