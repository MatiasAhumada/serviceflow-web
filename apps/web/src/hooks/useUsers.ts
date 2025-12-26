import { useState, useEffect } from 'react';
import { usersService } from '@/services/api/users.service';
import { toast } from 'sonner';

export const useUsers = (role?: string) => {
  const [users, setUsers] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await usersService.getAll(role);
      setUsers(data);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error al cargar usuarios');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const data = await usersService.getStats();
      setStats(data);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error al cargar estadísticas');
    }
  };

  const updateUser = async (id: string, userData: any) => {
    try {
      const updatedUser = await usersService.update(id, userData);
      setUsers((prev) => prev.map((u) => (u.id === id ? updatedUser : u)));
      toast.success('Usuario actualizado exitosamente');
      return updatedUser;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error al actualizar usuario');
      throw error;
    }
  };

  const deleteUser = async (id: string) => {
    try {
      await usersService.delete(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
      toast.success('Usuario eliminado exitosamente');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error al eliminar usuario');
      throw error;
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchStats();
  }, [role]);

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
