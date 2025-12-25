import { useState, useEffect } from 'react';
import { cashRegistersService } from '@/services/api/cash-registers.service';
import { toast } from 'sonner';

export const useCashRegister = () => {
  const [stats, setStats] = useState<any>(null);
  const [movements, setMovements] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const data = await cashRegistersService.getStats();
      setStats(data);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error al cargar estadísticas');
    } finally {
      setLoading(false);
    }
  };

  const fetchMovements = async () => {
    try {
      const data = await cashRegistersService.getMovements();
      setMovements(data);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error al cargar movimientos');
    }
  };

  const openCashRegister = async (id: string) => {
    try {
      await cashRegistersService.open(id);
      toast.success('Caja abierta exitosamente');
      await fetchStats();
      await fetchMovements();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error al abrir caja');
      throw error;
    }
  };

  const closeCashRegister = async (id: string) => {
    try {
      await cashRegistersService.close(id);
      toast.success('Caja cerrada exitosamente');
      await fetchStats();
      setMovements([]);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error al cerrar caja');
      throw error;
    }
  };

  useEffect(() => {
    fetchStats();
    fetchMovements();
  }, []);

  return {
    stats,
    movements,
    loading,
    fetchStats,
    fetchMovements,
    openCashRegister,
    closeCashRegister,
  };
};
