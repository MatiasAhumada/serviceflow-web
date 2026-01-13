import axios from "axios";

const clientAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default clientAxios;
export { clientAxios };
export { clientAxios as apiClient };
