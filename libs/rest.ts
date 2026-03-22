import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "../store/useAuthStore";

const rest = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL + "/api",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

rest.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().token;

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

rest.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config;

    if (error.response?.status === 401) {
      console.warn("Phiên đăng nhập hết hạn!");

      useAuthStore.getState().logout();
    }

    if (!error.response) {
      console.error("Lỗi kết nối mạng, vui lòng kiểm tra lại!");
    }

    return Promise.reject(error);
  },
);

export default rest;
