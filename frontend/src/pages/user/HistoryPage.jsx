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
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="page-kicker">Cá nhân</p>
          <h1 className="mt-2 text-3xl font-extrabold text-white">Lịch sử nghe</h1>
        </div>
        <Button variant="danger" onClick={clear}>Xóa tất cả</Button>
      </div>
      <SongList songs={songs} />
    </div>
  );
}
