import clientAxios from "@/lib/axios";
import { API_ROUTES } from "@/constants/routes.constants";
import type { Product, CreateProductDto, UpdateProductDto } from "@/types";

interface QueryParams {
  search?: string;
}

interface ProductStats {
  total: number;
  totalStock: number;
  lowStock: number;
  inventoryValue: number;
}

export const productsService = {
  getStats: async (): Promise<ProductStats> => {
    const { data } = await clientAxios.get<ProductStats>(`${API_ROUTES.PRODUCTS}/stats`);
    return data;
  },

  getAll: async (params?: QueryParams): Promise<Product[]> => {
    const { data } = await clientAxios.get<Product[]>(API_ROUTES.PRODUCTS, { params });
    return data;
  },

  getById: async (id: string): Promise<Product> => {
    const { data } = await clientAxios.get<Product>(`${API_ROUTES.PRODUCTS}/${id}`);
    return data;
  },

  create: async (productData: CreateProductDto): Promise<Product> => {
    const { data } = await clientAxios.post<Product>(API_ROUTES.PRODUCTS, productData);
    return data;
  },

  update: async (id: string, productData: UpdateProductDto): Promise<Product> => {
    const { data } = await clientAxios.patch<Product>(`${API_ROUTES.PRODUCTS}/${id}`, productData);
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await clientAxios.delete(`${API_ROUTES.PRODUCTS}/${id}`);
  },
};
