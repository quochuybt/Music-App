import { Album, ListMusic, Mic2, Music2, Tags, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { adminApi } from "../../api/adminApi";
import Card from "../../components/common/Card";
import Loading from "../../components/common/Loading";
import { formatCount } from "../../utils/formatTime";

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  useEffect(() => { adminApi.dashboard().then(setStats); }, []);
  if (!stats) return <Loading />;
  const cards = [
    ["Bài hát", stats.totalSongs, Music2],
    ["Ca sĩ", stats.totalArtists, Mic2],
    ["Album", stats.totalAlbums, Album],
    ["Thể loại", stats.totalGenres, Tags],
    ["User", stats.totalUsers, Users],
    ["Playlist", stats.totalPlaylists, ListMusic],
  ];
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{cards.map(([label, value, Icon]) => <Card key={label}><div className="flex items-center justify-between"><div><p className="text-sm text-slate-500">{label}</p><p className="mt-2 text-3xl font-bold">{formatCount(value)}</p></div><Icon className="text-violet-500" /></div></Card>)}</div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card><p className="text-sm text-slate-500">Yêu thích nhiều nhất</p><h2 className="mt-2 text-xl font-bold">{stats.mostFavoriteSong?.title || "Chưa có dữ liệu"}</h2></Card>
        <Card><p className="text-sm text-slate-500">Nghe nhiều nhất</p><h2 className="mt-2 text-xl font-bold">{stats.mostPlayedSong?.title || "Chưa có dữ liệu"}</h2></Card>
      </div>
    </div>
  );
}
