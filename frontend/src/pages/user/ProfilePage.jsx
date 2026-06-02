import Card from "../../components/common/Card";
import Badge from "../../components/common/Badge";
import { useAuth } from "../../hooks/useAuth";

export default function ProfilePage() {
  const { user } = useAuth();
  return (
    <div className="max-w-xl space-y-6">
      <header>
        <p className="page-kicker">Tài khoản</p>
        <h1 className="mt-2 text-3xl font-extrabold text-white">Hồ sơ</h1>
      </header>
      <Card>
        <div className="flex items-center gap-4">
          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-emerald-400 text-xl font-bold text-slate-950">{user?.fullName?.[0] || "U"}</div>
          <div>
            <h2 className="text-xl font-bold text-white">{user?.fullName}</h2>
            <p className="text-slate-400">{user?.email}</p>
          </div>
        </div>
        <div className="mt-5 flex gap-2"><Badge tone="green">{user?.role}</Badge><Badge tone={user?.status === "ACTIVE" ? "green" : "red"}>{user?.status}</Badge></div>
      </Card>
    </div>
  );
}
