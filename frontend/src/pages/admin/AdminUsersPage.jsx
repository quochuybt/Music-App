import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { adminApi } from "../../api/adminApi";
import DataTable from "../../components/admin/DataTable";
import Badge from "../../components/common/Badge";
import Button from "../../components/common/Button";

export default function AdminUsersPage() {
  const [page, setPage] = useState(null);
  const load = () => adminApi.users.list({ size: 100 }).then(setPage);
  useEffect(() => { load(); }, []);
  const toggle = async (user) => {
    user.status === "ACTIVE" ? await adminApi.users.lock(user.id) : await adminApi.users.unlock(user.id);
    toast.success("Đã cập nhật người dùng");
    load();
  };
  return <div className="space-y-4"><h1 className="text-2xl font-bold">Quản lý người dùng</h1><DataTable loading={!page} rows={page?.content || []} columns={[
    { key: "fullName", header: "Họ tên" },
    { key: "email", header: "Email" },
    { key: "role", header: "Role", render: (r) => <Badge tone="violet">{r.role}</Badge> },
    { key: "status", header: "Trạng thái", render: (r) => <Badge tone={r.status === "ACTIVE" ? "green" : "red"}>{r.status}</Badge> },
    { key: "actions", header: "", render: (r) => <Button variant={r.status === "ACTIVE" ? "danger" : "secondary"} onClick={() => toggle(r)}>{r.status === "ACTIVE" ? "Khóa" : "Mở khóa"}</Button> },
  ]} /></div>;
}
