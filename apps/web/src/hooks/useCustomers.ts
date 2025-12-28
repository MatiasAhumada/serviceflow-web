import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { customersService } from "@/services";
import { ClientHandler } from "@/lib/client-handler";
import type { CreateCustomerDto, UpdateCustomerDto } from "@/types";

interface UseCustomersParams {
  search?: string;
}

export function useCustomers({ search }: UseCustomersParams = {}) {
  const queryClient = useQueryClient();

  const customersQuery = useQuery({
    queryKey: ['customers', search],
    queryFn: () => customersService.getAll({ search }),
  });

  const statsQuery = useQuery({
    queryKey: ['customers', 'stats'],
    queryFn: customersService.getStats,
  });

  const createMutation = useMutation({
    mutationFn: (customerData: CreateCustomerDto) => customersService.create(customerData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      ClientHandler.success("Cliente creado correctamente");
    },
    onError: () => {
      ClientHandler.error("Error al crear cliente");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCustomerDto }) => customersService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      ClientHandler.success("Cliente actualizado correctamente");
    },
    onError: () => {
      ClientHandler.error("Error al actualizar cliente");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => customersService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      ClientHandler.success("Cliente eliminado correctamente");
    },
    onError: () => {
      ClientHandler.error("Error al eliminar cliente");
    },
  });

  return {
    customers: customersQuery.data || [],
    stats: statsQuery.data || { total: 0, active: 0, newThisMonth: 0 },
    isLoading: customersQuery.isLoading || statsQuery.isLoading,
    createCustomer: async (data: CreateCustomerDto) => {
      await createMutation.mutateAsync(data);
      return true;
    },
    updateCustomer: async (id: string, data: UpdateCustomerDto) => {
      await updateMutation.mutateAsync({ id, data });
      return true;
    },
    deleteCustomer: async (id: string) => {
      await deleteMutation.mutateAsync(id);
      return true;
    },
    refetch: () => queryClient.invalidateQueries({ queryKey: ['customers'] }),
  };
}
