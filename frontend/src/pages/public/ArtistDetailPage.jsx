import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { artistApi } from "../../api/artistApi";
import AlbumCard from "../../components/albums/AlbumCard";
import Loading from "../../components/common/Loading";
import SongList from "../../components/songs/SongList";
import { DEFAULT_IMAGE } from "../../utils/constants";

export default function ArtistDetailPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  useEffect(() => {
    Promise.all([artistApi.get(id), artistApi.songs(id, { size: 20 }), artistApi.albums(id, { size: 20 })]).then(([artist, songs, albums]) => setData({ artist, songs: songs.content || [], albums: albums.content || [] }));
  }, [id]);
  if (!data) return <Loading />;
  return (
    <div className="space-y-8">
      <header className="app-surface rounded-[2rem] p-5 md:p-7">
        <div className="flex flex-col gap-5 md:flex-row md:items-center">
          <img src={data.artist.imageUrl || DEFAULT_IMAGE} alt={data.artist.name} className="h-36 w-36 rounded-2xl object-cover ring-1 ring-white/10" />
          <div>
            <p className="page-kicker">Ca sĩ</p>
            <h1 className="mt-2 text-4xl font-extrabold text-white md:text-5xl">{data.artist.name}</h1>
            <p className="mt-3 max-w-3xl text-slate-400">{data.artist.bio}</p>
          </div>
        </div>
      </header>
      <section>
        <h2 className="mb-4 text-2xl font-bold text-white">Bài hát</h2>
        <SongList songs={data.songs} />
      </section>
      <section>
        <h2 className="mb-4 text-2xl font-bold text-white">Album</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{data.albums.map((album) => <AlbumCard key={album.id} album={album} />)}</div>
      </section>
    </div>
  );
}
