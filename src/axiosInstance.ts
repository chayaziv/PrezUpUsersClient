import axios from "axios";
import type { AxiosInstance } from "axios";

//const serverUrl = "prezupapi.onrender.com"
const temp = "http://localhost:5015";
const API: AxiosInstance = axios.create({
  // baseURL: `https://${serverUrl}/api`,
  baseURL: `${temp}/api`,
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
