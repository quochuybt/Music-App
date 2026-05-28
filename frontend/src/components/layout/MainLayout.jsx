import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import MusicPlayer from "./MusicPlayer";
import Footer from "./Footer";

export default function MainLayout() {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-slate-50">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      {open && <button className="fixed inset-0 z-30 bg-slate-950/40 lg:hidden" onClick={() => setOpen(false)} aria-label="Close menu" />}
      <div className="lg:pl-64">
        <Header onMenu={() => setOpen(true)} />
        <main className="mx-auto min-h-[calc(100vh-8rem)] max-w-7xl px-4 pb-28 pt-6 lg:px-6">
          <Outlet />
          <Footer />
        </main>
      </div>
      <MusicPlayer />
    </div>
  );
}
