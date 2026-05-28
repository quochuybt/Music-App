import axios from "axios";
import { storage } from "../utils/storage";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api",
  headers: { "Content-Type": "application/json" },
});

export const API_ORIGIN = (import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api").replace(/\/api\/?$/, "");

// Attach JWT from localStorage for protected API calls.
axiosClient.interceptors.request.use((config) => {
  const token = storage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      storage.removeItem("token");
      storage.removeItem("user");
    }
    return Promise.reject(error);
  },
);

export const unwrap = (promise) => promise.then((res) => res.data.data);
export default axiosClient;
