import { useEffect, useState } from "react";
import { artistApi } from "../../api/artistApi";
import ArtistCard from "../../components/artists/ArtistCard";
import Loading from "../../components/common/Loading";

export default function ArtistsPage() {
  const [items, setItems] = useState(null);
  useEffect(() => { artistApi.list({ size: 50 }).then((res) => setItems(res.content || [])); }, []);
  if (!items) return <Loading />;
  return <div><h1 className="mb-5 text-2xl font-bold">Ca sĩ</h1><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{items.map((artist) => <ArtistCard key={artist.id} artist={artist} />)}</div></div>;
}
