import axios from "axios";
import { getSession } from "next-auth/react";

const clientAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

clientAxios.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    if (session?.user?.accessToken) {
      config.headers.Authorization = `Bearer ${session.user.accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor para manejar errores globalmente
clientAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Manejar errores globalmente
    if (error.response?.status === 401) {
      // Redirigir a login si es necesario
      console.warn("Unauthorized access");
    }
    return Promise.reject(error);
  },
);

export default clientAxios;
export { clientAxios };
