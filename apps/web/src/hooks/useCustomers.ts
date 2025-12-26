import { useState, useEffect, useCallback } from "react";
import { customersService } from "@/services";
import { ClientHandler } from "@/lib/client-handler";
import type { Customer, CreateCustomerDto, UpdateCustomerDto } from "@/types";

interface UseCustomersParams {
  search?: string;
}

interface CustomerStats {
  total: number;
  active: number;
  newThisMonth: number;
}

export function useCustomers({ search }: UseCustomersParams = {}) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [stats, setStats] = useState<CustomerStats>({ total: 0, active: 0, newThisMonth: 0 });
  const [isLoading, setIsLoading] = useState(false);

  const fetchCustomers = useCallback(async () => {
    setIsLoading(true);
    try {
      const [customersData, statsData] = await Promise.all([
        customersService.getAll({ search }),
        customersService.getStats(),
      ]);
      setCustomers(customersData);
      setStats(statsData);
    } catch {
      ClientHandler.error("Error al cargar clientes");
    } finally {
      setIsLoading(false);
    }
  }, [search]);

  const createCustomer = async (customerData: CreateCustomerDto): Promise<boolean> => {
    try {
      await customersService.create(customerData);
      ClientHandler.success("Cliente creado correctamente");
      await fetchCustomers();
      return true;
    } catch {
      ClientHandler.error("Error al crear cliente");
      return false;
    }
  };

  const updateCustomer = async (id: string, customerData: UpdateCustomerDto): Promise<boolean> => {
    try {
      await customersService.update(id, customerData);
      ClientHandler.success("Cliente actualizado correctamente");
      await fetchCustomers();
      return true;
    } catch {
      ClientHandler.error("Error al actualizar cliente");
      return false;
    }
  };

  const deleteCustomer = async (id: string): Promise<boolean> => {
    try {
      await customersService.delete(id);
      ClientHandler.success("Cliente eliminado correctamente");
      await fetchCustomers();
      return true;
    } catch {
      ClientHandler.error("Error al eliminar cliente");
      return false;
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  return {
    customers,
    stats,
    isLoading,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    refetch: fetchCustomers,
  };
}
