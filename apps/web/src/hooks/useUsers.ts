import { useState, useEffect, useCallback } from "react";
import { usersService } from "@/services/api/users.service";
import { ClientHandler } from "@/lib/client-handler";

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
    } catch {
      ClientHandler.error("Error al cargar usuarios");
    } finally {
      setLoading(false);
    }
  }, [role]);

  const fetchStats = useCallback(async () => {
    try {
      const data = await usersService.getStats();
      setStats(data);
    } catch {
      ClientHandler.error("Error al cargar estadísticas");
    }
  }, []);

  const updateUser = async (
    id: string,
    userData: Record<string, unknown>,
  ): Promise<User> => {
    try {
      const updatedUser = await usersService.update(id, userData);
      setUsers((prev) =>
        prev.map((user) => (user.id === id ? updatedUser : user)),
      );
      ClientHandler.success("Usuario actualizado exitosamente");
      return updatedUser as User;
    } catch {
      ClientHandler.error("Error al actualizar usuario");
      throw new Error("Error al actualizar usuario");
    }
  };

  const deleteUser = async (id: string) => {
    try {
      await usersService.delete(id);
      setUsers((prev) => prev.filter((user) => user.id !== id));
      ClientHandler.success("Usuario eliminado exitosamente");
    } catch {
      ClientHandler.error("Error al eliminar usuario");
      throw new Error("Error al eliminar usuario");
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
