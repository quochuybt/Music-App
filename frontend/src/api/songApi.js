import axiosClient, { unwrap } from "./axiosClient";
export const songApi = {
  list: (params) => unwrap(axiosClient.get("/songs", { params })),
  search: (keyword, params = {}) => unwrap(axiosClient.get("/songs/search", { params: { keyword, ...params } })),
  get: (id) => unwrap(axiosClient.get(`/songs/${id}`)),
};
