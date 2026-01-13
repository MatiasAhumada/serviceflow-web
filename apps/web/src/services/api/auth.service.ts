import clientAxios from "@/lib/axios";
import type { RegisterTrialRequest, RegisterTrialResponse } from "@/types";

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
    userType: {
      id: string;
      code: string;
      name: string;
    };
    company: Record<string, unknown>;
    role: Record<string, unknown>;
  };
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  userTypeCode: string;
  companyId?: string;
}

export const authApiService = {
  async login(data: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await clientAxios.post<LoginResponse>("/auth/login", data);
      return response.data;
    } catch (err) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosError = err as { response?: { data?: { message?: string } } };
        throw new Error(axiosError.response?.data?.message || 'Error al iniciar sesión');
      }
      throw new Error('Error al iniciar sesión');
    }
  },

  async register(data: RegisterRequest): Promise<LoginResponse> {
    try {
      const response = await clientAxios.post<LoginResponse>(
        "/auth/register",
        data,
      );
      return response.data;
    } catch (err) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosError = err as { response?: { data?: { message?: string } } };
        throw new Error(axiosError.response?.data?.message || 'Error al registrar');
      }
      throw new Error('Error al registrar');
    }
  },

  async registerTrial(
    data: RegisterTrialRequest,
  ): Promise<RegisterTrialResponse> {
    try {
      const response = await clientAxios.post<RegisterTrialResponse>(
        "/auth/register-trial",
        data,
      );
      return response.data;
    } catch (err) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosError = err as { response?: { data?: { message?: string } } };
        throw new Error(axiosError.response?.data?.message || 'Error al crear la cuenta');
      }
      throw new Error('Error al crear la cuenta');
    }
  },

  async logout(): Promise<void> {
    await clientAxios.post("/auth/logout");
  },
};
