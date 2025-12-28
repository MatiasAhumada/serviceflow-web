"use client";

import { useState } from "react";
import { useCashRegister } from "@/hooks/useCashRegister";
import { usePaymentOrders } from "@/hooks/usePaymentOrders";
import { useUsers } from "@/hooks/useUsers";
import { Button, Card, CardHeader, CardTitle, CardContent, Badge, Tabs, TabsList, TabsTrigger, TabsContent, Label, Input, Select } from "@/components/ui";
import { GenericTable, GenericModal } from "@/components/common";
import { formatters } from "@/utils/formatters.util";
import { STATUS_CONFIGS } from "@/utils/status-configs.util";
import { PaymentOrder } from "@/types";
import { ClientHandler } from "@/lib/client-handler";

export default function CashRegisterPage() {
  const { stats, movements, loading, cashRegisters, openCashRegister, closeCashRegister, createCashRegister, fetchCashRegisters } = useCashRegister();
  const { pendingOrders, isLoading: ordersLoading, completeOrder, cancelOrder } = usePaymentOrders();
  const { users } = useUsers();
  const [selectedOrder, setSelectedOrder] = useState<PaymentOrder | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCashRegisterId, setSelectedCashRegisterId] = useState<string>("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newCashRegisterName, setNewCashRegisterName] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<string>("");

  const handleOpenClose = async (cashRegId: string) => {
    const cashReg = cashRegisters.find(cr => cr.id === cashRegId);
    if (!cashReg) return;
    
    if (cashReg.status === 'open') {
      if (confirm(`¿Cerrar ${cashReg.name}?`)) {
        await closeCashRegister(cashRegId);
        await fetchCashRegisters();
      }
    } else {
      await openCashRegister(cashRegId);
      await fetchCashRegisters();
    }
  };

  const handleCreateCashRegister = async () => {
    if (!newCashRegisterName.trim()) {
      ClientHandler.error('Ingresá un nombre para la caja');
      return;
    }
    await createCashRegister(newCashRegisterName, selectedUserId || undefined);
    setIsCreateModalOpen(false);
    setNewCashRegisterName("");
    setSelectedUserId("");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!cashRegisters.length) {
    return (
      <>
        <div className="flex flex-col items-center justify-center p-8 space-y-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-2">No hay cajas configuradas</h2>
            <p className="text-muted-foreground mb-6">Creá una caja para comenzar a gestionar tus movimientos</p>
            <Button onClick={() => setIsCreateModalOpen(true)}>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Crear Caja
            </Button>
          </div>
        </div>
        <GenericModal
          isOpen={isCreateModalOpen}
          onClose={() => { setIsCreateModalOpen(false); setNewCashRegisterName(""); setSelectedUserId(""); }}
          onConfirm={handleCreateCashRegister}
          mode="create"
          title="Crear Nueva Caja"
        >
          <div className="space-y-4">
            <div>
              <Label htmlFor="cashRegisterName2">Nombre de la Caja *</Label>
              <Input
                id="cashRegisterName2"
                value={newCashRegisterName}
                onChange={(e) => setNewCashRegisterName(e.target.value)}
                placeholder="Ej: Caja 1, Caja Principal"
              />
            </div>
            <div>
              <Label htmlFor="assignedUser2">Asignar a Cajero (opcional)</Label>
              <Select
                options={users.filter(u => u.userType?.name === 'Cajero').map(u => ({ value: String(u.id), label: u.name }))}
                value={selectedUserId}
                onValueChange={(value) => setSelectedUserId(String(value))}
                placeholder="Seleccionar cajero"
              />
            </div>
          </div>
        </GenericModal>
      </>
    );
  }

  const activeCashRegister = cashRegisters.find(cr => cr.status === 'open');

  return (
    <>
      <header className="bg-background border-b border-border px-4 sm:px-6 py-4 pb-7">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl font-bold text-[#111827] dark:text-white">Caja</h1>
            <p className="text-xs sm:text-sm text-[#10B981] font-medium">Gestiona los movimientos de caja</p>
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 -mt-12">
          <Button onClick={() => setIsCreateModalOpen(true)}>
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Nueva Caja
          </Button>
        </div>
      </header>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cashRegisters.map((cashReg) => (
            <Card key={cashReg.id} variant="elevated">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{cashReg.name}</h3>
                    {cashReg.assignedUser && (
                      <p className="text-xs text-muted-foreground">Cajero: {cashReg.assignedUser.name}</p>
                    )}
                  </div>
                  <Badge variant={cashReg.status === 'open' ? 'success' : 'outline'}>
                    {cashReg.status === 'open' ? 'Abierta' : 'Cerrada'}
                  </Badge>
                </div>
                <div className="space-y-2 mb-4">
                  <p className="text-2xl font-bold">{formatters.currency(cashReg.currentBalance)}</p>
                  {cashReg.openTime && (
                    <p className="text-sm text-muted-foreground">
                      Abierta: {formatters.time(cashReg.openTime)}
                    </p>
                  )}
                </div>
                <Button
                  className="w-full"
                  variant={cashReg.status === 'open' ? 'destructive' : 'default'}
                  onClick={() => handleOpenClose(cashReg.id)}
                >
                  {cashReg.status === 'open' ? 'Cerrar Caja' : 'Abrir Caja'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card variant="stats">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Ingresos</p>
              <p className="text-2xl font-bold text-green-600">
                {formatters.currency(typeof stats?.totalIncome === 'number' ? stats.totalIncome : 0)}
              </p>
            </CardContent>
          </Card>
          <Card variant="stats">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Egresos</p>
              <p className="text-2xl font-bold text-red-600">
                {formatters.currency(typeof stats?.totalExpense === 'number' ? stats.totalExpense : 0)}
              </p>
            </CardContent>
          </Card>
          <Card variant="stats">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Pendientes de Cobro</p>
              <p className="text-2xl font-bold text-orange-600">{pendingOrders?.length || 0}</p>
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
              data={pendingOrders || []}
              columns={[
                { key: "orderNumber", header: "N° Orden", sortable: true },
                {
                  key: "sale",
                  header: "N° Venta",
                  render: (order: PaymentOrder) => order.sale?.saleNumber || '-',
                },
                {
                  key: "customer",
                  header: "Cliente",
                  render: (order: PaymentOrder) => order.sale?.customer?.name || '-',
                },
                {
                  key: "amount",
                  header: "Monto",
                  align: "right" as const,
                  sortable: true,
                  render: (order: PaymentOrder) => formatters.currency(order.amount),
                },
                {
                  key: "paymentMethod",
                  header: "Método",
                  render: (order: PaymentOrder) => {
                    const methods: Record<string, string> = {
                      cash: 'Efectivo',
                      debit_card: 'Débito',
                      credit_card: 'Crédito',
                      transfer: 'Transferencia',
                      qr: 'QR',
                      mercadopago: 'MercadoPago',
                    };
                    return <Badge variant="outline" size="sm">{methods[order.sale?.paymentMethod || ''] || '-'}</Badge>;
                  },
                },
                {
                  key: "createdAt",
                  header: "Fecha",
                  sortable: true,
                  render: (order: PaymentOrder) => formatters.datetime(order.createdAt),
                },
              ]}
              actions={activeCashRegister ? [
                {
                  label: "Cobrar",
                  variant: "default" as const,
                  onClick: (order: PaymentOrder) => {
                    setSelectedOrder(order);
                    setSelectedCashRegisterId(activeCashRegister.id);
                    setIsModalOpen(true);
                  },
                },
                {
                  label: "Cancelar",
                  variant: "destructive" as const,
                  onClick: async (order: PaymentOrder) => {
                    if (confirm('¿Cancelar esta orden?')) {
                      cancelOrder(order.id);
                    }
                  },
                },
              ] : []}
              searchable
              searchPlaceholder="Buscar por número de orden..."
              emptyMessage={activeCashRegister ? "No hay órdenes pendientes" : "Abrí una caja para ver las órdenes pendientes"}
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
                  <p className="text-center text-muted-foreground py-8">No hay movimientos registrados</p>
                ) : (
                  <div className="space-y-3">
                    {movements.map((movement, index) => (
                      <div key={typeof movement.id === 'string' || typeof movement.id === 'number' ? movement.id : index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            movement.type === "income" ? "bg-green-500/10" : "bg-red-500/10"
                          }`}>
                            <svg className={`w-5 h-5 ${movement.type === "income" ? "text-green-600" : "text-red-600"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              {movement.type === "income" ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                              ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                              )}
                            </svg>
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{movement.concept}</p>
                            <p className="text-sm text-muted-foreground">
                              {formatters.time(movement.date)} • {movement.user?.name || 'Usuario'}
                            </p>
                            {movement.notes && (
                              <p className="text-xs text-muted-foreground mt-1">{movement.notes}</p>
                            )}
                          </div>
                        </div>
                        <p className={`text-lg font-bold ${movement.type === "income" ? "text-green-600" : "text-red-600"}`}>
                          {movement.type === "income" ? "+" : "-"}{formatters.currency(movement.amount)}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <GenericModal
          isOpen={isModalOpen}
          onClose={() => { setIsModalOpen(false); setSelectedOrder(null); }}
          onConfirm={() => {
            if (selectedOrder && selectedCashRegisterId) {
              completeOrder({
                id: selectedOrder.id,
                dto: { cashRegisterId: selectedCashRegisterId },
              });
              setIsModalOpen(false);
              setSelectedOrder(null);
            }
          }}
          mode="create"
          title="Completar Pago"
        >
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm font-medium">N° Orden: {selectedOrder?.orderNumber}</p>
              <p className="text-sm">N° Venta: {selectedOrder?.sale?.saleNumber}</p>
              <p className="text-sm">Cliente: {selectedOrder?.sale?.customer?.name}</p>
              <p className="text-sm">Método: {selectedOrder?.sale?.paymentMethod}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Monto a cobrar</p>
              <p className="text-3xl font-bold text-foreground">
                {formatters.currency(selectedOrder?.amount || 0)}
              </p>
            </div>
            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
              <Label htmlFor="cashRegisterSelect">Seleccionar Caja</Label>
              <select
                id="cashRegisterSelect"
                value={selectedCashRegisterId}
                onChange={(e) => setSelectedCashRegisterId(e.target.value)}
                className="w-full mt-1 p-2 border rounded bg-background text-foreground"
              >
                <option value="">Sin caja</option>
                {cashRegisters.filter(cr => cr.status === 'open').map((cr) => (
                  <option key={cr.id} value={cr.id}>{cr.name}</option>
                ))}
              </select>
            </div>
          </div>
        </GenericModal>

        <GenericModal
          isOpen={isCreateModalOpen}
          onClose={() => { setIsCreateModalOpen(false); setNewCashRegisterName(""); setSelectedUserId(""); }}
          onConfirm={handleCreateCashRegister}
          mode="create"
          title="Crear Nueva Caja"
        >
          <div className="space-y-4">
            <div>
              <Label htmlFor="cashRegisterName">Nombre de la Caja *</Label>
              <Input
                id="cashRegisterName"
                value={newCashRegisterName}
                onChange={(e) => setNewCashRegisterName(e.target.value)}
                placeholder="Ej: Caja 1, Caja Principal"
              />
            </div>
            <div>
              <Label htmlFor="assignedUser">Asignar a Cajero (opcional)</Label>
              <Select
                options={users.filter(u => u.userType?.name === 'Cajero').map(u => ({ value: String(u.id), label: u.name }))}
                value={selectedUserId}
                onValueChange={(value) => setSelectedUserId(String(value))}
                placeholder="Seleccionar cajero"
              />
            </div>
          </div>
        </GenericModal>
      </div>
    </>
  );
}
