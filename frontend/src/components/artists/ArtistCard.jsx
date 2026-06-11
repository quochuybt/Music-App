import { Link } from "react-router-dom";
import { DEFAULT_IMAGE } from "../../utils/constants";

export default function ArtistCard({ artist, scrollMobile = false }) {
  return (
    <Link
      to={`/artists/${artist.id}`}
      className={`group snap-start rounded-2xl bg-white/[0.04] p-5 text-center ring-1 ring-white/10 transition duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:bg-white/[0.07] ${
        scrollMobile ? "w-64 shrink-0 sm:w-auto sm:shrink" : "w-full min-w-0"
      }`}
    >
      <img src={artist.imageUrl || DEFAULT_IMAGE} alt={artist.name} loading="lazy" decoding="async" className="mx-auto h-30 w-30 rounded-2xl object-cover ring-1 ring-white/10 transition duration-700 group-hover:scale-[1.03]" />
      <h3 className="mt-4 truncate font-semibold text-white">{artist.name}</h3>
    </Link>
  );
}
