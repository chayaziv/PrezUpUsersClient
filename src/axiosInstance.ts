import axios from "axios";
import type { AxiosInstance } from "axios";

const serverUrl = "localhost:5015";

const API: AxiosInstance = axios.create({
  baseURL: `http://${serverUrl}/api`,
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;
