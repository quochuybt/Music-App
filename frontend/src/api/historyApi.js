import axiosClient, { unwrap } from "./axiosClient";
export const historyApi = {
  list: () => unwrap(axiosClient.get("/history")),
  add: (songId) => unwrap(axiosClient.post(`/history/${songId}`)),
  clear: () => unwrap(axiosClient.delete("/history")),
};
