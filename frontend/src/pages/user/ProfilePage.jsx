import Card from "../../components/common/Card";
import Badge from "../../components/common/Badge";
import { useAuth } from "../../hooks/useAuth";

export default function ProfilePage() {
  const { user } = useAuth();
  return (
    <div className="max-w-xl">
      <h1 className="mb-5 text-2xl font-bold">Ho so</h1>
      <Card>
        <div className="flex items-center gap-4">
          <div className="grid h-16 w-16 place-items-center rounded-full bg-violet-100 text-xl font-bold text-violet-700 dark:bg-violet-950 dark:text-violet-200">{user?.fullName?.[0] || "U"}</div>
          <div><h2 className="text-xl font-bold">{user?.fullName}</h2><p className="text-slate-500">{user?.email}</p></div>
        </div>
        <div className="mt-5 flex gap-2"><Badge tone="violet">{user?.role}</Badge><Badge tone={user?.status === "ACTIVE" ? "green" : "red"}>{user?.status}</Badge></div>
      </Card>
    </div>
  );
}
