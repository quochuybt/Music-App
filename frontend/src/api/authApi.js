import axiosClient, { unwrap } from "./axiosClient";
export const authApi = {
  login: (payload) => unwrap(axiosClient.post("/auth/login", payload)),
  googleLogin: (payload) => unwrap(axiosClient.post("/auth/google", payload)),
  register: (payload) => unwrap(axiosClient.post("/auth/register", payload)),
  me: () => unwrap(axiosClient.get("/auth/me")),
};
