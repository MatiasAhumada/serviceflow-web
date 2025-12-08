"use client";

import { useState } from "react";
import { Button, Card, CardHeader, CardTitle, CardContent, Badge } from "@/components/ui";
import { GenericTable, GenericModal } from "@/components/common";
import type { TableColumn, TableAction } from "@/components/common";
import { ClientHandler } from "@/lib/client-handler";

interface Sale {
  id: string;
  saleNumber: string;
  date: string;
  customer: string;
  items: number;
  total: number;
  status: string;
  paymentMethod: string;
}

export default function SalesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "update" | "delete" | "view">("create");
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);

  const sales: Sale[] = [
    { id: "1", saleNumber: "V-001", date: "2024-01-15", customer: "Juan Pérez", items: 3, total: 12500, status: "completed", paymentMethod: "card" },
    { id: "2", saleNumber: "V-002", date: "2024-01-15", customer: "María García", items: 5, total: 8300, status: "completed", paymentMethod: "cash" },
    { id: "3", saleNumber: "V-003", date: "2024-01-16", customer: "Carlos López", items: 2, total: 15000, status: "pending", paymentMethod: "transfer" },
  ];

  const columns: TableColumn<Sale>[] = [
    { key: "saleNumber", header: "N° Venta", sortable: true },
    { key: "date", header: "Fecha", sortable: true },
    { key: "customer", header: "Cliente", sortable: true },
    { key: "items", header: "Items", align: "right", sortable: true },
    {
      key: "total",
      header: "Total",
      align: "right",
      sortable: true,
      render: (sale) => `$${sale.total.toLocaleString()}`,
    },
    {
      key: "paymentMethod",
      header: "Pago",
      align: "center",
      render: (sale) => (
        <Badge variant="outline" size="sm">
          {sale.paymentMethod === "card" ? "Tarjeta" : sale.paymentMethod === "cash" ? "Efectivo" : "Transferencia"}
        </Badge>
      ),
    },
    {
      key: "status",
      header: "Estado",
      align: "center",
      render: (sale) => (
        <Badge variant={sale.status === "completed" ? "success" : "outline"} size="sm">
          {sale.status === "completed" ? "Completada" : "Pendiente"}
        </Badge>
      ),
    },
  ];

  const actions: TableAction<Sale>[] = [
    {
      label: "",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      variant: "outline",
      onClick: (sale) => {
        setSelectedSale(sale);
        setModalMode("view");
        setIsModalOpen(true);
      },
    },
  ];

  const handleModalConfirm = async () => {
    if (modalMode === "create") {
      ClientHandler.success("Venta registrada correctamente");
    }
    setIsModalOpen(false);
    setSelectedSale(null);
  };

  return (
    <>
      {/* Header */}
      <header className="bg-background border-b border-border px-4 sm:px-6 py-4 pb-7">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl font-bold text-[#111827] dark:text-white">Ventas</h1>
            <p className="text-xs sm:text-sm text-[#10B981] font-medium">Registra y gestiona tus ventas</p>
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 -mt-12">
          <Button onClick={() => { setModalMode("create"); setIsModalOpen(true); }}>
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Nueva Venta
          </Button>
        </div>
      </header>

      <div className="p-6 space-y-6">



      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card variant="stats">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Ventas Hoy</p>
            <p className="text-2xl font-bold text-foreground">8</p>
          </CardContent>
        </Card>
        <Card variant="stats">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Hoy</p>
            <p className="text-2xl font-bold text-foreground">$45,230</p>
          </CardContent>
        </Card>
        <Card variant="stats">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Ventas Mes</p>
            <p className="text-2xl font-bold text-foreground">156</p>
          </CardContent>
        </Card>
        <Card variant="stats">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Mes</p>
            <p className="text-2xl font-bold text-foreground">$523,450</p>
          </CardContent>
        </Card>
      </div>

      {/* Sales Table */}
      <GenericTable
        data={sales}
        columns={columns}
        actions={actions}
        searchable
        searchPlaceholder="Buscar por número de venta o cliente..."
        emptyMessage="No hay ventas registradas"
      />

      {/* Modal */}
      <GenericModal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setSelectedSale(null); }}
        onConfirm={handleModalConfirm}
        mode={modalMode}
        title={modalMode === "create" ? "Nueva Venta" : "Detalles de la Venta"}
      >
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">Formulario de venta aquí</p>
        </div>
      </GenericModal>
      </div>
    </>
  );
}
