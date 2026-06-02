import Input from "../common/Input";
import Select from "../common/Select";

export default function SongFilter({ filters, setFilters, artists = [], albums = [], genres = [] }) {
  return (
    <div className="app-surface grid gap-3 rounded-2xl p-4 md:grid-cols-4">
      <Input placeholder="Tìm bài hát, ca sĩ..." value={filters.keyword} onChange={(e) => setFilters({ ...filters, keyword: e.target.value })} />
      <Select value={filters.artistId} onChange={(e) => setFilters({ ...filters, artistId: e.target.value })}>
        <option value="">Tất cả ca sĩ</option>
        {artists.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
      </Select>
      <Select value={filters.albumId} onChange={(e) => setFilters({ ...filters, albumId: e.target.value })}>
        <option value="">Tất cả album</option>
        {albums.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}
      </Select>
      <Select value={filters.genreId} onChange={(e) => setFilters({ ...filters, genreId: e.target.value })}>
        <option value="">Tất cả thể loại</option>
        {genres.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
      </Select>
    </div>
  );
}
