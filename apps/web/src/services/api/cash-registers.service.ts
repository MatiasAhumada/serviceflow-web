import { clientAxios } from "@/lib/axios";
import { CashRegister } from "@/types";

export const cashRegistersService = {
  getStats: async () => {
    const { data } = await clientAxios.get("/cash-registers/stats");
    return data;
  },

  getMovements: async () => {
    const { data } = await clientAxios.get("/cash-registers/movements");
    return data;
  },

  getAll: async () => {
    const { data } = await clientAxios.get<CashRegister[]>("/cash-registers");
    return data;
  },

  getById: async (id: string) => {
    const { data } = await clientAxios.get<CashRegister>(
      `/cash-registers/${id}`,
    );
    return data;
  },

  create: async (cashRegisterData: Partial<CashRegister>) => {
    const { data } = await clientAxios.post<CashRegister>(
      "/cash-registers",
      cashRegisterData,
    );
    return data;
  },

  open: async (id: string) => {
    const { data } = await clientAxios.patch<CashRegister>(
      `/cash-registers/${id}/open`,
    );
    return data;
  },

  close: async (id: string) => {
    const { data } = await clientAxios.patch<CashRegister>(
      `/cash-registers/${id}/close`,
    );
    return data;
  },

  update: async (id: string, cashRegisterData: Partial<CashRegister>) => {
    const { data } = await clientAxios.patch<CashRegister>(
      `/cash-registers/${id}`,
      cashRegisterData,
    );
    return data;
  },

  delete: async (id: string) => {
    await clientAxios.delete(`/cash-registers/${id}`);
  },
};
