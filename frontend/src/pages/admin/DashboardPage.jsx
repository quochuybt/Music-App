import { Album, BarChart3, Heart, ListMusic, Mic2, Music2, Tags, TrendingUp, Users } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { adminApi } from "../../api/adminApi";
import Card from "../../components/common/Card";
import Loading from "../../components/common/Loading";
import { formatCount } from "../../utils/formatTime";

const toneClasses = {
  emerald: { icon: "bg-emerald-400/12 text-emerald-300 ring-emerald-300/15", bar: "bg-emerald-300" },
  cyan: { icon: "bg-cyan-400/12 text-cyan-300 ring-cyan-300/15", bar: "bg-cyan-300" },
  amber: { icon: "bg-amber-400/12 text-amber-300 ring-amber-300/15", bar: "bg-amber-300" },
  rose: { icon: "bg-rose-400/12 text-rose-300 ring-rose-300/15", bar: "bg-rose-300" },
  violet: { icon: "bg-violet-400/12 text-violet-300 ring-violet-300/15", bar: "bg-violet-300" },
  sky: { icon: "bg-sky-400/12 text-sky-300 ring-sky-300/15", bar: "bg-sky-300" },
};

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  useEffect(() => { adminApi.dashboard().then(setStats); }, []);
  const cards = useMemo(() => {
    if (!stats) return [];
    return [
      { label: "Bài hát", value: stats.totalSongs, icon: Music2, tone: "emerald" },
      { label: "Ca sĩ", value: stats.totalArtists, icon: Mic2, tone: "cyan" },
      { label: "Album", value: stats.totalAlbums, icon: Album, tone: "amber" },
      { label: "Thể loại", value: stats.totalGenres, icon: Tags, tone: "rose" },
      { label: "Người dùng", value: stats.totalUsers, icon: Users, tone: "violet" },
      { label: "Playlist", value: stats.totalPlaylists, icon: ListMusic, tone: "sky" },
    ];
  }, [stats]);

  if (!stats) return <Loading />;

  const maxValue = Math.max(...cards.map((card) => Number(card.value) || 0), 1);
  const songShare = Math.round((Number(stats.totalSongs || 0) / maxValue) * 100);

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="page-kicker">Tổng quan</p>
          <h1 className="mt-2 text-3xl font-extrabold text-white md:text-4xl">Dashboard</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">Theo dõi thư viện, người nghe và nội dung nổi bật trong hệ thống.</p>
        </div>
        <div className="app-surface inline-flex items-center gap-3 rounded-2xl px-4 py-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-400/12 text-emerald-300"><TrendingUp size={20} /></span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Tổng nội dung</p>
            <p className="tabular text-xl font-extrabold text-white">{formatCount(stats.totalSongs + stats.totalAlbums + stats.totalPlaylists)}</p>
          </div>
        </div>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
        {cards.map(({ label, value, icon: Icon, tone }) => (
          <Card key={label} className="group overflow-hidden p-4 transition duration-300 hover:-translate-y-0.5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-slate-400">{label}</p>
                <p className="tabular mt-3 text-3xl font-black text-white">{formatCount(value)}</p>
              </div>
              <div className={`grid h-11 w-11 place-items-center rounded-2xl ring-1 ${toneClasses[tone].icon}`}>
                <Icon size={21} />
              </div>
            </div>
            <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/8">
              <div className={`h-full rounded-full ${toneClasses[tone].bar}`} style={{ width: `${Math.max(8, Math.round((Number(value || 0) / maxValue) * 100))}%` }} />
            </div>
          </Card>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.35fr_.65fr]">
        <Card className="p-6">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <p className="page-kicker">Phân bổ</p>
              <h2 className="mt-2 text-2xl font-bold text-white">Thư viện hiện tại</h2>
            </div>
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/8 text-slate-300"><BarChart3 size={22} /></span>
          </div>
          <div className="space-y-4">
            {cards.slice(0, 4).map(({ label, value }) => (
              <div key={label} className="grid grid-cols-[88px_1fr_64px] items-center gap-3">
                <span className="text-sm font-semibold text-slate-400">{label}</span>
                <div className="h-3 overflow-hidden rounded-full bg-white/8">
                  <div className="h-full rounded-full bg-emerald-300" style={{ width: `${Math.max(6, Math.round((Number(value || 0) / maxValue) * 100))}%` }} />
                </div>
                <span className="tabular text-right text-sm font-bold text-white">{formatCount(value)}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl bg-white/[0.04] p-4 ring-1 ring-white/10">
            <p className="text-sm text-slate-400">Tỉ trọng bài hát so với nhóm lớn nhất</p>
            <p className="tabular mt-2 text-3xl font-black text-emerald-300">{songShare}%</p>
          </div>
        </Card>

        <div className="grid gap-4">
          <FeaturedSong icon={Heart} label="Yêu thích nhiều nhất" song={stats.mostFavoriteSong} />
          <FeaturedSong icon={TrendingUp} label="Nghe nhiều nhất" song={stats.mostPlayedSong} />
        </div>
      </section>
    </div>
  );
}

function FeaturedSong({ icon: Icon, label, song }) {
  return (
    <Card className="p-5">
      <div className="flex items-start gap-4">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-emerald-400/12 text-emerald-300 ring-1 ring-emerald-300/15">
          <Icon size={22} />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-slate-400">{label}</p>
          <h2 className="mt-2 truncate text-xl font-bold text-white">{song?.title || "Chưa có dữ liệu"}</h2>
          <p className="mt-1 truncate text-sm text-slate-500">{song?.artistName || "VietMusic"}</p>
        </div>
      </div>
    </Card>
  );
}
