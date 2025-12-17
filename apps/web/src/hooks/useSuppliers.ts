import { useState, useEffect, useCallback } from "react";
import { suppliersService } from "@/services";
import { ClientHandler } from "@/lib/client-handler";
import type { Supplier, CreateSupplierDto, UpdateSupplierDto } from "@/types";

interface UseSuppliersParams {
  search?: string;
}

interface SupplierStats {
  total: number;
}

export function useSuppliers({ search }: UseSuppliersParams = {}) {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [stats, setStats] = useState<SupplierStats>({ total: 0 });
  const [isLoading, setIsLoading] = useState(false);

  const fetchSuppliers = useCallback(async () => {
    setIsLoading(true);
    try {
      const [suppliersData, statsData] = await Promise.all([
        suppliersService.getAll({ search }),
        suppliersService.getStats(),
      ]);
      setSuppliers(suppliersData);
      setStats(statsData);
    } catch (error) {
      ClientHandler.error("Error al cargar proveedores");
    } finally {
      setIsLoading(false);
    }
  }, [search]);

  const createSupplier = async (supplierData: CreateSupplierDto): Promise<boolean> => {
    try {
      await suppliersService.create(supplierData);
      ClientHandler.success("Proveedor creado correctamente");
      await fetchSuppliers();
      return true;
    } catch (error) {
      ClientHandler.error("Error al crear proveedor");
      return false;
    }
  };

  const updateSupplier = async (id: string, supplierData: UpdateSupplierDto): Promise<boolean> => {
    try {
      await suppliersService.update(id, supplierData);
      ClientHandler.success("Proveedor actualizado correctamente");
      await fetchSuppliers();
      return true;
    } catch (error) {
      ClientHandler.error("Error al actualizar proveedor");
      return false;
    }
  };

  const deleteSupplier = async (id: string): Promise<boolean> => {
    try {
      await suppliersService.delete(id);
      ClientHandler.success("Proveedor eliminado correctamente");
      await fetchSuppliers();
      return true;
    } catch (error) {
      ClientHandler.error("Error al eliminar proveedor");
      return false;
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, [fetchSuppliers]);

  return {
    suppliers,
    stats,
    isLoading,
    createSupplier,
    updateSupplier,
    deleteSupplier,
    refetch: fetchSuppliers,
  };
}
