import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { salesService } from '@/services/api/sales.service';
import { Sale, CreateSaleDto, UpdateSaleDto } from '@/types';
import { toast } from 'sonner';

export const useSales = () => {
  const queryClient = useQueryClient();

  const salesQuery = useQuery({
    queryKey: ['sales'],
    queryFn: () => salesService.getAll(),
  });

  const statsQuery = useQuery({
    queryKey: ['sales', 'stats'],
    queryFn: salesService.getStats,
  });

  const createMutation = useMutation({
    mutationFn: (saleData: CreateSaleDto) => salesService.create(saleData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sales'] });
      toast.success('Venta creada exitosamente');
    },
    onError: (error: unknown) => {
      toast.error((error as {response?: {data?: {message?: string}}})?.response?.data?.message || 'Error al crear venta');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateSaleDto }) => salesService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sales'] });
      toast.success('Venta actualizada exitosamente');
    },
    onError: (error: unknown) => {
      toast.error((error as {response?: {data?: {message?: string}}})?.response?.data?.message || 'Error al actualizar venta');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => salesService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sales'] });
      toast.success('Venta eliminada exitosamente');
    },
    onError: (error: unknown) => {
      toast.error((error as {response?: {data?: {message?: string}}})?.response?.data?.message || 'Error al eliminar venta');
    },
  });

  const cancelMutation = useMutation({
    mutationFn: (id: string) => salesService.cancel(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sales'] });
      toast.success('Venta cancelada exitosamente');
    },
    onError: (error: unknown) => {
      toast.error((error as {response?: {data?: {message?: string}}})?.response?.data?.message || 'Error al cancelar venta');
    },
  });

  return {
    sales: salesQuery.data || [],
    stats: statsQuery.data || { todayCount: 0, todayTotal: 0, monthCount: 0, monthTotal: 0 },
    loading: salesQuery.isLoading || statsQuery.isLoading,
    fetchSales: () => queryClient.invalidateQueries({ queryKey: ['sales'] }),
    fetchStats: () => queryClient.invalidateQueries({ queryKey: ['sales', 'stats'] }),
    createSale: createMutation.mutateAsync,
    updateSale: async (id: string, data: UpdateSaleDto) => updateMutation.mutateAsync({ id, data }),
    deleteSale: deleteMutation.mutateAsync,
    cancelSale: cancelMutation.mutateAsync,
  };
};
