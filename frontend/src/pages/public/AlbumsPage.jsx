import { useEffect, useState } from "react";
import { albumApi } from "../../api/albumApi";
import AlbumCard from "../../components/albums/AlbumCard";
import Loading from "../../components/common/Loading";

export default function AlbumsPage() {
  const [items, setItems] = useState(null);
  useEffect(() => { albumApi.list({ size: 50 }).then((res) => setItems(res.content || [])); }, []);
  if (!items) return <Loading />;
  return (
    <div className="space-y-6">
      <header>
        <p className="page-kicker">Bộ sưu tập</p>
        <h1 className="mt-2 text-3xl font-extrabold text-white">Album</h1>
      </header>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{items.map((album) => <AlbumCard key={album.id} album={album} />)}</div>
    </div>
  );
}
