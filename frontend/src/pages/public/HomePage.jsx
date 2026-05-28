import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { albumApi } from "../../api/albumApi";
import { artistApi } from "../../api/artistApi";
import { genreApi } from "../../api/genreApi";
import { songApi } from "../../api/songApi";
import AlbumCard from "../../components/albums/AlbumCard";
import ArtistCard from "../../components/artists/ArtistCard";
import Badge from "../../components/common/Badge";
import Button from "../../components/common/Button";
import Loading from "../../components/common/Loading";
import SongCard from "../../components/songs/SongCard";

export default function HomePage() {
  const [data, setData] = useState({ songs: [], albums: [], artists: [], genres: [] });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Promise.all([
      songApi.list({ size: 8 }),
      albumApi.list({ size: 4 }),
      artistApi.list({ size: 4 }),
      genreApi.list({ size: 8 }),
    ]).then(([songs, albums, artists, genres]) => {
      setData({ songs: songs.content || [], albums: albums.content || [], artists: artists.content || [], genres: genres.content || [] });
    }).finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;
  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-lg bg-slate-950 text-white">
        <div className="grid min-h-[320px] items-center bg-[linear-gradient(120deg,rgba(124,58,237,.85),rgba(6,182,212,.55)),url('https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center p-6 md:p-10">
          <div className="max-w-2xl">
            <Badge tone="violet">VietMusic</Badge>
            <h1 className="mt-4 text-4xl font-bold md:text-6xl">Không gian nghe nhạc Việt mới mỗi ngày</h1>
            <p className="mt-4 max-w-xl text-slate-100">Khám phá bài hát, ca sĩ, album và playlist cá nhân trong một trải nghiệm gọn gàng, nhanh, hiện đại.</p>
            <Link to="/songs"><Button className="mt-6">Khám phá bài hát</Button></Link>
          </div>
        </div>
      </section>
      <Section title="Bài hát nổi bật" to="/songs"><Grid>{data.songs.map((song) => <SongCard key={song.id} song={song} queue={data.songs} />)}</Grid></Section>
      <Section title="Album mới" to="/albums"><Grid>{data.albums.map((album) => <AlbumCard key={album.id} album={album} />)}</Grid></Section>
      <Section title="Ca sĩ" to="/artists"><Grid>{data.artists.map((artist) => <ArtistCard key={artist.id} artist={artist} />)}</Grid></Section>
      <section>
        <h2 className="mb-4 text-xl font-bold">Thể loại</h2>
        <div className="flex flex-wrap gap-2">{data.genres.map((genre) => <Link key={genre.id} to={`/genres/${genre.id}`}><Badge tone="violet">{genre.name}</Badge></Link>)}</div>
      </section>
    </div>
  );
}

function Section({ title, to, children }) {
  return <section><div className="mb-4 flex items-center justify-between"><h2 className="text-xl font-bold">{title}</h2><Link className="text-sm font-semibold text-violet-600" to={to}>Xem tất cả</Link></div>{children}</section>;
}
function Grid({ children }) {
  return <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{children}</div>;
}
