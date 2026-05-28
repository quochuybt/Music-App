import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { artistApi } from "../../api/artistApi";
import AlbumCard from "../../components/albums/AlbumCard";
import Loading from "../../components/common/Loading";
import SongList from "../../components/songs/SongList";
import { DEFAULT_IMAGE } from "../../utils/constants";

export default function ArtistDetailPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  useEffect(() => {
    Promise.all([artistApi.get(id), artistApi.songs(id, { size: 20 }), artistApi.albums(id, { size: 20 })]).then(([artist, songs, albums]) => setData({ artist, songs: songs.content || [], albums: albums.content || [] }));
  }, [id]);
  if (!data) return <Loading />;
  return <div className="space-y-6"><div className="flex items-center gap-5"><img src={data.artist.imageUrl || DEFAULT_IMAGE} className="h-28 w-28 rounded-full object-cover" /><div><h1 className="text-3xl font-bold">{data.artist.name}</h1><p className="text-slate-500">{data.artist.bio}</p></div></div><section><h2 className="mb-3 text-xl font-bold">Bài hát</h2><SongList songs={data.songs} /></section><section><h2 className="mb-3 text-xl font-bold">Album</h2><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{data.albums.map((album) => <AlbumCard key={album.id} album={album} />)}</div></section></div>;
}
