import { useState, useEffect } from 'react';
import { cashRegistersService } from '@/services/api/cash-registers.service';
import { ClientHandler } from '@/lib/client-handler';
import { CashRegister } from '@/types';

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

interface CashRegisterStats {
  cashRegisterId?: string;
  cashRegisterName?: string;
  isOpen: boolean;
  openTime?: string;
  currentBalance: number;
  totalIncome: number;
  totalExpense: number;
  movementsCount: number;
}

export const useCashRegister = () => {
  const [stats, setStats] = useState<CashRegisterStats | null>(null);
  const [movements, setMovements] = useState<CashMovement[]>([]);
  const [loading, setLoading] = useState(false);
  const [cashRegisters, setCashRegisters] = useState<CashRegister[]>([]);

  const fetchCashRegisters = async () => {
    try {
      const data = await cashRegistersService.getAll();
      setCashRegisters(data);
    } catch {
      ClientHandler.error('Error al cargar cajas');
    }
  };

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

  const createCashRegister = async (name: string, assignedUserId?: string) => {
    try {
      await cashRegistersService.create({ name, assignedUserId });
      ClientHandler.success('Caja creada exitosamente');
      await fetchCashRegisters();
    } catch {
      ClientHandler.error('Error al crear caja');
    }
  };

  const createDefaultCashRegister = async () => {
    await createCashRegister('Caja Principal');
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
    fetchCashRegisters();
  }, []);

  return {
    stats,
    movements,
    loading,
    cashRegisters,
    fetchStats,
    fetchMovements,
    fetchCashRegisters,
    openCashRegister,
    closeCashRegister,
    createCashRegister,
    createDefaultCashRegister,
  };
};
