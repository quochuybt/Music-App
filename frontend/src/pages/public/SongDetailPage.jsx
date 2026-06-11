import { useEffect, useState } from "react";
import { ChevronDown, Clock3, Disc3, MoreVertical, Music2, Pause, Play, SkipBack, SkipForward } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { songApi } from "../../api/songApi";
import Loading from "../../components/common/Loading";
import Button from "../../components/common/Button";
import FavoriteButton from "../../components/songs/FavoriteButton";
import { nextSong, previousSong, setCurrentSong, setProgress, setQueue, togglePlay } from "../../features/player/playerSlice";
import { DEFAULT_IMAGE } from "../../utils/constants";

export default function SongDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentSong, isPlaying, progress, queue } = useSelector((state) => state.player);
  const [song, setSong] = useState(null);
  const [detailQueue, setDetailQueue] = useState([]);

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

  if (!song) return <Loading />;

  const cover = song.imageUrl || DEFAULT_IMAGE;
  const playingSong = currentSong || song;
  const playerCover = playingSong.imageUrl || DEFAULT_IMAGE;
  const subtitleParts = [song.artistName, song.albumTitle || song.genreName, song.duration].filter(Boolean);
  const description = song.description || "Một bài hát trong thư viện VietMusic.";
  const canSkip = queue.length > 1 || detailQueue.length > 1;

  const handleNext = () => {
    if (!canSkip) return;
    dispatch(nextSong());
  };

  const handlePrevious = () => {
    if (!canSkip) return;
    dispatch(previousSong());
  };

  return (
    <article className="relative -mx-4 overflow-hidden px-4 pb-8 pt-2 sm:mx-0 sm:px-0 md:pb-12">
      <div
        className="pointer-events-none absolute inset-x-[-18%] top-[-7rem] h-[28rem] opacity-50 blur-3xl"
        style={{
          background: `radial-gradient(circle at 34% 18%, rgb(16 185 129 / 0.30), transparent 19rem), url(${cover}) center / cover`,
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-5 flex items-center justify-between text-white/90 md:hidden">
          <button type="button" onClick={() => history.back()} className="grid h-11 w-11 place-items-center rounded-full bg-white/8 transition hover:bg-white/14" aria-label="Quay lại">
            <ChevronDown size={30} />
          </button>
          <div className="text-center">
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-slate-300">Đang phát</p>
            <p className="max-w-44 truncate text-sm font-semibold">{playingSong.artistName || song.artistName}</p>
          </div>
          <button type="button" className="grid h-11 w-11 place-items-center rounded-full bg-white/8 transition hover:bg-white/14" aria-label="Tùy chọn">
            <MoreVertical size={24} />
          </button>
        </div>

        <div className="app-surface on-dark overflow-hidden rounded-[2rem] p-5 sm:p-7 md:grid md:grid-cols-[minmax(280px,420px)_1fr] md:gap-9 lg:p-9">
          <div className="mx-auto w-full max-w-[25rem] md:max-w-none">
            <div className="relative overflow-hidden rounded-[1.65rem] bg-black shadow-2xl shadow-emerald-950/30 ring-1 ring-white/12">
              <img src={cover} alt={`Bìa bài hát ${song.title}`} className="aspect-square w-full object-cover" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/18 via-transparent to-white/5" />
            </div>
          </div>

          <div className="mt-7 flex flex-col justify-center md:mt-0">
            <div className="hidden items-center gap-3 md:flex">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-emerald-400/12 text-emerald-300 ring-1 ring-emerald-300/20">
                <Music2 size={20} />
              </span>
              <p className="page-kicker">Bài hát</p>
            </div>

            <h1 className="mt-4 text-balance text-5xl font-extrabold leading-[0.95] text-white sm:text-6xl lg:text-7xl">{song.title}</h1>
            <p className="mt-4 text-lg font-semibold text-slate-300 md:text-xl">{song.artistName}</p>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">{description}</p>

            <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-300">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/7 px-4 py-2 ring-1 ring-white/10">
                <Disc3 size={17} className="text-emerald-300" />
                {song.albumTitle || song.genreName || "VietMusic"}
              </span>
              {song.duration && (
                <span className="inline-flex items-center gap-2 rounded-full bg-white/7 px-4 py-2 ring-1 ring-white/10">
                  <Clock3 size={17} className="text-emerald-300" />
                  {song.duration}
                </span>
              )}
            </div>

            <div className="mt-8 flex items-center gap-3">
              <FavoriteButton songId={song.id} size="lg" />
            </div>

            <div className="mt-9 border-t border-white/10 pt-5">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Thông tin</p>
              <p className="mt-3 text-sm leading-6 text-slate-400">{subtitleParts.join(" • ")}</p>
            </div>
          </div>
        </div>

        <section className="on-dark sticky bottom-4 z-30 mx-auto -mt-5 max-w-3xl overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#05080c]/94 shadow-2xl shadow-black/40 backdrop-blur-xl md:bottom-6">
          <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 py-3">
            <img src={playerCover} alt={`Bìa bài hát ${playingSong.title}`} className="h-14 w-14 rounded-2xl object-cover ring-1 ring-white/10" />
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-white">{playingSong.title || song.title}</p>
              <p className="truncate text-xs text-slate-400">{playingSong.artistName || song.artistName}</p>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" className="hidden h-11 w-11 px-0 sm:inline-flex" disabled={!canSkip} onClick={handlePrevious}><SkipBack size={22} /></Button>
              <Button className="h-14 w-14 rounded-2xl px-0" onClick={() => dispatch(togglePlay())}>
                {isPlaying ? <Pause size={27} /> : <Play size={27} />}
              </Button>
              <Button variant="ghost" className="hidden h-11 w-11 px-0 sm:inline-flex" disabled={!canSkip} onClick={handleNext}><SkipForward size={22} /></Button>
            </div>
          </div>
          <input className="block h-1.5 w-full cursor-pointer accent-emerald-400" type="range" min="0" max="100" value={progress} onChange={(event) => dispatch(setProgress(Number(event.target.value)))} />
        </section>
      </div>
    </article>
  );
}
