import { clientAxios } from "@/lib/axios";
import { Receipt, CreateReceiptDto } from "@/types";

export const receiptsService = {
  getAll: async () => {
    const { data } = await clientAxios.get<Receipt[]>("/receipts");
    return data;
  },

  getById: async (id: string) => {
    const { data } = await clientAxios.get<Receipt>(`/receipts/${id}`);
    return data;
  },

  getBySale: async (saleId: string) => {
    const { data } = await clientAxios.get<Receipt>(`/receipts/sale/${saleId}`);
    return data;
  },

  create: async (receiptData: CreateReceiptDto) => {
    const { data } = await clientAxios.post<Receipt>("/receipts", receiptData);
    return data;
  },

  downloadPDF: async (id: string) => {
    const response = await clientAxios.get(`/receipts/${id}/pdf`, {
      responseType: "blob",
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `factura-${id}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  },

  delete: async (id: string) => {
    await clientAxios.delete(`/receipts/${id}`);
  },
};
