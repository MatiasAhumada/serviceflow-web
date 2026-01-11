import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { suppliersService } from "@/services";
import { ClientHandler } from "@/lib/client-handler";
import type { CreateSupplierDto, UpdateSupplierDto } from "@/types";

interface UseSuppliersParams {
  search?: string;
}

export function useSuppliers({ search }: UseSuppliersParams = {}) {
  const queryClient = useQueryClient();

  const suppliersQuery = useQuery({
    queryKey: ["suppliers", search],
    queryFn: () => suppliersService.getAll({ search }),
  });

  const statsQuery = useQuery({
    queryKey: ["suppliers", "stats"],
    queryFn: suppliersService.getStats,
  });

  const createMutation = useMutation({
    mutationFn: (supplierData: CreateSupplierDto) =>
      suppliersService.create(supplierData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
      ClientHandler.success("Proveedor creado correctamente");
    },
    onError: () => {
      ClientHandler.error("Error al crear proveedor");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateSupplierDto }) =>
      suppliersService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
      ClientHandler.success("Proveedor actualizado correctamente");
    },
    onError: () => {
      ClientHandler.error("Error al actualizar proveedor");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => suppliersService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
      ClientHandler.success("Proveedor eliminado correctamente");
    },
    onError: () => {
      ClientHandler.error("Error al eliminar proveedor");
    },
  });

  return {
    suppliers: suppliersQuery.data || [],
    stats: statsQuery.data || { total: 0 },
    isLoading: suppliersQuery.isLoading || statsQuery.isLoading,
    createSupplier: async (data: CreateSupplierDto) => {
      await createMutation.mutateAsync(data);
      return true;
    },
    updateSupplier: async (id: string, data: UpdateSupplierDto) => {
      await updateMutation.mutateAsync({ id, data });
      return true;
    },
    deleteSupplier: async (id: string) => {
      await deleteMutation.mutateAsync(id);
      return true;
    },
    refetch: () => queryClient.invalidateQueries({ queryKey: ["suppliers"] }),
  };
}
