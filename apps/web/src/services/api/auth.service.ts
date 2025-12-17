import axios from "axios";

const authAxios = axios.create({
  baseURL: "http://localhost:3010",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

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
    company: any;
    role: any;
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
    const response = await authAxios.post<LoginResponse>('/auth/login', data);
    return response.data;
  },

  async register(data: RegisterRequest): Promise<LoginResponse> {
    const response = await authAxios.post<LoginResponse>('/auth/register', data);
    return response.data;
  },

  async logout(): Promise<void> {
    await authAxios.post('/auth/logout');
  },
};
