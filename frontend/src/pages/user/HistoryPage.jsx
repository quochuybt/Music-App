import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { historyApi } from "../../api/historyApi";
import Button from "../../components/common/Button";
import Loading from "../../components/common/Loading";
import SongList from "../../components/songs/SongList";

export default function HistoryPage() {
  const [songs, setSongs] = useState(null);
  const load = () => historyApi.list().then(setSongs);
  useEffect(() => { load(); }, []);
  const clear = async () => { await historyApi.clear(); toast.success("Đã xóa lịch sử"); load(); };
  if (!songs) return <Loading />;
  return <div className="space-y-5"><div className="flex items-center justify-between"><h1 className="text-2xl font-bold">Lịch sử nghe</h1><Button variant="danger" onClick={clear}>Xóa tất cả</Button></div><SongList songs={songs} /></div>;
}
