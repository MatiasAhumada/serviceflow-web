import { clientAxios } from "@/lib/axios";

export const serviceOrdersService = {
  getStats: async () => {
    const { data } = await clientAxios.get("/service-orders/stats");
    return data;
  },

  getAll: async () => {
    const { data } = await clientAxios.get("/service-orders");
    return data;
  },

  getById: async (id: string) => {
    const { data } = await clientAxios.get(`/service-orders/${id}`);
    return data;
  },

  create: async (orderData: Record<string, unknown>) => {
    const { data } = await clientAxios.post("/service-orders", orderData);
    return data;
  },

  updateStatus: async (id: string, status: string, notes?: string) => {
    const { data } = await clientAxios.patch(`/service-orders/${id}/status`, {
      status,
      notes,
    });
    return data;
  },

  update: async (id: string, orderData: Record<string, unknown>) => {
    const { data } = await clientAxios.patch(
      `/service-orders/${id}`,
      orderData,
    );
    return data;
  },

  delete: async (id: string) => {
    await clientAxios.delete(`/service-orders/${id}`);
  },
};
