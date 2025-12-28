"use client";

import { CashRegister } from "@/types";
import { Button, Card, CardContent, Badge } from "@/components/ui";
import { formatters } from "@/utils/formatters.util";
import { ClientHandler } from "@/lib/client-handler";

interface CashRegisterWithStats extends CashRegister {
  totalIncome?: number;
  totalExpense?: number;
  movementsCount?: number;
}

interface CashRegisterListProps {
  cashRegisters: CashRegisterWithStats[];
  onSelectCashRegister: (cashRegisterId: string) => void;
  onCreateCashRegister: () => void;
  onDeleteCashRegister: (cashRegisterId: string) => void;
}

export function CashRegisterList({ cashRegisters, onSelectCashRegister, onCreateCashRegister, onDeleteCashRegister }: CashRegisterListProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Cajas Registradas</h2>
          <p className="text-sm text-muted-foreground">Seleccioná una caja para ver su detalle</p>
        </div>
        <Button onClick={onCreateCashRegister}>
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nueva Caja
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cashRegisters.map((cashReg) => (
          <Card key={cashReg.id} variant="elevated" className="relative">
            <CardContent className="p-6">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  ClientHandler.confirm(`¿Eliminar ${cashReg.name}?`, () => {
                    onDeleteCashRegister(cashReg.id);
                  });
                }}
                className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
              <div
                className="cursor-pointer"
                onClick={() => onSelectCashRegister(cashReg.id)}
              >
                <div className="flex items-center justify-between mb-4 pr-8">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{cashReg.name}</h3>
                    {cashReg.user && (
                      <p className="text-xs text-muted-foreground">Cajero: {cashReg.user.name}</p>
                    )}
                  </div>
                  <Badge variant={cashReg.status === 'open' ? 'success' : 'outline'}>
                    {cashReg.status === 'open' ? 'Abierta' : 'Cerrada'}
                  </Badge>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Balance Actual</p>
                    <p className="text-2xl font-bold">{formatters.currency(cashReg.currentBalance)}</p>
                  </div>
                  {cashReg.status === 'open' && (
                    <>
                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border">
                        <div>
                          <p className="text-xs text-muted-foreground">Ingresos</p>
                          <p className="text-sm font-semibold text-green-600">
                            {formatters.currency(cashReg.totalIncome || 0)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Egresos</p>
                          <p className="text-sm font-semibold text-red-600">
                            {formatters.currency(cashReg.totalExpense || 0)}
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Abierta: {formatters.time(cashReg.openTime || '')}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
