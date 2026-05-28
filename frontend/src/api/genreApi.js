import axiosClient, { unwrap } from "./axiosClient";
export const genreApi = {
  list: (params) => unwrap(axiosClient.get("/genres", { params })),
  get: (id) => unwrap(axiosClient.get(`/genres/${id}`)),
  songs: (id, params) => unwrap(axiosClient.get(`/genres/${id}/songs`, { params })),
};
