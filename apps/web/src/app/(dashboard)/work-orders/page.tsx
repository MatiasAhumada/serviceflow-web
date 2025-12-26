"use client";

import { useState } from "react";
import { Button, Card, CardContent, Badge } from "@/components/ui";
import { GenericTable } from "@/components/common";
import type { TableColumn, TableAction } from "@/components/common";
import { useServiceOrders } from "@/hooks/useServiceOrders";
import { formatters } from "@/utils/formatters.util";
import { STATUS_CONFIGS } from "@/utils/status-configs.util";

export default function WorkOrdersPage() {
  const { orders, stats, loading, updateStatus } = useServiceOrders();
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

  const columns: TableColumn<any>[] = [
    {
      key: "serviceNumber",
      header: "N° Orden",
      sortable: true,
      render: (order) => (
        <span className="font-mono font-bold text-primary">{order.serviceNumber}</span>
      ),
    },
    {
      key: "customer",
      header: "Cliente",
      sortable: true,
      render: (order) => order.customer?.name || "N/A",
    },
    {
      key: "technician",
      header: "Técnico",
      sortable: true,
      render: (order) => order.technician?.name || "Sin asignar",
    },
    {
      key: "entryDate",
      header: "Ingreso",
      sortable: true,
      render: (order) => formatters.date(order.entryDate),
    },
    {
      key: "expectedDelivery",
      header: "Entrega Est.",
      sortable: true,
      render: (order) => order.expectedDelivery ? formatters.date(order.expectedDelivery) : "N/A",
    },
    {
      key: "status",
      header: "Estado",
      align: "center",
      render: (order) => {
        const config = STATUS_CONFIGS.service[order.status as keyof typeof STATUS_CONFIGS.service];
        return <Badge variant={config.variant}>{config.label}</Badge>;
      },
    },
  ];

  const actions: TableAction<any>[] = [
    {
      label: "",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      variant: "outline",
      onClick: (order) => setSelectedOrder(order),
    },
  ];

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    await updateStatus(orderId, newStatus);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <header className="bg-background border-b border-border px-4 sm:px-6 py-4 pb-7">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl font-bold text-[#111827] dark:text-white">Servicio Técnico</h1>
            <p className="text-xs sm:text-sm text-[#10B981] font-medium">Gestiona las órdenes de servicio</p>
          </div>
        </div>
      </header>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card variant="stats">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <p className="text-sm text-muted-foreground">Recibidas</p>
              </div>
              <p className="text-2xl font-bold text-foreground">{stats?.received || 0}</p>
            </CardContent>
          </Card>
          <Card variant="stats">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <p className="text-sm text-muted-foreground">En Progreso</p>
              </div>
              <p className="text-2xl font-bold text-foreground">{stats?.inProgress || 0}</p>
            </CardContent>
          </Card>
          <Card variant="stats">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <p className="text-sm text-muted-foreground">Completadas</p>
              </div>
              <p className="text-2xl font-bold text-foreground">{stats?.completed || 0}</p>
            </CardContent>
          </Card>
          <Card variant="stats">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <p className="text-sm text-muted-foreground">Entregadas</p>
              </div>
              <p className="text-2xl font-bold text-foreground">{stats?.delivered || 0}</p>
            </CardContent>
          </Card>
          <Card variant="stats">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                <p className="text-sm text-muted-foreground">Total</p>
              </div>
              <p className="text-2xl font-bold text-foreground">{stats?.total || 0}</p>
            </CardContent>
          </Card>
        </div>

        <GenericTable
          data={orders}
          columns={columns}
          actions={actions}
          searchable
          searchPlaceholder="Buscar por número, cliente o técnico..."
          emptyMessage="No hay órdenes de servicio registradas"
        />

        {selectedOrder && (
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Orden {selectedOrder.serviceNumber}</h3>
                <Button variant="ghost" size="sm" onClick={() => setSelectedOrder(null)}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Cliente</p>
                  <p className="font-medium">{selectedOrder.customer?.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Técnico</p>
                  <p className="font-medium">{selectedOrder.technician?.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Estado Actual</p>
                  <Badge variant={STATUS_CONFIGS.service[selectedOrder.status as keyof typeof STATUS_CONFIGS.service].variant}>
                    {STATUS_CONFIGS.service[selectedOrder.status as keyof typeof STATUS_CONFIGS.service].label}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Fecha Ingreso</p>
                  <p className="font-medium">{formatters.date(selectedOrder.entryDate)}</p>
                </div>
              </div>
              <div className="flex gap-2">
                {selectedOrder.status === 'received' && (
                  <Button onClick={() => handleStatusChange(selectedOrder.id, 'in_progress')}>
                    Iniciar Reparación
                  </Button>
                )}
                {selectedOrder.status === 'in_progress' && (
                  <Button onClick={() => handleStatusChange(selectedOrder.id, 'completed')}>
                    Marcar Completada
                  </Button>
                )}
                {selectedOrder.status === 'completed' && (
                  <Button onClick={() => handleStatusChange(selectedOrder.id, 'delivered')}>
                    Entregar al Cliente
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
}
