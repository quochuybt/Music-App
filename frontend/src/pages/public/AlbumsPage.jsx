import { useEffect, useState } from "react";
import { albumApi } from "../../api/albumApi";
import AlbumCard from "../../components/albums/AlbumCard";
import Loading from "../../components/common/Loading";

export default function AlbumsPage() {
  const [items, setItems] = useState(null);
  useEffect(() => { albumApi.list({ size: 50 }).then((res) => setItems(res.content || [])); }, []);
  if (!items) return <Loading />;
  return <div><h1 className="mb-5 text-2xl font-bold">Album</h1><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{items.map((album) => <AlbumCard key={album.id} album={album} />)}</div></div>;
}
