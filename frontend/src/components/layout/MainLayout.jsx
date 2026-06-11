import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./Header";
import Sidebar from "./Sidebar";
import MusicPlayer from "./MusicPlayer";
import Footer from "./Footer";
import { preloadHomeData } from "../../data/homeData";

export default function MainLayout() {
  const [open, setOpen] = useState(false);
  const currentSong = useSelector((state) => state.player.currentSong);
  const location = useLocation();
  const isSongDetail = /^\/songs\/[^/]+$/.test(location.pathname);

  useEffect(() => {
    const preload = () => {
      import("../../pages/public/HomePage");
      preloadHomeData();
    };

    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(preload, { timeout: 2500 });
      return () => window.cancelIdleCallback(id);
    }

    const id = window.setTimeout(preload, 900);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <div className="min-h-[100dvh] overflow-x-hidden text-slate-50">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      {open && <button className="fixed inset-0 z-30 bg-black/70 lg:hidden" onClick={() => setOpen(false)} aria-label="Close menu" />}
      <div className="min-w-0 lg:pl-64">
        <Header onMenu={() => setOpen(true)} />
        <main className={`mx-auto min-h-[calc(100dvh-8rem)] max-w-7xl px-4 pt-6 lg:px-8 ${currentSong && !isSongDetail ? "pb-32" : "pb-8"}`}>
          <Outlet />
          <Footer />
        </main>
      </div>
      {currentSong && <MusicPlayer />}
    </div>
  );
}
