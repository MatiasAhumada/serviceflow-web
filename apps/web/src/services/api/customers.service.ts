import clientAxios from "@/lib/axios";
import { API_ROUTES } from "@/constants/routes.constants";
import type { Customer, CreateCustomerDto, UpdateCustomerDto } from "@/types";

interface QueryParams {
  search?: string;
}

interface CustomerStats {
  total: number;
  active: number;
  newThisMonth: number;
}

export const customersService = {
  getStats: async (): Promise<CustomerStats> => {
    const { data } = await clientAxios.get<CustomerStats>(
      `${API_ROUTES.CUSTOMERS}/stats`,
    );
    return data;
  },

  getAll: async (params?: QueryParams): Promise<Customer[]> => {
    const { data } = await clientAxios.get<Customer[]>(API_ROUTES.CUSTOMERS, {
      params,
    });
    return data;
  },

  getById: async (id: string): Promise<Customer> => {
    const { data } = await clientAxios.get<Customer>(
      `${API_ROUTES.CUSTOMERS}/${id}`,
    );
    return data;
  },

  create: async (customerData: CreateCustomerDto): Promise<Customer> => {
    const { data } = await clientAxios.post<Customer>(
      API_ROUTES.CUSTOMERS,
      customerData,
    );
    return data;
  },

  update: async (
    id: string,
    customerData: UpdateCustomerDto,
  ): Promise<Customer> => {
    const { data } = await clientAxios.patch<Customer>(
      `${API_ROUTES.CUSTOMERS}/${id}`,
      customerData,
    );
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await clientAxios.delete(`${API_ROUTES.CUSTOMERS}/${id}`);
  },
};
