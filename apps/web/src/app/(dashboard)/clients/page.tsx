"use client";

import { useState } from "react";
import { Button, Card, CardContent } from "@/components/ui";
import { GenericTable, GenericModal } from "@/components/common";
import { CustomerForm } from "@/components/features";
import type { TableColumn, TableAction } from "@/components/common";
import { useCustomers, useDebounce } from "@/hooks";
import type { Customer } from "@/types";

export default function ClientsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "update" | "delete" | "view">("create");
  const [selectedClient, setSelectedClient] = useState<Customer | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);

  const { customers, stats, isLoading, createCustomer, updateCustomer, deleteCustomer } = useCustomers({
    search: debouncedSearch,
  });

  const columns: TableColumn<Customer>[] = [
    {
      key: "name",
      header: "Nombre",
      sortable: true,
      render: (customer) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-sm font-bold text-primary">{customer.name.charAt(0)}</span>
          </div>
          <span className="font-medium">{customer.name}</span>
        </div>
      ),
    },
    { 
      key: "phone", 
      header: "Teléfono", 
      sortable: true,
      render: (customer) => customer.phone || "-",
    },
    { 
      key: "email", 
      header: "Email", 
      sortable: true,
      render: (customer) => customer.email || "-",
    },
  ];

  const actions: TableAction<Customer>[] = [
    {
      label: "",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      variant: "outline",
      onClick: (customer) => {
        setSelectedClient(customer);
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
      onClick: (customer) => {
        setSelectedClient(customer);
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
      onClick: (customer) => {
        setSelectedClient(customer);
        setModalMode("delete");
        setIsModalOpen(true);
      },
    },
  ];



  const handleModalConfirm = async () => {
    if (modalMode === "delete" && selectedClient) {
      const success = await deleteCustomer(selectedClient.id);
      if (success) {
        setIsModalOpen(false);
        setSelectedClient(null);
      }
      return;
    }

    const form = document.querySelector('form') as HTMLFormElement;
    if (form) {
      form.requestSubmit();
    }
  };

  const handleFormSubmitInternal = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const customerData = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
      notes: formData.get("notes") as string,
    };

    let success = false;

    if (modalMode === "create") {
      success = await createCustomer(customerData);
    } else if (modalMode === "update" && selectedClient) {
      success = await updateCustomer(selectedClient.id, customerData);
    }

    if (success) {
      setIsModalOpen(false);
      setSelectedClient(null);
    }
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
              <p className="text-2xl font-bold text-foreground">{stats.total}</p>
            </CardContent>
          </Card>
          <Card variant="stats">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Clientes Activos</p>
              <p className="text-2xl font-bold text-foreground">{stats.active}</p>
            </CardContent>
          </Card>
          <Card variant="stats">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Nuevos este mes</p>
              <p className="text-2xl font-bold text-foreground">{stats.newThisMonth}</p>
            </CardContent>
          </Card>
        </div>

        {/* Clients Table */}
        <GenericTable
          data={customers}
          columns={columns}
          actions={actions}
          searchable
          searchPlaceholder="Buscar por nombre, teléfono o email..."
          emptyMessage="No hay clientes registrados"
          onSearch={setSearchTerm}
          loading={isLoading}
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
          ) : modalMode === "view" && selectedClient ? (
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Nombre</p>
                <p className="text-base">{selectedClient.name}</p>
              </div>
              {selectedClient.phone && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Teléfono</p>
                  <p className="text-base">{selectedClient.phone}</p>
                </div>
              )}
              {selectedClient.email && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p className="text-base">{selectedClient.email}</p>
                </div>
              )}
              {selectedClient.notes && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Notas</p>
                  <p className="text-base">{selectedClient.notes}</p>
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={handleFormSubmitInternal}>
              <CustomerForm customer={selectedClient} />
            </form>
          )}
        </GenericModal>
      </div>
    </>
  );
}
