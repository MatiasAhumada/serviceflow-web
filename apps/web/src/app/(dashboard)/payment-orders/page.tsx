"use client";

import { useState, useEffect } from "react";
import { Button, Card, CardContent, Badge } from "@/components/ui";
import { GenericTable, GenericModal } from "@/components/common";
import type { TableColumn, TableAction } from "@/components/common";
import { usePaymentOrders } from "@/hooks/usePaymentOrders";
import { useCashRegister } from "@/hooks/useCashRegister";
import { cashRegistersService } from "@/services/api/cash-registers.service";
import { PaymentOrder } from "@/types";

export default function PaymentOrdersPage() {
  const { pendingOrders, isLoading, completeOrder, cancelOrder } = usePaymentOrders();
  const { stats } = useCashRegister();
  const [selectedOrder, setSelectedOrder] = useState<PaymentOrder | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCashRegister, setSelectedCashRegister] = useState<string>("");
  const [cashRegisters, setCashRegisters] = useState<{id: string; name: string; status: string}[]>([]);

  useEffect(() => {
    const fetchCashRegisters = async () => {
      const data = await cashRegistersService.getAll();
      setCashRegisters(data);
    };
    fetchCashRegisters();
  }, []);

  const openCashRegister = stats?.isOpen && stats.cashRegisterId && stats.cashRegisterName && stats.openTime
    ? {
        id: stats.cashRegisterId as string,
        name: stats.cashRegisterName as string,
        status: 'open' as const,
        openTime: stats.openTime as string,
      }
    : null;

  const columns: TableColumn<PaymentOrder>[] = [
    { key: "orderNumber", header: "N° Orden", sortable: true },
    {
      key: "sale",
      header: "N° Venta",
      render: (order) => order.sale?.saleNumber || '-',
    },
    {
      key: "customer",
      header: "Cliente",
      render: (order) => order.sale?.customer?.name || '-',
    },
    {
      key: "amount",
      header: "Monto",
      align: "right",
      sortable: true,
      render: (order) => `$${order.amount.toLocaleString('es-AR', { minimumFractionDigits: 2 })}`,
    },
    {
      key: "paymentMethod",
      header: "Método",
      render: (order) => {
        const methods: Record<string, string> = {
          cash: 'Efectivo',
          debit_card: 'Débito',
          credit_card: 'Crédito',
          transfer: 'Transferencia',
        };
        return methods[order.sale?.paymentMethod || ''] || '-';
      },
    },
    {
      key: "createdAt",
      header: "Fecha",
      sortable: true,
      render: (order) => new Date(order.createdAt).toLocaleString('es-AR'),
    },
  ];

  const actions: TableAction<PaymentOrder>[] = [
    {
      label: "Cobrar",
      variant: "default",
      onClick: (order) => {
        setSelectedOrder(order);
        setSelectedCashRegister(openCashRegister?.id || "");
        setIsModalOpen(true);
      },
    },
    {
      label: "Cancelar",
      variant: "destructive",
      onClick: async (order) => {
        if (confirm('¿Cancelar esta orden?')) {
          cancelOrder(order.id);
        }
      },
    },
  ];

  const handleComplete = () => {
    if (selectedOrder) {
      completeOrder({
        id: selectedOrder.id,
        dto: { cashRegisterId: selectedCashRegister || undefined },
      });
      setIsModalOpen(false);
      setSelectedOrder(null);
    }
  };

  return (
    <>
      <header className="bg-background border-b border-border px-4 sm:px-6 py-4 pb-7">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl font-bold text-[#111827] dark:text-white">Órdenes de Pago</h1>
            <p className="text-xs sm:text-sm text-[#10B981] font-medium">Gestiona los cobros pendientes</p>
          </div>
        </div>
      </header>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card variant="stats">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Órdenes Pendientes</p>
              <p className="text-2xl font-bold text-foreground">{pendingOrders?.length || 0}</p>
            </CardContent>
          </Card>
          <Card variant="stats">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Total a Cobrar</p>
              <p className="text-2xl font-bold text-foreground">
                ${(pendingOrders?.reduce((sum, o) => sum + o.amount, 0) || 0).toLocaleString('es-AR', { minimumFractionDigits: 2 })}
              </p>
            </CardContent>
          </Card>
        </div>

        {openCashRegister && (
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Caja Abierta: {openCashRegister.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Abierta desde: {new Date(openCashRegister.openTime).toLocaleString('es-AR')}
                  </p>
                </div>
                <Badge variant="success">Activa</Badge>
              </div>
            </CardContent>
          </Card>
        )}

        <GenericTable
          data={pendingOrders || []}
          columns={columns}
          actions={actions}
          searchable
          searchPlaceholder="Buscar por número de orden..."
          emptyMessage="No hay órdenes pendientes"
          loading={isLoading}
        />

        <GenericModal
          isOpen={isModalOpen}
          onClose={() => { setIsModalOpen(false); setSelectedOrder(null); }}
          onConfirm={handleComplete}
          mode="create"
          title="Completar Pago"
        >
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium">Orden: {selectedOrder?.orderNumber}</p>
              <p className="text-sm">Cliente: {selectedOrder?.sale?.customer?.name}</p>
              <p className="text-lg font-bold mt-2">
                Monto: ${selectedOrder?.amount.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
              </p>
            </div>
            {cashRegisters && cashRegisters.length > 0 && (
              <div>
                <label className="text-sm font-medium">Caja (opcional)</label>
                <select
                  value={selectedCashRegister}
                  onChange={(e) => setSelectedCashRegister(e.target.value)}
                  className="w-full mt-1 p-2 border rounded"
                >
                  <option value="">Sin caja</option>
                  {cashRegisters.filter(cr => cr.status === 'open').map((cr) => (
                    <option key={cr.id} value={cr.id}>{cr.name}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </GenericModal>
      </div>
    </>
  );
}
