import { useState, useEffect, useCallback } from 'react';
import { usersService } from '@/services/api/users.service';
import { toast } from 'sonner';

interface User {
  id: string | number;
  name: string;
  email: string;
  phone?: string;
  userType?: {
    name?: string;
  };
  status: string;
  createdAt: string;
}

export const useUsers = (role?: string) => {
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const data = await usersService.getAll(role);
      setUsers(data);
    } catch (error: unknown) {
      toast.error((error as {response?: {data?: {message?: string}}})?.response?.data?.message || 'Error al cargar usuarios');
    } finally {
      setLoading(false);
    }
  }, [role]);

  const fetchStats = useCallback(async () => {
    try {
      const data = await usersService.getStats();
      setStats(data);
    } catch (error: unknown) {
      toast.error((error as {response?: {data?: {message?: string}}})?.response?.data?.message || 'Error al cargar estadísticas');
    }
  }, []);

  const updateUser = async (id: string, userData: Record<string, unknown>): Promise<User> => {
    try {
      const updatedUser = await usersService.update(id, userData);
      setUsers((prev) => prev.map((u) => (u.id === id ? updatedUser : u)));
      toast.success('Usuario actualizado exitosamente');
      return updatedUser as User;
    } catch (error: unknown) {
      toast.error((error as {response?: {data?: {message?: string}}})?.response?.data?.message || 'Error al actualizar usuario');
      throw error;
    }
  };

  const deleteUser = async (id: string) => {
    try {
      await usersService.delete(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
      toast.success('Usuario eliminado exitosamente');
    } catch (error: unknown) {
      toast.error((error as {response?: {data?: {message?: string}}})?.response?.data?.message || 'Error al eliminar usuario');
      throw error;
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchStats();
  }, [fetchUsers, fetchStats]);

  return {
    users,
    stats,
    loading,
    fetchUsers,
    fetchStats,
    updateUser,
    deleteUser,
  };
};
