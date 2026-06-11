import { useEffect, useState } from "react";
import { ChevronDown, Clock3, Disc3, ListPlus, Pause, Play, Repeat2, Shuffle, SkipBack, SkipForward } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { playlistApi } from "../../api/playlistApi";
import { songApi } from "../../api/songApi";
import Loading from "../../components/common/Loading";
import Button from "../../components/common/Button";
import AddToPlaylistModal from "../../components/playlist/AddToPlaylistModal";
import FavoriteButton from "../../components/songs/FavoriteButton";
import { nextSong, previousSong, seekToProgress, setCurrentSong, setQueue, togglePlay, toggleRepeatMode, toggleShuffle } from "../../features/player/playerSlice";
import { useAuth } from "../../hooks/useAuth";
import { DEFAULT_IMAGE } from "../../utils/constants";

const parseDuration = (duration = "") => {
  const parts = duration.split(":").map(Number);
  if (parts.some(Number.isNaN)) return 0;
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  return 0;
};

const formatSeconds = (seconds) => {
  const safe = Math.max(0, Math.floor(seconds || 0));
  const minutes = Math.floor(safe / 60);
  const rest = safe % 60;
  return `${minutes}:${String(rest).padStart(2, "0")}`;
};

export default function SongDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth();
  const { currentSong, isPlaying, progress, queue, repeatMode, shuffle } = useSelector((state) => state.player);
  const [song, setSong] = useState(null);
  const [detailQueue, setDetailQueue] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [playlistOpen, setPlaylistOpen] = useState(false);

  useEffect(() => {
    Promise.all([songApi.get(id), songApi.list({ size: 50 })])
      .then(([songData, songPage]) => {
        const songs = songPage.content || [];
        setSong(songData);
        setDetailQueue(songs);
        dispatch(setQueue(songs.length ? songs : [songData]));
        dispatch(setCurrentSong(songData));
      });
  }, [dispatch, id]);

  useEffect(() => {
    if (!isAuthenticated) return;
    playlistApi.list().then(setPlaylists).catch(() => setPlaylists([]));
  }, [isAuthenticated]);

  if (!song) return <Loading />;

  const playingSong = currentSong || song;
  const cover = playingSong.imageUrl || song.imageUrl || DEFAULT_IMAGE;
  const durationSeconds = parseDuration(playingSong.duration || song.duration);
  const elapsed = durationSeconds * (Number(progress) / 100);
  const canSkip = queue.length > 1 || detailQueue.length > 1;
  const meta = [song.albumTitle || song.genreName, song.duration].filter(Boolean);
  const hasDescription = Boolean(song.description?.trim());

  return (
    <article className="relative -mx-4 overflow-hidden px-4 pb-8 pt-2 sm:mx-0 sm:px-0 md:pb-12">
      <div
        className="pointer-events-none absolute inset-x-[-12%] top-[-8rem] h-[32rem] opacity-45 blur-3xl"
        style={{ backgroundImage: `url(${cover})`, backgroundSize: "cover", backgroundPosition: "center" }}
      />
      <div className="pointer-events-none absolute inset-x-[-12%] top-0 h-96 bg-gradient-to-b from-emerald-950/30 via-[#10151d]/45 to-transparent" />

      <section className="app-surface on-dark relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] p-5 shadow-2xl shadow-black/25 sm:p-7 lg:p-9">
        <div className="mb-6 flex items-center justify-between text-white/90 md:hidden">
          <button type="button" onClick={() => history.back()} className="grid h-11 w-11 place-items-center rounded-full bg-white/8 transition hover:bg-white/14" aria-label="Quay lại">
            <ChevronDown size={30} />
          </button>
          <div className="min-w-0 px-4 text-center">
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-slate-300">Đang phát</p>
            <p className="truncate text-sm font-semibold">{playingSong.artistName || song.artistName}</p>
          </div>
          <div className="flex items-center gap-2">
            <FavoriteButton songId={song.id} />
            <button type="button" onClick={() => setPlaylistOpen(true)} className="grid h-11 w-11 place-items-center rounded-full bg-white/8 text-white transition hover:bg-white/14" aria-label="Thêm vào playlist">
              <ListPlus size={24} />
            </button>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(280px,430px)_1fr] lg:items-center">
          <div className="mx-auto w-full max-w-[23rem] sm:max-w-[27rem] lg:max-w-none">
            <div className="aspect-[4/3] overflow-hidden rounded-[1.35rem] bg-black shadow-[0_28px_90px_rgb(0_0_0_/_0.42)] ring-1 ring-white/10 sm:aspect-[16/10] lg:aspect-square">
              <img src={cover} alt={`Bìa bài hát ${playingSong.title || song.title}`} className="h-full w-full object-contain" />
            </div>
          </div>

          <div className="min-w-0">
            <div className="hidden items-center justify-between gap-4 md:flex">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-emerald-400/12 text-emerald-300 ring-1 ring-emerald-300/20">
                  <Disc3 size={21} />
                </span>
                <p className="page-kicker">Bài hát</p>
              </div>
              <div className="flex items-center gap-2">
                <FavoriteButton songId={song.id} size="lg" />
                <button type="button" onClick={() => setPlaylistOpen(true)} className="grid h-12 w-12 place-items-center rounded-full bg-white/8 text-white/80 ring-1 ring-white/10 transition hover:bg-white/12 hover:text-white" aria-label="Thêm vào playlist">
                  <ListPlus size={26} />
                </button>
              </div>
            </div>

            <h1 className="mt-2 text-balance text-5xl font-black leading-[0.95] text-white sm:text-6xl xl:text-7xl">{playingSong.title || song.title}</h1>
            <p className="mt-4 text-xl font-extrabold text-slate-200">{playingSong.artistName || song.artistName}</p>
            {hasDescription && <p className="mt-2 max-w-2xl text-base leading-7 text-slate-400">{song.description}</p>}

            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm font-semibold text-slate-200">
              {meta.map((item) => (
                <span key={item} className="inline-flex items-center gap-2 rounded-full bg-white/8 px-4 py-2 ring-1 ring-white/10">
                  {item === song.duration ? <Clock3 size={17} className="text-emerald-300" /> : <Disc3 size={17} className="text-emerald-300" />}
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-[#05080c]/82 p-4 shadow-2xl shadow-black/25 sm:p-5">
              <input
                className="block h-1.5 w-full cursor-pointer accent-emerald-400"
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={(event) => dispatch(seekToProgress(Number(event.target.value)))}
              />
              <div className="mt-2 flex justify-between text-xs font-semibold text-slate-500">
                <span>{formatSeconds(elapsed)}</span>
                <span>{playingSong.duration || song.duration || formatSeconds(durationSeconds)}</span>
              </div>

              <div className="mt-5 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => dispatch(toggleShuffle())}
                  className={`transition hover:scale-105 ${shuffle ? "text-emerald-400" : "text-white/65 hover:text-white"}`}
                  aria-label={shuffle ? "Tắt trộn bài" : "Trộn bài"}
                  aria-pressed={shuffle}
                >
                  <Shuffle size={25} />
                </button>
                <Button variant="ghost" className="h-12 w-12 px-0 text-white/72" disabled={!canSkip} onClick={() => dispatch(previousSong())}>
                  <SkipBack size={29} fill="currentColor" />
                </Button>
                <button
                  type="button"
                  onClick={() => dispatch(togglePlay())}
                  className="grid h-16 w-16 place-items-center rounded-full bg-emerald-400 text-black shadow-xl shadow-emerald-950/40 transition hover:scale-105 active:scale-95"
                  aria-label={isPlaying ? "Tạm dừng" : "Phát"}
                >
                  {isPlaying ? <Pause size={33} fill="currentColor" /> : <Play size={33} fill="currentColor" className="translate-x-0.5" />}
                </button>
                <Button variant="ghost" className="h-12 w-12 px-0 text-white/72" disabled={!canSkip} onClick={() => dispatch(nextSong())}>
                  <SkipForward size={29} fill="currentColor" />
                </Button>
                <button
                  type="button"
                  onClick={() => dispatch(toggleRepeatMode())}
                  className={`relative transition hover:scale-105 ${repeatMode !== "off" ? "text-emerald-400" : "text-white/65 hover:text-white"}`}
                  aria-label={repeatMode === "one" ? "Lặp lại một bài" : repeatMode === "all" ? "Lặp lại danh sách" : "Bật lặp lại"}
                  aria-pressed={repeatMode !== "off"}
                >
                  <Repeat2 size={25} />
                  {repeatMode === "one" && <span className="absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full bg-emerald-400 text-[0.62rem] font-black text-black">1</span>}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AddToPlaylistModal
        open={playlistOpen}
        onClose={() => setPlaylistOpen(false)}
        song={song}
        playlists={playlists}
        onCreated={(playlist) => setPlaylists((current) => [playlist, ...current])}
      />
    </article>
  );
}
