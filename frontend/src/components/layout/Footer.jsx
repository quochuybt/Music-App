import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-white/10 py-8">
      <div className="flex flex-col gap-5 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-base font-bold text-slate-300">VietMusic</p>
          <p className="mt-1 max-w-xl leading-6">Không gian nghe nhạc Việt gọn gàng cho bài hát, album, ca sĩ và playlist bạn yêu thích.</p>
        </div>
        <nav className="flex flex-wrap gap-x-5 gap-y-2 font-semibold">
          <Link className="transition hover:text-emerald-300" to="/songs">Bài hát</Link>
          <Link className="transition hover:text-emerald-300" to="/artists">Ca sĩ</Link>
          <Link className="transition hover:text-emerald-300" to="/albums">Album</Link>
          <Link className="transition hover:text-emerald-300" to="/playlists">Playlist</Link>
        </nav>
      </div>
    </footer>
  );
}
