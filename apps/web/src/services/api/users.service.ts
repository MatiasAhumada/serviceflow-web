import { clientAxios } from '@/lib/axios';

export const usersService = {
  getStats: async () => {
    const { data } = await clientAxios.get('/users/stats');
    return data;
  },

  getAll: async (role?: string) => {
    const { data } = await clientAxios.get('/users', { params: { role } });
    return data;
  },

  getById: async (id: string) => {
    const { data } = await clientAxios.get(`/users/${id}`);
    return data;
  },

  update: async (id: string, userData: any) => {
    const { data } = await clientAxios.patch(`/users/${id}`, userData);
    return data;
  },

  delete: async (id: string) => {
    await clientAxios.delete(`/users/${id}`);
  },
};
