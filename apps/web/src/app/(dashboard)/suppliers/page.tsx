"use client";

import { useState, useRef } from "react";
import { Button, Card, CardContent, Badge } from "@/components/ui";
import { GenericTable, GenericModal } from "@/components/common";
import { SupplierForm } from "@/components/features";
import type { TableColumn, TableAction } from "@/components/common";
import { useSuppliers, useDebounce } from "@/hooks";
import type { Supplier } from "@/types";

export default function SuppliersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<
    "create" | "update" | "delete" | "view"
  >("create");
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(
    null,
  );
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);
  const formRef = useRef<HTMLFormElement>(null);

  const {
    suppliers,
    stats,
    isLoading,
    createSupplier,
    updateSupplier,
    deleteSupplier,
  } = useSuppliers({
    search: debouncedSearch,
  });

  const columns: TableColumn<Supplier>[] = [
    { key: "name", header: "Proveedor", sortable: true },
    {
      key: "contactInfo",
      header: "Contacto",
      sortable: true,
      render: (supplier) => supplier.contactInfo || "-",
    },
    {
      key: "phone",
      header: "Teléfono",
      sortable: true,
      render: (supplier) => supplier.phone || "-",
    },
    {
      key: "email",
      header: "Email",
      sortable: true,
      render: (supplier) => supplier.email || "-",
    },
    {
      key: "products",
      header: "Productos",
      align: "center",
      sortable: true,
      render: (supplier) => (
        <Badge variant="outline" size="sm">
          {supplier.products?.length || 0}
        </Badge>
      ),
    },
  ];

  const actions: TableAction<Supplier>[] = [
    {
      label: "",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
      ),
      variant: "outline",
      onClick: (supplier) => {
        setSelectedSupplier(supplier);
        setModalMode("view");
        setIsModalOpen(true);
      },
    },
    {
      label: "",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
      ),
      variant: "ghost",
      onClick: (supplier) => {
        setSelectedSupplier(supplier);
        setModalMode("update");
        setIsModalOpen(true);
      },
    },
    {
      label: "",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      ),
      variant: "destructive",
      onClick: (supplier) => {
        setSelectedSupplier(supplier);
        setModalMode("delete");
        setIsModalOpen(true);
      },
    },
  ];

  const handleModalConfirm = async () => {
    if (modalMode === "delete" && selectedSupplier) {
      const success = await deleteSupplier(selectedSupplier.id);
      if (success) {
        setIsModalOpen(false);
        setSelectedSupplier(null);
      }
      return;
    }

    formRef.current?.requestSubmit();
  };

  const handleFormSubmitInternal = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const supplierData = {
      name: formData.get("name") as string,
      contactInfo: formData.get("contactInfo") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
    };

    let success = false;

    if (modalMode === "create") {
      success = await createSupplier(supplierData);
    } else if (modalMode === "update" && selectedSupplier) {
      success = await updateSupplier(selectedSupplier.id, supplierData);
    }

    if (success) {
      setIsModalOpen(false);
      setSelectedSupplier(null);
    }
  };

  return (
    <>
      {/* Header */}
      <header className="bg-background border-b border-border px-4 sm:px-6 py-4 pb-7">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl font-bold text-[#111827] dark:text-white">
              Proveedores
            </h1>
            <p className="text-xs sm:text-sm text-[#10B981] font-medium">
              Gestiona tus proveedores
            </p>
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 -mt-12">
          <Button
            onClick={() => {
              setModalMode("create");
              setIsModalOpen(true);
            }}
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Nuevo Proveedor
          </Button>
        </div>
      </header>

      <div className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card variant="stats">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Total Proveedores</p>
              <p className="text-2xl font-bold text-foreground">
                {stats.total}
              </p>
            </CardContent>
          </Card>
          <Card variant="stats">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">
                Proveedores Activos
              </p>
              <p className="text-2xl font-bold text-foreground">
                {stats.total}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Suppliers Table */}
        <GenericTable
          data={suppliers}
          columns={columns}
          actions={actions}
          searchable
          searchPlaceholder="Buscar por nombre, teléfono o email..."
          emptyMessage="No hay proveedores registrados"
          onSearch={setSearchTerm}
          loading={isLoading}
        />

        {/* Modal */}
        <GenericModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedSupplier(null);
          }}
          onConfirm={handleModalConfirm}
          mode={modalMode}
          title={
            modalMode === "create"
              ? "Nuevo Proveedor"
              : modalMode === "update"
                ? "Editar Proveedor"
                : modalMode === "delete"
                  ? "Eliminar Proveedor"
                  : "Detalles del Proveedor"
          }
        >
          {modalMode === "delete" ? (
            <p>
              ¿Está seguro que desea eliminar a{" "}
              <strong>{selectedSupplier?.name}</strong>?
            </p>
          ) : modalMode === "view" && selectedSupplier ? (
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Nombre
                </p>
                <p className="text-base">{selectedSupplier.name}</p>
              </div>
              {selectedSupplier.contactInfo && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Contacto
                  </p>
                  <p className="text-base">{selectedSupplier.contactInfo}</p>
                </div>
              )}
              {selectedSupplier.phone && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Teléfono
                  </p>
                  <p className="text-base">{selectedSupplier.phone}</p>
                </div>
              )}
              {selectedSupplier.email && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Email
                  </p>
                  <p className="text-base">{selectedSupplier.email}</p>
                </div>
              )}
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleFormSubmitInternal}>
              <SupplierForm supplier={selectedSupplier} />
            </form>
          )}
        </GenericModal>
      </div>
    </>
  );
}
