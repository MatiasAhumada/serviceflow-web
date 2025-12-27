import { clientAxios } from '@/lib/axios';
import { PaymentOrder, CompletePaymentOrderDto } from '@/types';

export const paymentOrdersService = {
  getAll: async () => {
    const { data } = await clientAxios.get<PaymentOrder[]>('/payment-orders');
    return data;
  },

  getPending: async () => {
    const { data } = await clientAxios.get<PaymentOrder[]>('/payment-orders/pending');
    return data;
  },

  getById: async (id: string) => {
    const { data } = await clientAxios.get<PaymentOrder>(`/payment-orders/${id}`);
    return data;
  },

  complete: async (id: string, dto: CompletePaymentOrderDto) => {
    const { data } = await clientAxios.patch<PaymentOrder>(`/payment-orders/${id}/complete`, dto);
    return data;
  },

  cancel: async (id: string) => {
    const { data } = await clientAxios.patch<PaymentOrder>(`/payment-orders/${id}/cancel`);
    return data;
  },
};
