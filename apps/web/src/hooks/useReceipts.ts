import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { receiptsService } from "@/services/api/receipts.service";
import { CreateReceiptDto } from "@/types";
import { ClientHandler } from "@/lib/client-handler";

export const useReceipts = () => {
  const queryClient = useQueryClient();

  const receiptsQuery = useQuery({
    queryKey: ["receipts"],
    queryFn: receiptsService.getAll,
  });

  const createReceiptMutation = useMutation({
    mutationFn: (data: CreateReceiptDto) => receiptsService.create(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["receipts"] });
      queryClient.invalidateQueries({ queryKey: ["sales"] });
      ClientHandler.success("Comprobante generado exitosamente");
      return data;
    },
    onError: () => {
      ClientHandler.error("Error al generar comprobante");
    },
  });

  const deleteReceiptMutation = useMutation({
    mutationFn: (id: string) => receiptsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["receipts"] });
      ClientHandler.success("Comprobante eliminado");
    },
    onError: () => {
      ClientHandler.error("Error al eliminar comprobante");
    },
  });

  return {
    receipts: receiptsQuery.data,
    isLoading: receiptsQuery.isLoading,
    createReceipt: createReceiptMutation.mutateAsync,
    deleteReceipt: deleteReceiptMutation.mutate,
    downloadPDF: receiptsService.downloadPDF,
  };
};
