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
    const response = await clientAxios.post<LoginResponse>("/auth/login", data);
    return response.data;
  },

  async register(data: RegisterRequest): Promise<LoginResponse> {
    const response = await clientAxios.post<LoginResponse>(
      "/auth/register",
      data,
    );
    return response.data;
  },

  async registerTrial(
    data: RegisterTrialRequest,
  ): Promise<RegisterTrialResponse> {
    const response = await clientAxios.post<RegisterTrialResponse>(
      "/auth/register-trial",
      data,
    );
    return response.data;
  },

  async logout(): Promise<void> {
    await clientAxios.post("/auth/logout");
  },
};
