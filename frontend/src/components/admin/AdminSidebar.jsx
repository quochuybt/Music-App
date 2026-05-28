import { Album, BarChart3, Home, Mic2, Music2, Tags, Users } from "lucide-react";
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
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-slate-800 bg-slate-950 p-4 text-slate-100 lg:block">
      <h1 className="mb-8 px-2 text-lg font-bold">VietMusic Admin</h1>
      <nav className="space-y-1">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} className={({ isActive }) => clsx("flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium", isActive ? "bg-violet-600 text-white" : "text-slate-300 hover:bg-slate-900")}>
            <Icon size={18} /> {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
