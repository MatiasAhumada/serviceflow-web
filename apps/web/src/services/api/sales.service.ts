import { clientAxios } from '@/lib/axios';
import { Sale, CreateSaleDto, UpdateSaleDto } from '@/types';

export const salesService = {
  getStats: async () => {
    const { data } = await clientAxios.get('/sales/stats');
    return data;
  },

  getAll: async (params?: any) => {
    const { data } = await clientAxios.get<Sale[]>('/sales', { params });
    return data;
  },

  getById: async (id: string) => {
    const { data } = await clientAxios.get<Sale>(`/sales/${id}`);
    return data;
  },

  create: async (saleData: CreateSaleDto) => {
    const { data } = await clientAxios.post<Sale>('/sales', saleData);
    return data;
  },

  update: async (id: string, saleData: UpdateSaleDto) => {
    const { data } = await clientAxios.put<Sale>(`/sales/${id}`, saleData);
    return data;
  },

  delete: async (id: string) => {
    await clientAxios.delete(`/sales/${id}`);
  },

  cancel: async (id: string) => {
    const { data } = await clientAxios.patch<Sale>(`/sales/${id}/cancel`);
    return data;
  },
};
