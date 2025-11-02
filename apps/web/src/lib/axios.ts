import axios from "axios";

const clientAxios = axios.create({
  baseURL: "http://localhost:3010",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor para agregar token si existe
clientAxios.interceptors.request.use(
  (config) => {
    // Aquí puedes agregar el token de autenticación si lo necesitas
    // const token = getToken();
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
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
  }
);

export default clientAxios;