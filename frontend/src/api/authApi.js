import axiosClient, { unwrap } from "./axiosClient";
export const authApi = {
  login: (payload) => unwrap(axiosClient.post("/auth/login", payload)),
  register: (payload) => unwrap(axiosClient.post("/auth/register", payload)),
  me: () => unwrap(axiosClient.get("/auth/me")),
};
