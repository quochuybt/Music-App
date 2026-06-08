import { Album, BarChart3, Home, Mic2, Music2, Radio, Tags, Users } from "lucide-react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

const links = [
  { to: "/admin/dashboard", label: "Dashboard", icon: BarChart3 },
  { to: "/admin/songs", label: "Bài hát", icon: Music2 },
  { to: "/admin/artists", label: "Ca sĩ", icon: Mic2 },
  { to: "/admin/albums", label: "Album", icon: Album },
  { to: "/admin/genres", label: "Thể loại", icon: Tags },
  { to: "/admin/users", label: "Người dùng", icon: Users },
  { to: "/", label: "Về trang nghe nhạc", icon: Home },
];

export default function AdminSidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-white/10 bg-[#070a0f]/95 p-4 text-slate-100 lg:block">
      <NavLink to="/admin/dashboard" className="mb-8 flex items-center gap-3 rounded-2xl bg-white/[0.04] p-3 ring-1 ring-white/10 transition hover:bg-white/[0.07]">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-emerald-400 text-slate-950"><Radio size={22} /></div>
        <div>
          <h1 className="font-bold">VietMusic Admin</h1>
          <p className="text-xs text-slate-400">Quản trị nội dung</p>
        </div>
      </NavLink>
      <nav className="space-y-1">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} className={({ isActive }) => clsx("flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition duration-300", isActive ? "bg-emerald-400 text-slate-950" : "text-slate-400 hover:bg-white/[0.06] hover:text-white")}>
            <Icon size={18} /> {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
