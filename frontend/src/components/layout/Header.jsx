import { LogOut, Menu, Moon, Search, Shield, Sun, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../common/Button";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";

export default function Header({ onMenu }) {
  const { user, isAuthenticated, logout } = useAuth();
  const { mode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <div className="flex h-16 items-center gap-3 px-4 lg:px-6">
        <Button variant="ghost" className="h-12 w-12 px-0 lg:hidden" onClick={onMenu}><Menu size={24} /></Button>
        <div className="relative max-w-xl flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input className="h-10 w-full rounded-md border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm outline-none focus:border-violet-500 dark:border-slate-800 dark:bg-slate-900" placeholder="Tìm bài hát, ca sĩ, album..." onKeyDown={(e) => e.key === "Enter" && navigate(`/songs?keyword=${encodeURIComponent(e.currentTarget.value)}`)} />
        </div>
        <Button variant="ghost" className="h-12 w-12 px-0" onClick={toggleTheme}>{mode === "dark" ? <Sun size={24} /> : <Moon size={24} />}</Button>
        {isAuthenticated ? (
          <div className="flex items-center gap-2">
            {user?.role === "ADMIN" && <Link to="/admin/dashboard"><Button variant="ghost" className="hidden sm:inline-flex"><Shield size={16} /> Admin</Button></Link>}
            <Link to="/profile" className="hidden items-center gap-2 rounded-md px-2 py-1 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-900 sm:flex"><User size={18} /> {user?.fullName}</Link>
            <Button variant="ghost" className="h-12 w-12 px-0" onClick={logout}><LogOut size={24} /></Button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link to="/login"><Button variant="ghost">Login</Button></Link>
            <Link to="/register"><Button className="hidden sm:inline-flex">Register</Button></Link>
          </div>
        )}
      </div>
    </header>
  );
}
