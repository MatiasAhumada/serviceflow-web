import clientAxios from "@/lib/axios";
import { API_ROUTES } from "@/constants/routes.constants";
import type { Supplier, CreateSupplierDto, UpdateSupplierDto } from "@/types";

interface QueryParams {
  search?: string;
}

interface SupplierStats {
  total: number;
}

export const suppliersService = {
  getStats: async (): Promise<SupplierStats> => {
    const { data } = await clientAxios.get<SupplierStats>(
      `${API_ROUTES.SUPPLIERS}/stats`,
    );
    return data;
  },

  getAll: async (params?: QueryParams): Promise<Supplier[]> => {
    const { data } = await clientAxios.get<Supplier[]>(API_ROUTES.SUPPLIERS, {
      params,
    });
    return data;
  },

  getById: async (id: string): Promise<Supplier> => {
    const { data } = await clientAxios.get<Supplier>(
      `${API_ROUTES.SUPPLIERS}/${id}`,
    );
    return data;
  },

  create: async (supplierData: CreateSupplierDto): Promise<Supplier> => {
    const { data } = await clientAxios.post<Supplier>(
      API_ROUTES.SUPPLIERS,
      supplierData,
    );
    return data;
  },

  update: async (
    id: string,
    supplierData: UpdateSupplierDto,
  ): Promise<Supplier> => {
    const { data } = await clientAxios.patch<Supplier>(
      `${API_ROUTES.SUPPLIERS}/${id}`,
      supplierData,
    );
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await clientAxios.delete(`${API_ROUTES.SUPPLIERS}/${id}`);
  },
};
