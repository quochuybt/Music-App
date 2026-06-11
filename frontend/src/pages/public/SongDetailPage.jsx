import { useEffect, useState } from "react";
import { ChevronDown, Heart, MoreHorizontal, Pause, Play, Repeat2, Share2, Shuffle, SkipBack, SkipForward } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { songApi } from "../../api/songApi";
import Loading from "../../components/common/Loading";
import Button from "../../components/common/Button";
import FavoriteButton from "../../components/songs/FavoriteButton";
import { nextSong, previousSong, setCurrentSong, setProgress, setQueue, togglePlay } from "../../features/player/playerSlice";
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

  const playingSong = currentSong || song;
  const cover = playingSong.imageUrl || song.imageUrl || DEFAULT_IMAGE;
  const durationSeconds = parseDuration(playingSong.duration || song.duration);
  const elapsed = durationSeconds * (Number(progress) / 100);
  const canSkip = queue.length > 1 || detailQueue.length > 1;

  return (
    <section className="relative -mx-4 -mt-6 min-h-[calc(100dvh-2rem)] overflow-hidden px-5 pb-8 pt-5 text-white sm:mx-0 sm:rounded-[2rem] md:mx-auto md:max-w-[34rem] md:px-7 md:shadow-2xl md:shadow-black/50">
      <div
        className="absolute inset-0 scale-110 bg-cover bg-center blur-3xl"
        style={{ backgroundImage: `url(${cover})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-[#121212]/88 to-[#121212]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_4%,rgb(255_255_255_/_0.10),transparent_26rem)]" />

      <div className="relative flex min-h-[calc(100dvh-4rem)] flex-col">
        <header className="flex items-center justify-between py-2">
          <button type="button" onClick={() => history.back()} className="grid h-12 w-12 place-items-center rounded-full text-white transition hover:bg-white/10" aria-label="Quay lại">
            <ChevronDown size={34} />
          </button>
          <div className="min-w-0 px-4 text-center">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.16em] text-white/70">Đang phát từ thư viện</p>
            <p className="truncate text-base font-extrabold text-white">{playingSong.artistName || song.artistName}</p>
          </div>
          <button type="button" className="grid h-12 w-12 place-items-center rounded-full text-white transition hover:bg-white/10" aria-label="Tùy chọn">
            <MoreHorizontal size={30} />
          </button>
        </header>

        <div className="flex flex-1 flex-col justify-center">
          <div className="mx-auto mt-5 w-full max-w-[25rem] overflow-hidden rounded-xl bg-black shadow-[0_28px_90px_rgb(0_0_0_/_0.45)]">
            <img src={cover} alt={`Bìa bài hát ${playingSong.title || song.title}`} className="aspect-square w-full object-cover" />
          </div>

          <div className="mt-9 flex items-center gap-4">
            <div className="min-w-0 flex-1">
              <h1 className="truncate text-[2rem] font-extrabold leading-none text-white sm:text-4xl">{playingSong.title || song.title}</h1>
              <p className="mt-2 truncate text-xl font-semibold text-white/62">{playingSong.artistName || song.artistName}</p>
            </div>
            <FavoriteButton songId={song.id} size="lg" />
          </div>

          <div className="mt-8">
            <input
              className="block h-1.5 w-full cursor-pointer accent-white"
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={(event) => dispatch(setProgress(Number(event.target.value)))}
            />
            <div className="mt-2 flex justify-between text-sm font-medium text-white/62">
              <span>{formatSeconds(elapsed)}</span>
              <span>{playingSong.duration || song.duration || formatSeconds(durationSeconds)}</span>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <button type="button" className="text-emerald-400 transition hover:scale-105" aria-label="Trộn bài">
              <Shuffle size={30} />
            </button>
            <Button variant="ghost" className="h-14 w-14 px-0 text-white/72" disabled={!canSkip} onClick={() => dispatch(previousSong())}>
              <SkipBack size={34} fill="currentColor" />
            </Button>
            <button
              type="button"
              onClick={() => dispatch(togglePlay())}
              className="grid h-20 w-20 place-items-center rounded-full bg-white text-black shadow-2xl shadow-black/35 transition hover:scale-105 active:scale-95"
              aria-label={isPlaying ? "Tạm dừng" : "Phát"}
            >
              {isPlaying ? <Pause size={40} fill="currentColor" /> : <Play size={40} fill="currentColor" className="translate-x-0.5" />}
            </button>
            <Button variant="ghost" className="h-14 w-14 px-0 text-white/72" disabled={!canSkip} onClick={() => dispatch(nextSong())}>
              <SkipForward size={34} fill="currentColor" />
            </Button>
            <button type="button" className="text-white/72 transition hover:scale-105 hover:text-white" aria-label="Lặp lại">
              <Repeat2 size={30} />
            </button>
          </div>

          <div className="mt-9 flex items-center justify-between text-white/82">
            <button type="button" className="grid h-12 w-12 place-items-center rounded-full transition hover:bg-white/10" aria-label="Yêu thích">
              <Heart size={28} />
            </button>
            <button type="button" className="grid h-12 w-12 place-items-center rounded-full transition hover:bg-white/10" aria-label="Chia sẻ">
              <Share2 size={27} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
