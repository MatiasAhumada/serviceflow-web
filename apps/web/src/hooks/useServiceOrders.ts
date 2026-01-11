import { useState, useEffect } from "react";
import { serviceOrdersService } from "@/services/api/service-orders.service";
import { ServiceOrder, ServiceOrderStats } from "@/types";
import { ClientHandler } from "@/lib/client-handler";

export const useServiceOrders = () => {
  const [orders, setOrders] = useState<ServiceOrder[]>([]);
  const [stats, setStats] = useState<ServiceOrderStats | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await serviceOrdersService.getAll();
      setOrders(data);
    } catch {
      ClientHandler.error("Error al cargar órdenes");
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const data = await serviceOrdersService.getStats();
      setStats(data);
    } catch {
      ClientHandler.error("Error al cargar estadísticas");
    }
  };

  const createOrder = async (orderData: Record<string, unknown>) => {
    try {
      const newOrder = await serviceOrdersService.create(orderData);
      setOrders((prev) => [newOrder, ...prev]);
      ClientHandler.success("Orden creada exitosamente");
      return newOrder;
    } catch {
      ClientHandler.error("Error al crear orden");
      throw new Error("Error al crear orden");
    }
  };

  const updateStatus = async (id: string, status: string, notes?: string) => {
    try {
      const updatedOrder = await serviceOrdersService.updateStatus(
        id,
        status,
        notes,
      );
      setOrders((prev) =>
        prev.map((order) => (order.id === id ? updatedOrder : order)),
      );
      ClientHandler.success("Estado actualizado exitosamente");
      await fetchStats();
      return updatedOrder;
    } catch {
      ClientHandler.error("Error al actualizar estado");
      throw new Error("Error al actualizar estado");
    }
  };

  const updateOrder = async (
    id: string,
    orderData: Record<string, unknown>,
  ) => {
    try {
      const updatedOrder = await serviceOrdersService.update(id, orderData);
      setOrders((prev) =>
        prev.map((order) => (order.id === id ? updatedOrder : order)),
      );
      ClientHandler.success("Orden actualizada exitosamente");
      return updatedOrder;
    } catch {
      ClientHandler.error("Error al actualizar orden");
      throw new Error("Error al actualizar orden");
    }
  };

  const deleteOrder = async (id: string) => {
    try {
      await serviceOrdersService.delete(id);
      setOrders((prev) => prev.filter((order) => order.id !== id));
      ClientHandler.success("Orden eliminada exitosamente");
    } catch {
      ClientHandler.error("Error al eliminar orden");
      throw new Error("Error al eliminar orden");
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchStats();
  }, []);

  return {
    orders,
    stats,
    loading,
    fetchOrders,
    fetchStats,
    createOrder,
    updateStatus,
    updateOrder,
    deleteOrder,
  };
};
