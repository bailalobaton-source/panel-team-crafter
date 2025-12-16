// service/axiosInstance.ts
import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

instance.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token =
      document.cookie
        .split("; ")
        .find((cookie) => cookie.startsWith("token="))
        ?.split("=")[1] || null;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

export default instance;
