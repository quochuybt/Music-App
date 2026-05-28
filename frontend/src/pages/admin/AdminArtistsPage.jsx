import { adminApi } from "../../api/adminApi";
import AdminCrudPage from "./AdminCrudPage";

export default function AdminArtistsPage() {
  return <AdminCrudPage title="Quản lý ca sĩ" resource={adminApi.artists} fields={[["name", "Tên ca sĩ"], ["imageUrl", "Image URL"], ["bio", "Bio"]]} />;
}
