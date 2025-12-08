"use client";

import { useState } from "react";
import { Button, Card, CardHeader, CardTitle, CardContent, Badge } from "@/components/ui";
import { GenericTable, GenericModal } from "@/components/common";
import type { TableColumn, TableAction } from "@/components/common";
import { ClientHandler } from "@/lib/client-handler";

interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
  totalPurchases: number;
  totalAmount: number;
}

export default function ClientsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "update" | "delete" | "view">("create");
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const clients: Client[] = [
    { id: "1", name: "Juan Pérez", phone: "1234567890", email: "juan@email.com", totalPurchases: 15, totalAmount: 45000 },
    { id: "2", name: "María García", phone: "0987654321", email: "maria@email.com", totalPurchases: 8, totalAmount: 23000 },
    { id: "3", name: "Carlos López", phone: "1122334455", email: "carlos@email.com", totalPurchases: 12, totalAmount: 38000 },
  ];

  const columns: TableColumn<Client>[] = [
    {
      key: "name",
      header: "Nombre",
      sortable: true,
      render: (client) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-sm font-bold text-primary">{client.name.charAt(0)}</span>
          </div>
          <span className="font-medium">{client.name}</span>
        </div>
      ),
    },
    { key: "phone", header: "Teléfono", sortable: true },
    { key: "email", header: "Email", sortable: true },
    {
      key: "totalPurchases",
      header: "Compras",
      align: "right",
      sortable: true,
    },
    {
      key: "totalAmount",
      header: "Total",
      align: "right",
      sortable: true,
      render: (client) => `$${client.totalAmount.toLocaleString()}`,
    },
  ];

  const actions: TableAction<Client>[] = [
    {
      label: "",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      variant: "outline",
      onClick: (client) => {
        setSelectedClient(client);
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
      onClick: (client) => {
        setSelectedClient(client);
        setModalMode("update");
        setIsModalOpen(true);
      },
    },
    {
      label: "",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      ),
      variant: "destructive",
      onClick: (client) => {
        setSelectedClient(client);
        setModalMode("delete");
        setIsModalOpen(true);
      },
    },
  ];

  const handleModalConfirm = async () => {
    if (modalMode === "create") {
      ClientHandler.success("Cliente creado correctamente");
    } else if (modalMode === "update") {
      ClientHandler.success("Cliente actualizado correctamente");
    } else if (modalMode === "delete") {
      ClientHandler.success("Cliente eliminado correctamente");
    }
    setIsModalOpen(false);
    setSelectedClient(null);
  };

  return (
    <>
      {/* Header */}
      <header className="bg-background border-b border-border px-4 sm:px-6 py-4 pb-7">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl font-bold text-[#111827] dark:text-white">Clientes</h1>
            <p className="text-xs sm:text-sm text-[#10B981] font-medium">Gestiona tu base de clientes</p>
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 -mt-12">
          <Button onClick={() => { setModalMode("create"); setIsModalOpen(true); }}>
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Nuevo Cliente
          </Button>
        </div>
      </header>

      <div className="p-6 space-y-6">



      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card variant="stats">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Clientes</p>
            <p className="text-2xl font-bold text-foreground">{clients.length}</p>
          </CardContent>
        </Card>
        <Card variant="stats">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Clientes Activos</p>
            <p className="text-2xl font-bold text-foreground">{clients.length}</p>
          </CardContent>
        </Card>
        <Card variant="stats">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Nuevos este mes</p>
            <p className="text-2xl font-bold text-foreground">5</p>
          </CardContent>
        </Card>
      </div>

      {/* Clients Table */}
      <GenericTable
        data={clients}
        columns={columns}
        actions={actions}
        searchable
        searchPlaceholder="Buscar por nombre, teléfono o email..."
        emptyMessage="No hay clientes registrados"
      />

      {/* Modal */}
      <GenericModal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setSelectedClient(null); }}
        onConfirm={handleModalConfirm}
        mode={modalMode}
        title={modalMode === "create" ? "Nuevo Cliente" : modalMode === "update" ? "Editar Cliente" : modalMode === "delete" ? "Eliminar Cliente" : "Detalles del Cliente"}
      >
        {modalMode === "delete" ? (
          <p>¿Está seguro que desea eliminar a <strong>{selectedClient?.name}</strong>?</p>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Formulario de cliente aquí</p>
          </div>
        )}
      </GenericModal>
      </div>
    </>
  );
}
