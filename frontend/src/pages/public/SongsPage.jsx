import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { albumApi } from "../../api/albumApi";
import { artistApi } from "../../api/artistApi";
import { genreApi } from "../../api/genreApi";
import { songApi } from "../../api/songApi";
import Pagination from "../../components/common/Pagination";
import AddToPlaylistModal from "../../components/playlist/AddToPlaylistModal";
import SongFilter from "../../components/songs/SongFilter";
import SongList from "../../components/songs/SongList";
import { playlistApi } from "../../api/playlistApi";
import { useAuth } from "../../hooks/useAuth";
import { useDebounce } from "../../hooks/useDebounce";

export default function SongsPage() {
  const [params] = useSearchParams();
  const [filters, setFilters] = useState({ keyword: params.get("keyword") || "", artistId: "", albumId: "", genreId: "" });
  const debounced = useDebounce(filters);
  const [page, setPage] = useState(null);
  const [lists, setLists] = useState({ artists: [], albums: [], genres: [], playlists: [] });
  const [loading, setLoading] = useState(true);
  const [modalSong, setModalSong] = useState(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    Promise.all([artistApi.list({ size: 100 }), albumApi.list({ size: 100 }), genreApi.list({ size: 100 }), isAuthenticated ? playlistApi.list() : Promise.resolve([])])
      .then(([artists, albums, genres, playlists]) => setLists({ artists: artists.content || [], albums: albums.content || [], genres: genres.content || [], playlists }));
  }, [isAuthenticated]);

  const load = useCallback((number = 0) => {
    setLoading(true);
    songApi.list({ ...debounced, page: number, size: 10 }).then(setPage).finally(() => setLoading(false));
  }, [debounced]);
  // The effect synchronizes the song list with filter changes.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { load(0); }, [load]);

  return (
    <div className="space-y-6">
      <header className="app-surface rounded-2xl p-6">
        <p className="page-kicker">Thư viện</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-white">Bài hát</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">Tìm và nghe thư viện nhạc Việt theo ca sĩ, album hoặc thể loại.</p>
      </header>
      <SongFilter filters={filters} setFilters={setFilters} {...lists} />
      <SongList songs={page?.content || []} loading={loading} onAddToPlaylist={(song) => setModalSong(song)} />
      <Pagination page={page} onPage={load} />
      <AddToPlaylistModal
        open={Boolean(modalSong)}
        song={modalSong}
        playlists={lists.playlists}
        onClose={() => setModalSong(null)}
        onCreated={(playlist) => setLists((current) => ({ ...current, playlists: [playlist, ...current.playlists] }))}
      />
    </div>
  );
}
