import axiosClient, { unwrap } from "./axiosClient";

const crud = (path) => ({
  list: (params) => unwrap(axiosClient.get(`/admin/${path}`, { params })),
  get: (id) => unwrap(axiosClient.get(`/admin/${path}/${id}`)),
  create: (payload) => unwrap(axiosClient.post(`/admin/${path}`, payload)),
  update: (id, payload) => unwrap(axiosClient.put(`/admin/${path}/${id}`, payload)),
  remove: (id) => unwrap(axiosClient.delete(`/admin/${path}/${id}`)),
  status: (id, status) => unwrap(axiosClient.patch(`/admin/${path}/${id}/status`, null, { params: { status } })),
});

export const adminApi = {
  dashboard: () => unwrap(axiosClient.get("/admin/dashboard/statistics")),
  uploadAudio: (file) => {
    const formData = new FormData();
    formData.append("file", file);
    return unwrap(axiosClient.post("/admin/uploads/audio", formData, { headers: { "Content-Type": "multipart/form-data" } }));
  },
  uploadImage: (file) => {
    const formData = new FormData();
    formData.append("file", file);
    return unwrap(axiosClient.post("/admin/uploads/image", formData, { headers: { "Content-Type": "multipart/form-data" } }));
  },
  songs: crud("songs"),
  artists: crud("artists"),
  albums: crud("albums"),
  genres: crud("genres"),
  users: {
    list: (params) => unwrap(axiosClient.get("/admin/users", { params })),
    get: (id) => unwrap(axiosClient.get(`/admin/users/${id}`)),
    lock: (id) => unwrap(axiosClient.patch(`/admin/users/${id}/lock`)),
    unlock: (id) => unwrap(axiosClient.patch(`/admin/users/${id}/unlock`)),
  },
};
