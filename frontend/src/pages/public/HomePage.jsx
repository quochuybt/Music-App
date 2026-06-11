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
  const heroSong = data.songs[0];

  return (
    <div className="space-y-10">
      <section className="on-dark overflow-hidden rounded-[2rem] bg-[#101722] ring-1 ring-white/10">
        <div className="grid min-h-[420px] gap-8 bg-[linear-gradient(115deg,rgba(5,7,10,.86),rgba(5,7,10,.52)),url('https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center p-6 md:grid-cols-[1.12fr_.88fr] md:p-10">
          <div className="flex max-w-2xl flex-col justify-center">
            <Badge tone="green">VietMusic</Badge>
            <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-[1.02] tracking-tight text-white md:text-6xl">Không gian nghe nhạc Việt mới mỗi ngày</h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-300">Khám phá bài hát, album, ca sĩ và playlist cá nhân trong một giao diện tối, nhanh và dễ nghe lâu.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/songs"><Button>Khám phá bài hát</Button></Link>
              <Link to="/albums"><Button variant="secondary">Album mới</Button></Link>
            </div>
          </div>
          <div className="hidden items-end justify-end md:flex">
            <div className="w-full max-w-sm rounded-[1.75rem] bg-white/[0.08] p-3 ring-1 ring-white/12">
              <img src={heroSong?.imageUrl || "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80"} alt={heroSong?.title || "Ảnh nhạc nổi bật"} decoding="async" fetchPriority="high" className="aspect-square w-full rounded-[1.25rem] object-cover" />
              <div className="p-4">
                <p className="page-kicker">Đang nổi bật</p>
                <h2 className="mt-2 truncate text-2xl font-bold text-white">{heroSong?.title || "Playlist buổi tối"}</h2>
                <p className="truncate text-sm text-slate-400">{heroSong?.artistName || "Tuyển tập nhạc Việt"}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="app-surface rounded-2xl p-5">
        <div className="mb-4">
          <p className="page-kicker">Thể loại</p>
          <h2 className="mt-2 text-2xl font-bold text-white">Chọn mood hôm nay</h2>
        </div>
        <div className="flex flex-wrap gap-2">{data.genres.map((genre) => <Link key={genre.id} to={`/genres/${genre.id}`}><Badge tone="green">{genre.name}</Badge></Link>)}</div>
      </section>

      <Section title="Bài hát nổi bật" to="/songs"><Grid>{data.songs.map((song) => <SongCard key={song.id} song={song} queue={data.songs} compactMobile />)}</Grid></Section>
      <Section title="Album mới" to="/albums"><Grid>{data.albums.map((album) => <AlbumCard key={album.id} album={album} />)}</Grid></Section>
      <Section title="Ca sĩ được nghe nhiều" to="/artists"><Grid scrollMobile>{data.artists.map((artist) => <ArtistCard key={artist.id} artist={artist} scrollMobile />)}</Grid></Section>
    </div>
  );
}

function Section({ title, to, children }) {
  return (
    <section>
      <div className="mb-4 flex items-end justify-between gap-4">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <Link className="text-sm font-semibold text-emerald-300 transition hover:text-emerald-100" to={to}>Xem tất cả</Link>
      </div>
      {children}
    </section>
  );
}

function Grid({ children, scrollMobile = false }) {
  if (scrollMobile) {
    return <div className="-mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4">{children}</div>;
  }
  return <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{children}</div>;
}
