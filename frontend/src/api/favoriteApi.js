import axiosClient, { unwrap } from "./axiosClient";
export const favoriteApi = {
  list: () => unwrap(axiosClient.get("/favorites")),
  add: (songId) => unwrap(axiosClient.post(`/favorites/${songId}`)),
  remove: (songId) => unwrap(axiosClient.delete(`/favorites/${songId}`)),
  check: (songId) => unwrap(axiosClient.get(`/favorites/check/${songId}`)),
};
