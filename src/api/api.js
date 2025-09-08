import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:2406/api/v1/",
  // baseURL: "http://localhost:5030/api/v1/",
  //   timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// Global request/response interceptors
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default API;