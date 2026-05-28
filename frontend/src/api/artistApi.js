import axiosClient, { unwrap } from "./axiosClient";
export const artistApi = {
  list: (params) => unwrap(axiosClient.get("/artists", { params })),
  get: (id) => unwrap(axiosClient.get(`/artists/${id}`)),
  songs: (id, params) => unwrap(axiosClient.get(`/artists/${id}/songs`, { params })),
  albums: (id, params) => unwrap(axiosClient.get(`/artists/${id}/albums`, { params })),
};
