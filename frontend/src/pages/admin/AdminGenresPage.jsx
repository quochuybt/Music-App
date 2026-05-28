import { adminApi } from "../../api/adminApi";
import AdminCrudPage from "./AdminCrudPage";

export default function AdminGenresPage() {
  return <AdminCrudPage title="Quản lý thể loại" resource={adminApi.genres} fields={[["name", "Tên thể loại"], ["description", "Mô tả"]]} />;
}
