import { useState, useEffect } from 'react';
import { cashRegistersService } from '@/services/api/cash-registers.service';
import { ClientHandler } from '@/lib/client-handler';

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
    } catch {
      ClientHandler.error('Error al cargar estadísticas');
    } finally {
      setLoading(false);
    }
  };

  const fetchMovements = async () => {
    try {
      const data = await cashRegistersService.getMovements();
      setMovements(data);
    } catch {
      ClientHandler.error('Error al cargar movimientos');
    }
  };

  const openCashRegister = async (id: string) => {
    try {
      await cashRegistersService.open(id);
      ClientHandler.success('Caja abierta exitosamente');
      await fetchStats();
      await fetchMovements();
    } catch {
      ClientHandler.error('Error al abrir caja');
      throw new Error('Error al abrir caja');
    }
  };

  const closeCashRegister = async (id: string) => {
    try {
      await cashRegistersService.close(id);
      ClientHandler.success('Caja cerrada exitosamente');
      await fetchStats();
      setMovements([]);
    } catch {
      ClientHandler.error('Error al cerrar caja');
      throw new Error('Error al cerrar caja');
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
