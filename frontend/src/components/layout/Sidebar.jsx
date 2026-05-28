import { Album, Heart, History, Home, ListMusic, Mic2, Music2 } from "lucide-react";
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
    <aside className={clsx("fixed inset-y-0 left-0 z-40 w-64 border-r border-slate-200 bg-white p-4 transition dark:border-slate-800 dark:bg-slate-950 lg:translate-x-0", open ? "translate-x-0" : "-translate-x-full")}>
      <div className="mb-8 flex items-center gap-2 px-2">
        <div className="grid h-10 w-10 place-items-center rounded-md bg-violet-600 text-white"><Music2 size={22} /></div>
        <div>
          <h1 className="font-bold">VietMusic</h1>
          <p className="text-xs text-slate-500">Vietnam sounds</p>
        </div>
      </div>
      <nav className="space-y-1">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} onClick={onClose} className={({ isActive }) => clsx("flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition", isActive ? "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-200" : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900")}>
            <Icon size={18} /> {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
