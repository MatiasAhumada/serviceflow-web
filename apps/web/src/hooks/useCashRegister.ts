import { useState, useEffect } from 'react';
import { cashRegistersService } from '@/services/api/cash-registers.service';
import { toast } from 'sonner';

interface CashMovement {
  id: string | number;
  type: string;
  concept: string;
  date: string;
  amount: number;
  notes?: string;
  user?: {
    name?: string;
  };
}

export const useCashRegister = () => {
  const [stats, setStats] = useState<Record<string, unknown> | null>(null);
  const [movements, setMovements] = useState<CashMovement[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const data = await cashRegistersService.getStats();
      setStats(data);
    } catch (error: unknown) {
      toast.error((error as {response?: {data?: {message?: string}}})?.response?.data?.message || 'Error al cargar estadísticas');
    } finally {
      setLoading(false);
    }
  };

  const fetchMovements = async () => {
    try {
      const data = await cashRegistersService.getMovements();
      setMovements(data);
    } catch (error: unknown) {
      toast.error((error as {response?: {data?: {message?: string}}})?.response?.data?.message || 'Error al cargar movimientos');
    }
  };

  const openCashRegister = async (id: string) => {
    try {
      await cashRegistersService.open(id);
      toast.success('Caja abierta exitosamente');
      await fetchStats();
      await fetchMovements();
    } catch (error: unknown) {
      toast.error((error as {response?: {data?: {message?: string}}})?.response?.data?.message || 'Error al abrir caja');
      throw error;
    }
  };

  const closeCashRegister = async (id: string) => {
    try {
      await cashRegistersService.close(id);
      toast.success('Caja cerrada exitosamente');
      await fetchStats();
      setMovements([]);
    } catch (error: unknown) {
      toast.error((error as {response?: {data?: {message?: string}}})?.response?.data?.message || 'Error al cerrar caja');
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
