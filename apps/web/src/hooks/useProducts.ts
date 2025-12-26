import { useState, useEffect, useCallback } from "react";
import { productsService } from "@/services";
import { ClientHandler } from "@/lib/client-handler";
import type { Product, CreateProductDto, UpdateProductDto } from "@/types";

interface UseProductsParams {
  search?: string;
}

interface ProductStats {
  total: number;
  totalStock: number;
  lowStock: number;
  inventoryValue: number;
}

export function useProducts({ search }: UseProductsParams = {}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [stats, setStats] = useState<ProductStats>({ total: 0, totalStock: 0, lowStock: 0, inventoryValue: 0 });
  const [isLoading, setIsLoading] = useState(false);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const [productsData, statsData] = await Promise.all([
        productsService.getAll({ search }),
        productsService.getStats(),
      ]);
      setProducts(productsData);
      setStats(statsData);
    } catch {
      ClientHandler.error("Error al cargar productos");
    } finally {
      setIsLoading(false);
    }
  }, [search]);

  const createProduct = async (productData: CreateProductDto): Promise<boolean> => {
    try {
      await productsService.create(productData);
      ClientHandler.success("Producto creado correctamente");
      await fetchProducts();
      return true;
    } catch {
      ClientHandler.error("Error al crear producto");
      return false;
    }
  };

  const updateProduct = async (id: string, productData: UpdateProductDto): Promise<boolean> => {
    try {
      await productsService.update(id, productData);
      ClientHandler.success("Producto actualizado correctamente");
      await fetchProducts();
      return true;
    } catch {
      ClientHandler.error("Error al actualizar producto");
      return false;
    }
  };

  const deleteProduct = async (id: string): Promise<boolean> => {
    try {
      await productsService.delete(id);
      ClientHandler.success("Producto eliminado correctamente");
      await fetchProducts();
      return true;
    } catch {
      ClientHandler.error("Error al eliminar producto");
      return false;
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    stats,
    isLoading,
    createProduct,
    updateProduct,
    deleteProduct,
    refetch: fetchProducts,
  };
}
