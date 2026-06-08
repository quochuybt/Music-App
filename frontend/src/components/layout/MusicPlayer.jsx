import { Pause, Play, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { audioFailed, nextSong, previousSong, setProgress, setVolume, togglePlay } from "../../features/player/playerSlice";
import { DEFAULT_IMAGE } from "../../utils/constants";
import Button from "../common/Button";

export default function MusicPlayer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { currentSong, isPlaying, progress, volume, queue, currentIndex } = useSelector((state) => state.player);
  const audioRef = useRef(null);
  const [audioError, setAudioError] = useState("");

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = Math.min(1, Math.max(0, Number(volume) / 100));
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong?.audioUrl) return;
    setAudioError("");

    if (isPlaying) {
      audio.play().catch(() => {
        // The onCanPlay handler will retry once the browser has loaded metadata.
      });
    } else {
      audio.pause();
    }
  }, [currentSong?.audioUrl, isPlaying]);

  const playLoadedAudio = () => {
    const audio = audioRef.current;
    if (!audio || !isPlaying) return;
    audio.play().catch(() => dispatch(audioFailed()));
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio?.duration || !Number.isFinite(audio.duration)) return;
    dispatch(setProgress((audio.currentTime / audio.duration) * 100));
  };

  const handleSeek = (event) => {
    const audio = audioRef.current;
    const nextProgress = Number(event.target.value);
    if (audio?.duration && Number.isFinite(audio.duration)) {
      audio.currentTime = (nextProgress / 100) * audio.duration;
    }
    dispatch(setProgress(nextProgress));
  };

  const handleAudioError = () => {
    setAudioError("Không phát được file audio");
    dispatch(audioFailed());
  };

  const syncDetailRoute = (song) => {
    if (song?.id && /^\/songs\/[^/]+$/.test(location.pathname)) {
      navigate(`/songs/${song.id}`);
    }
  };

  const handleNextSong = () => {
    const next = queue.length ? queue[(currentIndex + 1) % queue.length] : currentSong;
    dispatch(nextSong());
    syncDetailRoute(next);
  };

  const handlePreviousSong = () => {
    const previous = queue.length ? queue[currentIndex === 0 ? queue.length - 1 : currentIndex - 1] : currentSong;
    dispatch(previousSong());
    syncDetailRoute(previous);
  };

  if (!currentSong) return null;
  const hasAudio = Boolean(currentSong.audioUrl);

  return (
    <div className="player-bar fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#080b10]/92 px-3 py-3 backdrop-blur-xl lg:left-64">
      {hasAudio && (
        <audio
          ref={audioRef}
          src={currentSong.audioUrl}
          preload="metadata"
          onCanPlay={playLoadedAudio}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleNextSong}
          onError={handleAudioError}
        />
      )}
      <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto] items-center gap-3 md:grid-cols-[1fr_auto_1fr]">
        <div className="flex min-w-0 items-center gap-3">
          <img src={currentSong.imageUrl || DEFAULT_IMAGE} alt={currentSong.title || "Ảnh bài hát"} className="h-13 w-13 rounded-2xl object-cover ring-1 ring-white/10" />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">{currentSong.title || "Chọn một bài hát"}</p>
            <p className="truncate text-xs text-slate-400">{audioError || (hasAudio ? currentSong.artistName : "Bài hát này chưa có file audio")}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" className="h-12 w-12 px-0" onClick={handlePreviousSong}><SkipBack size={24} /></Button>
          <Button className="h-14 w-14 rounded-full px-0" disabled={!hasAudio} onClick={() => dispatch(togglePlay())}>{isPlaying ? <Pause size={26} /> : <Play size={26} />}</Button>
          <Button variant="ghost" className="h-12 w-12 px-0" onClick={handleNextSong}><SkipForward size={24} /></Button>
        </div>
        <div className="hidden items-center gap-3 md:flex">
          <input className="h-1.5 flex-1 cursor-pointer accent-emerald-400" type="range" min="0" max="100" value={progress} disabled={!hasAudio} onChange={handleSeek} />
          <Volume2 size={22} className="text-slate-400" />
          <input className="w-24 accent-emerald-400" type="range" min="0" max="100" value={volume} onChange={(e) => dispatch(setVolume(e.target.value))} />
        </div>
        <input className="col-span-2 h-1.5 w-full cursor-pointer accent-emerald-400 md:hidden" type="range" min="0" max="100" value={progress} disabled={!hasAudio} onChange={handleSeek} />
      </div>
    </div>
  );
}
