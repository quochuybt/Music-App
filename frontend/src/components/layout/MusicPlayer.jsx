import { Pause, Play, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { audioFailed, nextSong, previousSong, seekToProgress, setProgress, setVolume, togglePlay } from "../../features/player/playerSlice";
import { DEFAULT_IMAGE } from "../../utils/constants";
import { fallbackToOriginalImage, getDisplayImageUrl } from "../../utils/imageUrl";
import Button from "../common/Button";

export default function MusicPlayer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { currentSong, isPlaying, progress, seekRequest, volume, queue, currentIndex, repeatMode } = useSelector((state) => state.player);
  const audioRef = useRef(null);
  const [audioError, setAudioError] = useState("");
  const isSongDetail = /^\/songs\/[^/]+$/.test(location.pathname);

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

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !seekRequest || !audio.duration || !Number.isFinite(audio.duration)) return;
    audio.currentTime = (Number(seekRequest.progress) / 100) * audio.duration;
  }, [seekRequest]);

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
    dispatch(seekToProgress(nextProgress));
  };

  const handleAudioError = () => {
    setAudioError("Không phát được file audio");
    dispatch(audioFailed());
  };

  const syncDetailRoute = useCallback((song) => {
    if (song?.id && /^\/songs\/[^/]+$/.test(location.pathname)) {
      navigate(`/songs/${song.id}`);
    }
  }, [location.pathname, navigate]);

  const handleNextSong = useCallback(() => {
    const next = queue.length ? queue[(currentIndex + 1) % queue.length] : currentSong;
    dispatch(nextSong());
    syncDetailRoute(next);
  }, [currentIndex, currentSong, dispatch, queue, syncDetailRoute]);

  const handlePreviousSong = useCallback(() => {
    const previous = queue.length ? queue[currentIndex === 0 ? queue.length - 1 : currentIndex - 1] : currentSong;
    dispatch(previousSong());
    syncDetailRoute(previous);
  }, [currentIndex, currentSong, dispatch, queue, syncDetailRoute]);

  useEffect(() => {
    if (!currentSong || !("mediaSession" in navigator) || !window.MediaMetadata) return;

    const artworkSrc = getDisplayImageUrl(currentSong.imageUrl || DEFAULT_IMAGE);
    navigator.mediaSession.metadata = new window.MediaMetadata({
      title: currentSong.title || "VietMusic",
      artist: currentSong.artistName || "",
      album: currentSong.albumTitle || "VietMusic",
      artwork: artworkSrc ? [{ src: artworkSrc, sizes: "512x512", type: "image/png" }] : [],
    });
    navigator.mediaSession.playbackState = isPlaying ? "playing" : "paused";

    const setActionHandler = (action, handler) => {
      try {
        navigator.mediaSession.setActionHandler(action, handler);
      } catch {
        // Some browsers expose Media Session but not every action.
      }
    };

    setActionHandler("play", () => {
      if (!isPlaying) dispatch(togglePlay());
    });
    setActionHandler("pause", () => {
      if (isPlaying) dispatch(togglePlay());
    });
    setActionHandler("previoustrack", handlePreviousSong);
    setActionHandler("nexttrack", handleNextSong);
    setActionHandler("seekbackward", () => {
      const audio = audioRef.current;
      if (audio?.duration) audio.currentTime = Math.max(0, audio.currentTime - 10);
    });
    setActionHandler("seekforward", () => {
      const audio = audioRef.current;
      if (audio?.duration) audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
    });
    setActionHandler("seekto", (details) => {
      const audio = audioRef.current;
      if (!audio || typeof details.seekTime !== "number") return;
      audio.currentTime = Math.min(audio.duration || details.seekTime, Math.max(0, details.seekTime));
    });
  }, [currentSong, dispatch, handleNextSong, handlePreviousSong, isPlaying]);

  const handleEnded = () => {
    const audio = audioRef.current;
    if (repeatMode === "one" && audio) {
      audio.currentTime = 0;
      audio.play().catch(() => dispatch(audioFailed()));
      return;
    }
    handleNextSong();
  };

  const openCurrentSongDetail = () => {
    if (currentSong?.id) navigate(`/songs/${currentSong.id}`);
  };

  if (!currentSong) return null;
  const hasAudio = Boolean(currentSong.audioUrl);
  const cover = currentSong.imageUrl || DEFAULT_IMAGE;
  const displayCover = getDisplayImageUrl(cover);

  return (
    <>
      {hasAudio && (
        <audio
          ref={audioRef}
          src={currentSong.audioUrl}
          preload="metadata"
          onCanPlay={playLoadedAudio}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
          onError={handleAudioError}
        />
      )}
      {!isSongDetail && (
        <div className="player-bar fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#080b10]/92 px-3 py-3 backdrop-blur-xl lg:left-64">
      <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto] items-center gap-3 md:grid-cols-[1fr_auto_1fr]">
        <button
          type="button"
          onClick={openCurrentSongDetail}
          className="flex min-w-0 items-center gap-3 rounded-2xl text-left transition hover:bg-white/[0.04] focus:outline-none focus:ring-2 focus:ring-emerald-300/70"
          title="Mở trang chi tiết bài hát"
        >
          <img src={displayCover} onError={(event) => fallbackToOriginalImage(event, cover)} alt={currentSong.title || "Ảnh bài hát"} className="h-13 w-13 rounded-2xl object-cover ring-1 ring-white/10" />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">{currentSong.title || "Chọn một bài hát"}</p>
            <p className="truncate text-xs text-slate-400">{audioError || (hasAudio ? currentSong.artistName : "Bài hát này chưa có file audio")}</p>
          </div>
        </button>
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
      )}
    </>
  );
}
