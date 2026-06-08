import { Album, Heart, History, Home, ListMusic, Mic2, Music2, Radio } from "lucide-react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

const links = [
  { to: "/", label: "Trang chủ", icon: Home },
  { to: "/songs", label: "Bài hát", icon: Music2 },
  { to: "/artists", label: "Ca sĩ", icon: Mic2 },
  { to: "/albums", label: "Album", icon: Album },
  { to: "/playlists", label: "Playlist", icon: ListMusic },
  { to: "/favorites", label: "Yêu thích", icon: Heart },
  { to: "/history", label: "Lịch sử", icon: History },
];

export default function Sidebar({ open, onClose }) {
  return (
    <aside className={clsx("fixed inset-y-0 left-0 z-40 w-64 border-r border-white/10 bg-[#070a0f]/95 p-4 text-slate-100 shadow-[18px_0_70px_rgb(0_0_0/0.35)] transition duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] lg:translate-x-0", open ? "translate-x-0" : "-translate-x-full")}>
      <NavLink to="/" onClick={onClose} className="mb-8 flex items-center gap-3 rounded-2xl bg-white/[0.04] p-3 ring-1 ring-white/10 transition hover:bg-white/[0.07]">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-emerald-400 text-slate-950 shadow-[0_16px_40px_rgb(16_185_129/0.28)]"><Radio size={22} /></div>
        <div>
          <h1 className="font-bold tracking-wide">VietMusic</h1>
          <p className="text-xs text-slate-400">Nhạc Việt mỗi ngày</p>
        </div>
      </NavLink>
      <nav className="space-y-1">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} onClick={onClose} className={({ isActive }) => clsx("flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition duration-300", isActive ? "bg-emerald-400 text-slate-950 shadow-[0_12px_28px_rgb(16_185_129/0.22)]" : "text-slate-400 hover:bg-white/[0.06] hover:text-white")}>
            <Icon size={18} /> {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
