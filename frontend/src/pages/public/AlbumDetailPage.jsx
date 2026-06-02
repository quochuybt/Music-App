import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { albumApi } from "../../api/albumApi";
import Loading from "../../components/common/Loading";
import SongList from "../../components/songs/SongList";
import { DEFAULT_IMAGE } from "../../utils/constants";

export default function AlbumDetailPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  useEffect(() => { Promise.all([albumApi.get(id), albumApi.songs(id, { size: 30 })]).then(([album, songs]) => setData({ album, songs: songs.content || [] })); }, [id]);
  if (!data) return <Loading />;
  return (
    <div className="space-y-7">
      <header className="app-surface rounded-[2rem] p-5 md:p-7">
        <div className="flex flex-col gap-5 md:flex-row md:items-end">
          <img src={data.album.imageUrl || DEFAULT_IMAGE} alt={data.album.title} className="h-44 w-44 rounded-2xl object-cover ring-1 ring-white/10" />
          <div>
            <p className="page-kicker">Album</p>
            <h1 className="mt-2 text-4xl font-extrabold leading-tight text-white md:text-5xl">{data.album.title}</h1>
            <p className="mt-3 text-slate-400">{data.album.artistName} {data.album.releaseYear ? `- ${data.album.releaseYear}` : ""}</p>
          </div>
        </div>
      </header>
      <section>
        <h2 className="mb-4 text-2xl font-bold text-white">Danh sách bài hát</h2>
        <SongList songs={data.songs} />
      </section>
    </div>
  );
}
