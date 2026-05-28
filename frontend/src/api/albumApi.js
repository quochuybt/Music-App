import axiosClient, { unwrap } from "./axiosClient";
export const albumApi = {
  list: (params) => unwrap(axiosClient.get("/albums", { params })),
  get: (id) => unwrap(axiosClient.get(`/albums/${id}`)),
  songs: (id, params) => unwrap(axiosClient.get(`/albums/${id}/songs`, { params })),
};
