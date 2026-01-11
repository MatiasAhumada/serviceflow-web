"use client";

import { useState } from "react";
import { Button, Card, CardContent, Badge } from "@/components/ui";
import { GenericTable, GenericModal } from "@/components/common";
import type { TableColumn, TableAction } from "@/components/common";
import { SaleForm } from "@/components/features";
import { useSales } from "@/hooks/useSales";
import { useReceipts } from "@/hooks/useReceipts";
import { Sale } from "@/types";
import { useConfirm } from "@/hooks/useConfirm";
import { PAYMENT_METHODS } from "@/constants";

export default function SalesPage() {
  const { sales, stats, loading, createSale, cancelSale } = useSales();
  const { createReceipt, downloadPDF } = useReceipts();
  const { confirm, ConfirmDialog } = useConfirm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "view">("create");
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);

  const columns: TableColumn<Sale>[] = [
    { key: "saleNumber", header: "N° Venta", sortable: true },
    {
      key: "date",
      header: "Fecha",
      sortable: true,
      render: (sale) => new Date(sale.date).toLocaleDateString("es-AR"),
    },
    {
      key: "customer",
      header: "Cliente",
      sortable: true,
      render: (sale) => sale.customer?.name || "-",
    },
    {
      key: "items",
      header: "Items",
      align: "right",
      render: (sale) => sale.items?.length || 0,
    },
    {
      key: "total",
      header: "Total",
      align: "right",
      sortable: true,
      render: (sale) =>
        `$${(sale.total - sale.discount).toLocaleString("es-AR", { minimumFractionDigits: 2 })}`,
    },
    {
      key: "paymentMethod",
      header: "Pago",
      align: "center",
      render: (sale) => (
        <Badge variant="outline" size="sm">
          {PAYMENT_METHODS[
            sale.paymentMethod as keyof typeof PAYMENT_METHODS
          ] || sale.paymentMethod}
        </Badge>
      ),
    },
    {
      key: "status",
      header: "Estado",
      align: "center",
      render: (sale) => {
        const statuses: Record<
          string,
          { label: string; variant: "success" | "outline" | "destructive" }
        > = {
          completed: { label: "Completada", variant: "success" },
          pending: { label: "Pendiente", variant: "outline" },
          cancelled: { label: "Cancelada", variant: "destructive" },
        };
        const status = statuses[sale.status] || {
          label: sale.status,
          variant: "outline",
        };
        return (
          <Badge variant={status.variant} size="sm">
            {status.label}
          </Badge>
        );
      },
    },
  ];

  const actions: TableAction<Sale>[] = [
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
      onClick: (sale) => {
        setSelectedSale(sale);
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
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
      variant: "default",
      onClick: async (sale) => {
        let receiptId = sale.receipt?.id;
        if (!receiptId) {
          const receipt = await createReceipt({ saleId: sale.id });
          receiptId = receipt?.id;
        }
        if (receiptId) {
          await downloadPDF(receiptId);
        }
      },
      show: (sale) => sale.status === "completed",
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
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      ),
      variant: "destructive",
      onClick: (sale) => {
        confirm({
          message: "¿Cancelar esta venta?",
          onConfirm: async () => {
            await cancelSale(sale.id);
          },
        });
      },
      show: (sale) =>
        sale.status !== "cancelled" && sale.status !== "completed",
    },
  ];

  const handleModalConfirm = async () => {
    if (modalMode === "create") {
      const submitFn = (window as unknown as Record<string, unknown>)
        .__saleFormSubmit as (() => void) | undefined;
      if (submitFn) {
        submitFn();
      }
    }
  };

  return (
    <>
      <ConfirmDialog />
      <header className="bg-background border-b border-border px-4 sm:px-6 py-4 pb-7">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl font-bold text-[#111827] dark:text-white">
              Ventas
            </h1>
            <p className="text-xs sm:text-sm text-[#10B981] font-medium">
              Registra y gestiona tus ventas
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
            Nueva Venta
          </Button>
        </div>
      </header>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card variant="stats">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Ventas Hoy</p>
              <p className="text-2xl font-bold text-foreground">
                {stats?.todayCount || 0}
              </p>
            </CardContent>
          </Card>
          <Card variant="stats">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Total Hoy</p>
              <p className="text-2xl font-bold text-foreground">
                $
                {(stats?.todayTotal || 0).toLocaleString("es-AR", {
                  minimumFractionDigits: 2,
                })}
              </p>
            </CardContent>
          </Card>
          <Card variant="stats">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Ventas Mes</p>
              <p className="text-2xl font-bold text-foreground">
                {stats?.monthCount || 0}
              </p>
            </CardContent>
          </Card>
          <Card variant="stats">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Total Mes</p>
              <p className="text-2xl font-bold text-foreground">
                $
                {(stats?.monthTotal || 0).toLocaleString("es-AR", {
                  minimumFractionDigits: 2,
                })}
              </p>
            </CardContent>
          </Card>
        </div>

        <GenericTable
          data={sales}
          columns={columns}
          actions={actions}
          searchable
          searchPlaceholder="Buscar por número de venta..."
          emptyMessage="No hay ventas registradas"
          loading={loading}
        />

        <GenericModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedSale(null);
          }}
          onConfirm={handleModalConfirm}
          mode={modalMode}
          title={
            modalMode === "create" ? "Nueva Venta" : "Detalles de la Venta"
          }
        >
          {modalMode === "create" ? (
            <SaleForm
              onSubmit={async (data) => {
                await createSale(data);
                setIsModalOpen(false);
              }}
            />
          ) : (
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium">
                  N° Venta: {selectedSale?.saleNumber}
                </p>
                <p className="text-sm">
                  Cliente: {selectedSale?.customer?.name}
                </p>
                <p className="text-sm">
                  Total: ${(selectedSale?.total || 0).toLocaleString("es-AR")}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Items:</p>
                {selectedSale?.items?.map((item) => (
                  <div key={item.id} className="text-sm flex justify-between">
                    <span>{item.product?.name}</span>
                    <span>
                      x{item.quantity} - $
                      {item.subtotal.toLocaleString("es-AR")}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </GenericModal>
      </div>
    </>
  );
}
