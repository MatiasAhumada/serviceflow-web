import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { receiptsService } from '@/services/api/receipts.service';
import { CreateReceiptDto } from '@/types';
import { toast } from 'sonner';

export const useReceipts = () => {
  const queryClient = useQueryClient();

  const receiptsQuery = useQuery({
    queryKey: ['receipts'],
    queryFn: receiptsService.getAll,
  });

  const createReceiptMutation = useMutation({
    mutationFn: (data: CreateReceiptDto) => receiptsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['receipts'] });
      toast.success('Comprobante generado exitosamente');
    },
    onError: () => {
      toast.error('Error al generar comprobante');
    },
  });

  const deleteReceiptMutation = useMutation({
    mutationFn: (id: string) => receiptsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['receipts'] });
      toast.success('Comprobante eliminado');
    },
    onError: () => {
      toast.error('Error al eliminar comprobante');
    },
  });

  return {
    receipts: receiptsQuery.data,
    isLoading: receiptsQuery.isLoading,
    createReceipt: createReceiptMutation.mutate,
    deleteReceipt: deleteReceiptMutation.mutate,
    downloadPDF: receiptsService.downloadPDF,
  };
};

export const useReceipt = (id: string) => {
  return useQuery({
    queryKey: ['receipts', id],
    queryFn: () => receiptsService.getById(id),
    enabled: !!id,
  });
};

export const useReceiptBySale = (saleId: string) => {
  return useQuery({
    queryKey: ['receipts', 'sale', saleId],
    queryFn: () => receiptsService.getBySale(saleId),
    enabled: !!saleId,
  });
};
