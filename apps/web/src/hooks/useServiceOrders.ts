import { useState, useEffect } from 'react';
import { serviceOrdersService } from '@/services/api/service-orders.service';
import { ServiceOrder, ServiceOrderStats } from '@/types';
import { toast } from 'sonner';

export const useServiceOrders = () => {
  const [orders, setOrders] = useState<ServiceOrder[]>([]);
  const [stats, setStats] = useState<ServiceOrderStats | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await serviceOrdersService.getAll();
      setOrders(data);
    } catch (error: unknown) {
      toast.error((error as {response?: {data?: {message?: string}}})?.response?.data?.message || 'Error al cargar órdenes');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const data = await serviceOrdersService.getStats();
      setStats(data);
    } catch (error: unknown) {
      toast.error((error as {response?: {data?: {message?: string}}})?.response?.data?.message || 'Error al cargar estadísticas');
    }
  };

  const createOrder = async (orderData: Record<string, unknown>) => {
    try {
      const newOrder = await serviceOrdersService.create(orderData);
      setOrders((prev) => [newOrder, ...prev]);
      toast.success('Orden creada exitosamente');
      return newOrder;
    } catch (error: unknown) {
      toast.error((error as {response?: {data?: {message?: string}}})?.response?.data?.message || 'Error al crear orden');
      throw error;
    }
  };

  const updateStatus = async (id: string, status: string, notes?: string) => {
    try {
      const updatedOrder = await serviceOrdersService.updateStatus(id, status, notes);
      setOrders((prev) => prev.map((o) => (o.id === id ? updatedOrder : o)));
      toast.success('Estado actualizado exitosamente');
      await fetchStats();
      return updatedOrder;
    } catch (error: unknown) {
      toast.error((error as {response?: {data?: {message?: string}}})?.response?.data?.message || 'Error al actualizar estado');
      throw error;
    }
  };

  const updateOrder = async (id: string, orderData: Record<string, unknown>) => {
    try {
      const updatedOrder = await serviceOrdersService.update(id, orderData);
      setOrders((prev) => prev.map((o) => (o.id === id ? updatedOrder : o)));
      toast.success('Orden actualizada exitosamente');
      return updatedOrder;
    } catch (error: unknown) {
      toast.error((error as {response?: {data?: {message?: string}}})?.response?.data?.message || 'Error al actualizar orden');
      throw error;
    }
  };

  const deleteOrder = async (id: string) => {
    try {
      await serviceOrdersService.delete(id);
      setOrders((prev) => prev.filter((o) => o.id !== id));
      toast.success('Orden eliminada exitosamente');
    } catch (error: unknown) {
      toast.error((error as {response?: {data?: {message?: string}}})?.response?.data?.message || 'Error al eliminar orden');
      throw error;
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
