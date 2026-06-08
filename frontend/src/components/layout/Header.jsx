import { LogOut, Menu, Search, Shield, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../common/Button";
import ConfirmDialog from "../common/ConfirmDialog";
import { useAuth } from "../../hooks/useAuth";

export default function Header({ onMenu }) {
  const { user, isAuthenticated, logout } = useAuth();
  const [confirmLogout, setConfirmLogout] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setConfirmLogout(false);
    navigate("/");
  };

  return (
    <header className="app-header sticky top-0 z-30 border-b border-white/10 bg-[#080b10]/82 backdrop-blur-xl">
      <div className="flex h-[72px] items-center gap-3 px-4 py-3 lg:px-8">
        <Button variant="ghost" className="h-12 w-12 px-0 lg:hidden" onClick={onMenu}><Menu size={24} /></Button>
        <div className="relative w-full max-w-xl">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input className="h-11 w-full rounded-2xl border border-white/10 bg-white/[0.06] pl-11 pr-3 text-sm text-slate-100 outline-none transition duration-300 placeholder:text-slate-500 focus:border-emerald-300/60 focus:ring-4 focus:ring-emerald-300/10" placeholder="Tìm bài hát, ca sĩ, album..." onKeyDown={(e) => e.key === "Enter" && navigate(`/songs?keyword=${encodeURIComponent(e.currentTarget.value)}`)} />
        </div>
        {isAuthenticated ? (
          <div className="ml-auto flex items-center gap-2">
            {user?.role === "ADMIN" && <Link to="/admin/dashboard"><Button variant="ghost" className="hidden sm:inline-flex"><Shield size={16} /> Admin</Button></Link>}
            <Link to="/profile" className="hidden items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-slate-200 transition hover:bg-white/10 sm:flex"><User size={18} /> {user?.fullName}</Link>
            <Button variant="ghost" className="h-12 w-12 px-0" onClick={() => setConfirmLogout(true)} title="Đăng xuất"><LogOut size={24} /></Button>
          </div>
        ) : (
          <div className="ml-auto flex items-center gap-2">
            <Link to="/login"><Button variant="ghost">Đăng nhập</Button></Link>
            <Link to="/register"><Button className="hidden sm:inline-flex">Đăng ký</Button></Link>
          </div>
        )}
      </div>
      <ConfirmDialog
        open={confirmLogout}
        title="Đăng xuất"
        message="Bạn có chắc chắn muốn đăng xuất?"
        confirmLabel="Đăng xuất"
        confirmVariant="danger"
        onCancel={() => setConfirmLogout(false)}
        onConfirm={handleLogout}
      />
    </header>
  );
}
