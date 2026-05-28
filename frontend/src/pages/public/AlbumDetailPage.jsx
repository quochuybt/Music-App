import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { albumApi } from "../../api/albumApi";
import Loading from "../../components/common/Loading";
import SongList from "../../components/songs/SongList";
import { DEFAULT_IMAGE } from "../../utils/constants";

export default function AlbumDetailPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  useEffect(() => { Promise.all([albumApi.get(id), albumApi.songs(id, { size: 30 })]).then(([album, songs]) => setData({ album, songs: songs.content || [] })); }, [id]);
  if (!data) return <Loading />;
  return <div className="space-y-6"><div className="flex items-center gap-5"><img src={data.album.imageUrl || DEFAULT_IMAGE} className="h-32 w-32 rounded-lg object-cover" /><div><p className="text-sm uppercase text-violet-600">Album</p><h1 className="text-3xl font-bold">{data.album.title}</h1><p className="text-slate-500">{data.album.artistName} {data.album.releaseYear ? `- ${data.album.releaseYear}` : ""}</p></div></div><SongList songs={data.songs} /></div>;
}
