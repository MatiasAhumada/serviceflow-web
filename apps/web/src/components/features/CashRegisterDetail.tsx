"use client";

import { CashRegister, PaymentOrder } from "@/types";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Badge,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Label,
  Breadcrumb,
  BreadcrumbItem,
} from "@/components/ui";
import { GenericTable, GenericModal } from "@/components/common";
import { formatters } from "@/utils/formatters.util";
import { useConfirm } from "@/hooks/useConfirm";
import { PAYMENT_METHODS } from "@/constants";
import { useState } from "react";

interface CashMovement {
  id: string | number;
  type: "income" | "expense";
  concept: string;
  amount: number;
  date: string;
  notes?: string;
  user?: { name: string };
  saleId?: string;
  sale?: {
    id: string;
    receipt?: {
      id: string;
    };
  };
}

interface CashRegisterDetailProps {
  cashRegister: CashRegister;
  stats: {
    totalIncome: number;
    totalExpense: number;
  };
  movements: CashMovement[];
  pendingOrders: PaymentOrder[];
  ordersLoading: boolean;
  onBack: () => void;
  onOpen: () => void;
  onClose: () => void;
  onCompleteOrder: (orderId: string, cashRegisterId: string) => void;
  onCancelOrder: (orderId: string) => void;
  onDownloadReceipt?: (receiptId: string) => void;
}

export function CashRegisterDetail({
  cashRegister,
  stats,
  movements,
  pendingOrders,
  ordersLoading,
  onBack,
  onOpen,
  onClose,
  onCompleteOrder,
  onCancelOrder,
  onDownloadReceipt,
}: CashRegisterDetailProps) {
  const [selectedOrder, setSelectedOrder] = useState<PaymentOrder | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [downloadingReceipts, setDownloadingReceipts] = useState<
    Record<string, boolean>
  >({});
  const { confirm, ConfirmDialog } = useConfirm();

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Cajas", onClick: onBack },
    { label: cashRegister.name },
  ];

  const handleCompleteOrder = () => {
    if (selectedOrder) {
      onCompleteOrder(selectedOrder.id, cashRegister.id);
      setIsModalOpen(false);
      setSelectedOrder(null);
    }
  };

  return (
    <>
      <ConfirmDialog />
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Breadcrumb items={breadcrumbItems} />
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-foreground">
                {cashRegister.name}
              </h2>
              <Badge
                variant={cashRegister.status === "open" ? "success" : "outline"}
              >
                {cashRegister.status === "open" ? "Abierta" : "Cerrada"}
              </Badge>
            </div>
            {cashRegister.user && (
              <p className="text-sm text-muted-foreground">
                Cajero asignado: {cashRegister.user.name}
              </p>
            )}
          </div>
          <Button
            variant={cashRegister.status === "open" ? "destructive" : "default"}
            onClick={cashRegister.status === "open" ? onClose : onOpen}
          >
            {cashRegister.status === "open" ? "Cerrar Caja" : "Abrir Caja"}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card variant="stats">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Balance Actual</p>
              <p className="text-2xl font-bold text-foreground">
                {formatters.currency(cashRegister.currentBalance)}
              </p>
            </CardContent>
          </Card>
          <Card variant="stats">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Ingresos</p>
              <p className="text-2xl font-bold text-green-600">
                {formatters.currency(stats.totalIncome)}
              </p>
            </CardContent>
          </Card>
          <Card variant="stats">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Egresos</p>
              <p className="text-2xl font-bold text-red-600">
                {formatters.currency(stats.totalExpense)}
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="orders">Órdenes de Cobro</TabsTrigger>
            <TabsTrigger value="movements">Movimientos</TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="space-y-4">
            <GenericTable
              data={pendingOrders}
              columns={[
                { key: "orderNumber", header: "N° Orden", sortable: true },
                {
                  key: "sale",
                  header: "N° Venta",
                  render: (order: PaymentOrder) =>
                    order.sale?.saleNumber || "-",
                },
                {
                  key: "customer",
                  header: "Cliente",
                  render: (order: PaymentOrder) =>
                    order.sale?.customer?.name || "-",
                },
                {
                  key: "amount",
                  header: "Monto",
                  align: "right" as const,
                  sortable: true,
                  render: (order: PaymentOrder) =>
                    formatters.currency(order.amount),
                },
                {
                  key: "paymentMethod",
                  header: "Método",
                  render: (order: PaymentOrder) => (
                    <Badge variant="outline" size="sm">
                      {PAYMENT_METHODS[
                        order.sale
                          ?.paymentMethod as keyof typeof PAYMENT_METHODS
                      ] || "-"}
                    </Badge>
                  ),
                },
                {
                  key: "createdAt",
                  header: "Fecha",
                  sortable: true,
                  render: (order: PaymentOrder) =>
                    formatters.datetime(order.createdAt),
                },
              ]}
              actions={
                cashRegister.status === "open"
                  ? [
                      {
                        label: "Cobrar",
                        variant: "default" as const,
                        onClick: (order: PaymentOrder) => {
                          setSelectedOrder(order);
                          setIsModalOpen(true);
                        },
                      },
                      {
                        label: "Cancelar",
                        variant: "destructive" as const,
                        onClick: async (order: PaymentOrder) => {
                          confirm({
                            message: "¿Cancelar esta orden?",
                            onConfirm: () => onCancelOrder(order.id),
                          });
                        },
                      },
                    ]
                  : []
              }
              searchable
              searchPlaceholder="Buscar por número de orden..."
              emptyMessage={
                cashRegister.status === "open"
                  ? "No hay órdenes pendientes"
                  : "Abrí la caja para ver las órdenes pendientes"
              }
              loading={ordersLoading}
            />
          </TabsContent>

          <TabsContent value="movements">
            <Card>
              <CardHeader>
                <CardTitle>Movimientos del Día</CardTitle>
              </CardHeader>
              <CardContent>
                {movements.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    No hay movimientos registrados
                  </p>
                ) : (
                  <div className="space-y-3">
                    {movements.map((movement, index) => (
                      <div
                        key={
                          typeof movement.id === "string" ||
                          typeof movement.id === "number"
                            ? movement.id
                            : index
                        }
                        className="flex items-center justify-between p-4 border border-border rounded-lg"
                      >
                        <div className="flex items-center gap-4 flex-1">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              movement.type === "income"
                                ? "bg-green-500/10"
                                : "bg-red-500/10"
                            }`}
                          >
                            <svg
                              className={`w-5 h-5 ${movement.type === "income" ? "text-green-600" : "text-red-600"}`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              {movement.type === "income" ? (
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M7 11l5-5m0 0l5 5m-5-5v12"
                                />
                              ) : (
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M17 13l-5 5m0 0l-5-5m5 5V6"
                                />
                              )}
                            </svg>
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-foreground">
                              {movement.concept}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {formatters.time(movement.date)} •{" "}
                              {movement.user?.name || "Usuario"}
                            </p>
                            {movement.notes && (
                              <p className="text-xs text-muted-foreground mt-1">
                                {movement.notes}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <p
                            className={`text-lg font-bold ${movement.type === "income" ? "text-green-600" : "text-red-600"}`}
                          >
                            {movement.type === "income" ? "+" : "-"}
                            {formatters.currency(movement.amount)}
                          </p>
                          {movement.sale?.receipt?.id && onDownloadReceipt && (
                            <button
                              onClick={async () => {
                                const receiptId = movement.sale!.receipt!.id;
                                setDownloadingReceipts((prev) => ({
                                  ...prev,
                                  [receiptId]: true,
                                }));
                                try {
                                  await onDownloadReceipt(receiptId);
                                } finally {
                                  setDownloadingReceipts((prev) => ({
                                    ...prev,
                                    [receiptId]: false,
                                  }));
                                }
                              }}
                              disabled={
                                downloadingReceipts[movement.sale.receipt.id]
                              }
                              className="p-2 hover:bg-accent rounded-lg transition-colors disabled:opacity-50"
                              title="Descargar factura"
                            >
                              {downloadingReceipts[movement.sale.receipt.id] ? (
                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" />
                              ) : (
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
                                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                  />
                                </svg>
                              )}
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <GenericModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedOrder(null);
        }}
        onConfirm={handleCompleteOrder}
        mode="create"
        title="Completar Pago"
      >
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm font-medium">
              N° Orden: {selectedOrder?.orderNumber}
            </p>
            <p className="text-sm">
              N° Venta: {selectedOrder?.sale?.saleNumber}
            </p>
            <p className="text-sm">
              Cliente: {selectedOrder?.sale?.customer?.name}
            </p>
            <p className="text-sm">
              Método:{" "}
              {PAYMENT_METHODS[
                selectedOrder?.sale
                  ?.paymentMethod as keyof typeof PAYMENT_METHODS
              ] || "-"}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Monto a cobrar</p>
            <p className="text-3xl font-bold text-foreground">
              {formatters.currency(selectedOrder?.amount || 0)}
            </p>
          </div>
          <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
            <Label>Caja seleccionada</Label>
            <p className="text-lg font-semibold mt-1">{cashRegister.name}</p>
          </div>
        </div>
      </GenericModal>
    </>
  );
}
