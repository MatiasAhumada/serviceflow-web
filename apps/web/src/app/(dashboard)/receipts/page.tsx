"use client";

import { Card, CardContent, Badge } from "@/components/ui";
import { GenericTable } from "@/components/common";
import type { TableColumn, TableAction } from "@/components/common";
import { useReceipts } from "@/hooks/useReceipts";
import { Receipt } from "@/types";
import { useConfirm } from "@/hooks/useConfirm";
import { PAYMENT_METHODS } from "@/constants";

export default function ReceiptsPage() {
  const { receipts, isLoading, downloadPDF, deleteReceipt } = useReceipts();
  const { confirm, ConfirmDialog } = useConfirm();

  const columns: TableColumn<Receipt>[] = [
    { key: "receiptNumber", header: "N° Factura", sortable: true },
    {
      key: "date",
      header: "Fecha",
      sortable: true,
      render: (receipt) => new Date(receipt.date).toLocaleDateString('es-AR'),
    },
    {
      key: "customer",
      header: "Cliente",
      sortable: true,
      render: (receipt) => receipt.customer?.name || '-',
    },
    {
      key: "sale",
      header: "N° Venta",
      render: (receipt) => receipt.sale?.saleNumber || '-',
    },
    {
      key: "total",
      header: "Total",
      align: "right",
      sortable: true,
      render: (receipt) => `$${receipt.total.toLocaleString('es-AR', { minimumFractionDigits: 2 })}`,
    },
    {
      key: "paymentMethod",
      header: "Pago",
      align: "center",
      render: (receipt) => (
        <Badge variant="outline" size="sm">
          {PAYMENT_METHODS[receipt.paymentMethod as keyof typeof PAYMENT_METHODS] || receipt.paymentMethod}
        </Badge>
      ),
    },
  ];

  const actions: TableAction<Receipt>[] = [
    {
      label: "Descargar PDF",
      variant: "default",
      onClick: (receipt) => downloadPDF(receipt.id),
    },
    {
      label: "Eliminar",
      variant: "destructive",
      onClick: async (receipt) => {
        confirm({
          message: "¿Eliminar este comprobante?",
          onConfirm: () => deleteReceipt(receipt.id),
        });
      },
    },
  ];

  return (
    <>
      <ConfirmDialog />
      <header className="bg-background border-b border-border px-4 sm:px-6 py-4 pb-7">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl font-bold text-[#111827] dark:text-white">Comprobantes</h1>
            <p className="text-xs sm:text-sm text-[#10B981] font-medium">Gestiona tus facturas</p>
          </div>
        </div>
      </header>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card variant="stats">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Total Comprobantes</p>
              <p className="text-2xl font-bold text-foreground">{receipts?.length || 0}</p>
            </CardContent>
          </Card>
          <Card variant="stats">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Hoy</p>
              <p className="text-2xl font-bold text-foreground">
                {receipts?.filter(r => new Date(r.date).toDateString() === new Date().toDateString()).length || 0}
              </p>
            </CardContent>
          </Card>
          <Card variant="stats">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Total Facturado</p>
              <p className="text-2xl font-bold text-foreground">
                ${(receipts?.reduce((sum, r) => sum + r.total, 0) || 0).toLocaleString('es-AR', { minimumFractionDigits: 2 })}
              </p>
            </CardContent>
          </Card>
        </div>

        <GenericTable
          data={receipts || []}
          columns={columns}
          actions={actions}
          searchable
          searchPlaceholder="Buscar por número de factura..."
          emptyMessage="No hay comprobantes registrados"
          loading={isLoading}
        />
      </div>
    </>
  );
}
