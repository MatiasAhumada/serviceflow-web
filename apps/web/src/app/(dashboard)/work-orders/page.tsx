"use client";

import { useState } from "react";
import { Button, Card, CardHeader, CardTitle, CardContent, Badge } from "@/components/ui";
import { GenericTable, GenericModal } from "@/components/common";
import type { TableColumn, TableAction } from "@/components/common";
import { ClientHandler } from "@/lib/client-handler";

interface WorkOrder {
  id: string;
  orderNumber: string;
  date: string;
  customer: string;
  device: string;
  issue: string;
  status: string;
  technician: string;
}

const statusLabels: Record<string, string> = {
  received: "Recibido",
  in_progress: "En Progreso",
  completed: "Completado",
  delivered: "Entregado",
};

const statusVariants: Record<string, "outline" | "default" | "success"> = {
  received: "outline",
  in_progress: "default",
  completed: "success",
  delivered: "success",
};

export default function WorkOrdersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "update" | "delete" | "view">("create");
  const [selectedOrder, setSelectedOrder] = useState<WorkOrder | null>(null);

  const orders: WorkOrder[] = [
    { id: "1", orderNumber: "OT-001", date: "2024-01-15", customer: "Juan Pérez", device: "Laptop HP", issue: "No enciende", status: "in_progress", technician: "Carlos Tech" },
    { id: "2", orderNumber: "OT-002", date: "2024-01-15", customer: "María García", device: "PC Desktop", issue: "Lento", status: "received", technician: "Sin asignar" },
    { id: "3", orderNumber: "OT-003", date: "2024-01-14", customer: "Carlos López", device: "Impresora", issue: "No imprime", status: "completed", technician: "Ana Tech" },
  ];

  const columns: TableColumn<WorkOrder>[] = [
    { key: "orderNumber", header: "N° Orden", sortable: true },
    { key: "date", header: "Fecha", sortable: true },
    { key: "customer", header: "Cliente", sortable: true },
    { key: "device", header: "Dispositivo", sortable: true },
    { key: "issue", header: "Problema", sortable: true },
    { key: "technician", header: "Técnico", sortable: true },
    {
      key: "status",
      header: "Estado",
      align: "center",
      render: (order) => (
        <Badge variant={statusVariants[order.status]} size="sm">
          {statusLabels[order.status]}
        </Badge>
      ),
    },
  ];

  const actions: TableAction<WorkOrder>[] = [
    {
      label: "",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      variant: "outline",
      onClick: (order) => {
        setSelectedOrder(order);
        setModalMode("view");
        setIsModalOpen(true);
      },
    },
    {
      label: "",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      variant: "ghost",
      onClick: (order) => {
        setSelectedOrder(order);
        setModalMode("update");
        setIsModalOpen(true);
      },
    },
  ];

  const handleModalConfirm = async () => {
    if (modalMode === "create") {
      ClientHandler.success("Orden creada correctamente");
    } else if (modalMode === "update") {
      ClientHandler.success("Orden actualizada correctamente");
    }
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  return (
    <>
      {/* Header */}
      <header className="bg-background border-b border-border px-4 sm:px-6 py-4 pb-7">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl font-bold text-[#111827] dark:text-white">Órdenes de Trabajo</h1>
            <p className="text-xs sm:text-sm text-[#10B981] font-medium">Gestiona las órdenes de reparación</p>
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 -mt-12">
          <Button onClick={() => { setModalMode("create"); setIsModalOpen(true); }}>
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Nueva Orden
          </Button>
        </div>
      </header>

      <div className="p-6 space-y-6">



      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card variant="stats">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Recibidas</p>
            <p className="text-2xl font-bold text-foreground">{orders.filter(o => o.status === "received").length}</p>
          </CardContent>
        </Card>
        <Card variant="stats">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">En Progreso</p>
            <p className="text-2xl font-bold text-foreground">{orders.filter(o => o.status === "in_progress").length}</p>
          </CardContent>
        </Card>
        <Card variant="stats">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Completadas</p>
            <p className="text-2xl font-bold text-foreground">{orders.filter(o => o.status === "completed").length}</p>
          </CardContent>
        </Card>
        <Card variant="stats">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Mes</p>
            <p className="text-2xl font-bold text-foreground">45</p>
          </CardContent>
        </Card>
      </div>

      {/* Orders Table */}
      <GenericTable
        data={orders}
        columns={columns}
        actions={actions}
        searchable
        searchPlaceholder="Buscar por número de orden, cliente o dispositivo..."
        emptyMessage="No hay órdenes de trabajo registradas"
      />

      {/* Modal */}
      <GenericModal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setSelectedOrder(null); }}
        onConfirm={handleModalConfirm}
        mode={modalMode}
        title={modalMode === "create" ? "Nueva Orden de Trabajo" : modalMode === "update" ? "Editar Orden" : "Detalles de la Orden"}
      >
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">Formulario de orden aquí</p>
        </div>
      </GenericModal>
      </div>
    </>
  );
}
