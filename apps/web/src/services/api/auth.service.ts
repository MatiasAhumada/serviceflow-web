import clientAxios from "@/lib/axios";
import { API_ROUTES } from "@/constants";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  user: {
    id: string;
    email: string;
    name: string;
    planType: string;
    companyId: string | null;
    roleId: string | null;
  };
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  planType: "vendor" | "technician" | "company";
  companyId?: string;
}

// Service que se comunica con el backend NestJS
export const authApiService = {
  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await clientAxios.post<LoginResponse>(API_ROUTES.AUTH.LOGIN, data);
    return response.data;
  },

  async register(data: RegisterRequest): Promise<LoginResponse> {
    const response = await clientAxios.post<LoginResponse>(API_ROUTES.AUTH.REGISTER, data);
    return response.data;
  },

  async logout(): Promise<void> {
    await clientAxios.post(API_ROUTES.AUTH.LOGOUT);
  },
};
