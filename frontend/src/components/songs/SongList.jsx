import EmptyState from "../common/EmptyState";
import Loading from "../common/Loading";
import SongRow from "./SongRow";

export default function SongList({ songs = [], loading, onAddToPlaylist, onRemove, showFavorite = true }) {
  if (loading) return <Loading />;
  if (!songs.length) return <EmptyState title="Chưa có bài hát" />;
  return <div className="space-y-2.5">{songs.map((song) => <SongRow key={song.id} song={song} queue={songs} onAddToPlaylist={onAddToPlaylist} onRemove={onRemove} showFavorite={showFavorite} />)}</div>;
}
