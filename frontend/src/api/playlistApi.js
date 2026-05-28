import axiosClient, { unwrap } from "./axiosClient";
export const playlistApi = {
  list: () => unwrap(axiosClient.get("/playlists")),
  create: (payload) => unwrap(axiosClient.post("/playlists", payload)),
  get: (id) => unwrap(axiosClient.get(`/playlists/${id}`)),
  update: (id, payload) => unwrap(axiosClient.put(`/playlists/${id}`, payload)),
  remove: (id) => unwrap(axiosClient.delete(`/playlists/${id}`)),
  addSong: (playlistId, songId) => unwrap(axiosClient.post(`/playlists/${playlistId}/songs/${songId}`)),
  removeSong: (playlistId, songId) => unwrap(axiosClient.delete(`/playlists/${playlistId}/songs/${songId}`)),
};
