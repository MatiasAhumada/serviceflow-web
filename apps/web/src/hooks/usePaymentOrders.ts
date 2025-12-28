import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { paymentOrdersService } from '@/services/api/payment-orders.service';
import { CompletePaymentOrderDto } from '@/types';
import { ClientHandler } from '@/lib/client-handler';

export const usePaymentOrders = () => {
  const queryClient = useQueryClient();

  const pendingOrdersQuery = useQuery({
    queryKey: ['payment-orders', 'pending'],
    queryFn: paymentOrdersService.getPending,
  });

  const completeOrderMutation = useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: CompletePaymentOrderDto }) =>
      paymentOrdersService.complete(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payment-orders'] });
      queryClient.invalidateQueries({ queryKey: ['sales'] });
      ClientHandler.success('Pago completado exitosamente');
    },
    onError: () => {
      ClientHandler.error('Error al completar el pago');
    },
  });

  const cancelOrderMutation = useMutation({
    mutationFn: (id: string) => paymentOrdersService.cancel(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payment-orders'] });
      queryClient.invalidateQueries({ queryKey: ['sales'] });
      ClientHandler.success('Orden cancelada');
    },
    onError: () => {
      ClientHandler.error('Error al cancelar orden');
    },
  });

  return {
    pendingOrders: pendingOrdersQuery.data,
    isLoading: pendingOrdersQuery.isLoading,
    completeOrder: completeOrderMutation.mutate,
    cancelOrder: cancelOrderMutation.mutate,
  };
};
