import { useState, useEffect } from 'react';
import { salesService } from '@/services/api/sales.service';
import { Sale, CreateSaleDto, UpdateSaleDto } from '@/types';
import { toast } from 'sonner';

export const useSales = () => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchSales = async (params?: any) => {
    try {
      setLoading(true);
      const data = await salesService.getAll(params);
      setSales(data);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error al cargar ventas');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const data = await salesService.getStats();
      setStats(data);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error al cargar estadísticas');
    }
  };

  const createSale = async (saleData: CreateSaleDto) => {
    try {
      const newSale = await salesService.create(saleData);
      setSales((prev) => [newSale, ...prev]);
      toast.success('Venta creada exitosamente');
      return newSale;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error al crear venta');
      throw error;
    }
  };

  const updateSale = async (id: string, saleData: UpdateSaleDto) => {
    try {
      const updatedSale = await salesService.update(id, saleData);
      setSales((prev) => prev.map((s) => (s.id === id ? updatedSale : s)));
      toast.success('Venta actualizada exitosamente');
      return updatedSale;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error al actualizar venta');
      throw error;
    }
  };

  const deleteSale = async (id: string) => {
    try {
      await salesService.delete(id);
      setSales((prev) => prev.filter((s) => s.id !== id));
      toast.success('Venta eliminada exitosamente');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error al eliminar venta');
      throw error;
    }
  };

  const cancelSale = async (id: string) => {
    try {
      const cancelledSale = await salesService.cancel(id);
      setSales((prev) => prev.map((s) => (s.id === id ? cancelledSale : s)));
      toast.success('Venta cancelada exitosamente');
      return cancelledSale;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error al cancelar venta');
      throw error;
    }
  };

  useEffect(() => {
    fetchSales();
    fetchStats();
  }, []);

  return {
    sales,
    stats,
    loading,
    fetchSales,
    fetchStats,
    createSale,
    updateSale,
    deleteSale,
    cancelSale,
  };
};
