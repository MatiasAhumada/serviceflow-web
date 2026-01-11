"use client";

import { useState } from "react";
import { useCashRegister } from "@/hooks/useCashRegister";
import { usePaymentOrders } from "@/hooks/usePaymentOrders";
import { useUsers } from "@/hooks/useUsers";
import { useReceipts } from "@/hooks/useReceipts";
import { Button, Label, Input, Select } from "@/components/ui";
import { GenericModal } from "@/components/common";
import { CashRegisterList } from "@/components/features/CashRegisterList";
import { CashRegisterDetail } from "@/components/features/CashRegisterDetail";
import { ClientHandler } from "@/lib/client-handler";
import { cashRegistersService } from "@/services/api/cash-registers.service";
import { useConfirm } from "@/hooks/useConfirm";

export default function CashRegisterPage() {
  const {
    stats,
    movements,
    loading,
    cashRegisters,
    openCashRegister,
    closeCashRegister,
    createCashRegister,
    fetchCashRegisters,
    fetchMovements,
  } = useCashRegister();
  const {
    pendingOrders,
    isLoading: ordersLoading,
    completeOrder,
    cancelOrder,
  } = usePaymentOrders();
  const { users } = useUsers();
  const { confirm, ConfirmDialog } = useConfirm();
  const { downloadPDF } = useReceipts();
  const [selectedCashRegisterId, setSelectedCashRegisterId] = useState<
    string | null
  >(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newCashRegisterName, setNewCashRegisterName] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<string>("");

  const handleCreateCashRegister = async () => {
    if (!newCashRegisterName.trim()) {
      ClientHandler.error("Ingresá un nombre para la caja");
      return;
    }
    await createCashRegister(newCashRegisterName, selectedUserId || undefined);
    setIsCreateModalOpen(false);
    setNewCashRegisterName("");
    setSelectedUserId("");
  };

  const handleOpenClose = async (cashRegId: string) => {
    const cashReg = cashRegisters.find((cr) => cr.id === cashRegId);
    if (!cashReg) return;

    if (cashReg.status === "open") {
      confirm({
        message: `¿Cerrar ${cashReg.name}?`,
        onConfirm: async () => {
          await closeCashRegister(cashRegId);
          await fetchCashRegisters();
        },
      });
    } else {
      await openCashRegister(cashRegId);
      await fetchCashRegisters();
    }
  };

  const handleCompleteOrder = async (
    orderId: string,
    cashRegisterId: string,
  ) => {
    completeOrder({
      id: orderId,
      dto: { cashRegisterId },
    });
    await fetchMovements();
  };

  const handleDeleteCashRegister = async (cashRegId: string) => {
    try {
      await cashRegistersService.delete(cashRegId);
      ClientHandler.success("Caja eliminada exitosamente");
      await fetchCashRegisters();
    } catch {
      ClientHandler.error("Error al eliminar caja");
    }
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
        <header className="bg-background border-b border-border px-4 sm:px-6 py-4 pb-7">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-xl sm:text-2xl font-bold text-[#111827] dark:text-white">
                Cajas
              </h1>
              <p className="text-xs sm:text-sm text-[#10B981] font-medium">
                Gestiona tus cajas registradoras
              </p>
            </div>
          </div>
        </header>
        <div className="flex flex-col items-center justify-center p-8 space-y-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              No hay cajas configuradas
            </h2>
            <p className="text-muted-foreground mb-6">
              Creá una caja para comenzar a gestionar tus movimientos
            </p>
            <Button onClick={() => setIsCreateModalOpen(true)}>
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
              Crear Caja
            </Button>
          </div>
        </div>
        <GenericModal
          isOpen={isCreateModalOpen}
          onClose={() => {
            setIsCreateModalOpen(false);
            setNewCashRegisterName("");
            setSelectedUserId("");
          }}
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
                options={users
                  .filter((u) => u.userType?.name === "Cajero")
                  .map((u) => ({ value: String(u.id), label: u.name }))}
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

  const selectedCashRegister = selectedCashRegisterId
    ? cashRegisters.find((cr) => cr.id === selectedCashRegisterId)
    : null;

  return (
    <>
      <ConfirmDialog />
      <header className="bg-background border-b border-border px-4 sm:px-6 py-4 pb-7">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl font-bold text-[#111827] dark:text-white">
              Cajas
            </h1>
            <p className="text-xs sm:text-sm text-[#10B981] font-medium">
              Gestiona tus cajas registradoras
            </p>
          </div>
        </div>
      </header>

      <div className="p-6">
        {selectedCashRegister ? (
          <CashRegisterDetail
            cashRegister={selectedCashRegister}
            stats={{
              totalIncome:
                typeof stats?.totalIncome === "number" ? stats.totalIncome : 0,
              totalExpense:
                typeof stats?.totalExpense === "number"
                  ? stats.totalExpense
                  : 0,
            }}
            movements={movements}
            pendingOrders={pendingOrders || []}
            ordersLoading={ordersLoading}
            onBack={() => setSelectedCashRegisterId(null)}
            onOpen={() => handleOpenClose(selectedCashRegister.id)}
            onClose={() => handleOpenClose(selectedCashRegister.id)}
            onCompleteOrder={handleCompleteOrder}
            onCancelOrder={cancelOrder}
            onDownloadReceipt={downloadPDF}
          />
        ) : (
          <CashRegisterList
            cashRegisters={cashRegisters}
            onSelectCashRegister={setSelectedCashRegisterId}
            onCreateCashRegister={() => setIsCreateModalOpen(true)}
            onDeleteCashRegister={handleDeleteCashRegister}
          />
        )}
      </div>

      <GenericModal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setNewCashRegisterName("");
          setSelectedUserId("");
        }}
        onConfirm={handleCreateCashRegister}
        mode="create"
        title="Crear Nueva Caja"
      >
        <div className="space-y-4">
          <div>
            <Label htmlFor="cashRegisterNameModal">Nombre de la Caja *</Label>
            <Input
              id="cashRegisterNameModal"
              value={newCashRegisterName}
              onChange={(e) => setNewCashRegisterName(e.target.value)}
              placeholder="Ej: Caja 1, Caja Principal"
            />
          </div>
          <div>
            <Label htmlFor="assignedUserModal">
              Asignar a Cajero (opcional)
            </Label>
            <Select
              options={users
                .filter((u) => u.userType?.name === "Cajero")
                .map((u) => ({ value: String(u.id), label: u.name }))}
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
