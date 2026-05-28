import { Pause, Play, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextSong, previousSong, setProgress, setVolume, togglePlay } from "../../features/player/playerSlice";
import { DEFAULT_IMAGE } from "../../utils/constants";
import Button from "../common/Button";

export default function MusicPlayer() {
  const dispatch = useDispatch();
  const { currentSong, isPlaying, progress, volume } = useSelector((state) => state.player);

  useEffect(() => {
    if (!isPlaying) return undefined;
    const timer = setInterval(() => dispatch(setProgress(progress >= 100 ? 0 : progress + 1)), 900);
    return () => clearInterval(timer);
  }, [dispatch, isPlaying, progress]);

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-3 py-3 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95 lg:left-64">
      <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto] items-center gap-3 md:grid-cols-[1fr_auto_1fr]">
        <div className="flex min-w-0 items-center gap-3">
          <img src={currentSong?.imageUrl || DEFAULT_IMAGE} alt="" className="h-12 w-12 rounded-md object-cover" />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{currentSong?.title || "Chọn một bài hát"}</p>
            <p className="truncate text-xs text-slate-500 dark:text-slate-400">{currentSong?.artistName || "Player gia lap"}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" className="h-12 w-12 px-0" onClick={() => dispatch(previousSong())}><SkipBack size={24} /></Button>
          <Button className="h-14 w-14 rounded-full px-0" disabled={!currentSong} onClick={() => dispatch(togglePlay())}>{isPlaying ? <Pause size={26} /> : <Play size={26} />}</Button>
          <Button variant="ghost" className="h-12 w-12 px-0" onClick={() => dispatch(nextSong())}><SkipForward size={24} /></Button>
        </div>
        <div className="hidden items-center gap-3 md:flex">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
            <div className="h-full bg-violet-600" style={{ width: `${progress}%` }} />
          </div>
          <Volume2 size={22} className="text-slate-500" />
          <input className="w-24 accent-violet-600" type="range" min="0" max="100" value={volume} onChange={(e) => dispatch(setVolume(e.target.value))} />
        </div>
      </div>
    </div>
  );
}
