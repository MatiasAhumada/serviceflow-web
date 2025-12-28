import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { productsService } from "@/services";
import { ClientHandler } from "@/lib/client-handler";
import type { CreateProductDto, UpdateProductDto } from "@/types";

interface UseProductsParams {
  search?: string;
}

export function useProducts({ search }: UseProductsParams = {}) {
  const queryClient = useQueryClient();

  const productsQuery = useQuery({
    queryKey: ["products", search],
    queryFn: () => productsService.getAll({ search }),
  });

  const statsQuery = useQuery({
    queryKey: ["products", "stats"],
    queryFn: productsService.getStats,
  });

  const createMutation = useMutation({
    mutationFn: (productData: CreateProductDto) => productsService.create(productData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      ClientHandler.success("Producto creado correctamente");
    },
    onError: () => {
      ClientHandler.error("Error al crear producto");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateProductDto }) => productsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      ClientHandler.success("Producto actualizado correctamente");
    },
    onError: () => {
      ClientHandler.error("Error al actualizar producto");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => productsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      ClientHandler.success("Producto eliminado correctamente");
    },
    onError: () => {
      ClientHandler.error("Error al eliminar producto");
    },
  });

  return {
    products: productsQuery.data || [],
    stats: statsQuery.data || { total: 0, totalStock: 0, lowStock: 0, inventoryValue: 0 },
    isLoading: productsQuery.isLoading || statsQuery.isLoading,
    createProduct: async (data: CreateProductDto) => {
      await createMutation.mutateAsync(data);
      return true;
    },
    updateProduct: async (id: string, data: UpdateProductDto) => {
      await updateMutation.mutateAsync({ id, data });
      return true;
    },
    deleteProduct: async (id: string) => {
      await deleteMutation.mutateAsync(id);
      return true;
    },
    refetch: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  };
}
