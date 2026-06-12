import { useEffect, useState } from "react";
import { adminApi } from "../../api/adminApi";
import { artistApi } from "../../api/artistApi";
import AdminCrudPage from "./AdminCrudPage";

export default function AdminAlbumsPage() {
  const [artists, setArtists] = useState([]);
  useEffect(() => { artistApi.list({ size: 100 }).then((res) => setArtists(res.content || [])); }, []);
  return <AdminCrudPage title="Quản lý album" resource={adminApi.albums} fields={[["title", "Tên album"], ["imageUrl", "Image URL"], ["releaseYear", "Năm phát hành"], ["description", "Mô tả"]]} selects={[["artistId", "Ca sĩ", artists, "name"]]} imageUploadFields={["imageUrl"]} />;
}
