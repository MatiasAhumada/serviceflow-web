"use client";

import { useCashRegister } from "@/hooks/useCashRegister";
import { Button, Card, CardHeader, CardTitle, CardContent, Badge } from "@/components/ui";
import { formatters } from "@/utils/formatters.util";
import { STATUS_CONFIGS } from "@/utils/status-configs.util";

export default function CashRegisterPage() {
  const { stats, movements, loading, openCashRegister, closeCashRegister } = useCashRegister();

  const handleOpenClose = async () => {
    if (!stats?.cashRegisterId || typeof stats.cashRegisterId !== 'string') return;
    
    if (stats.isOpen) {
      if (confirm('¿Cerrar la caja?')) {
        await closeCashRegister(stats.cashRegisterId);
      }
    } else {
      await openCashRegister(stats.cashRegisterId);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const statusConfig = stats?.isOpen ? STATUS_CONFIGS.cashRegister.open : STATUS_CONFIGS.cashRegister.closed;

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
          {stats?.isOpen ? (
            <Button variant="destructive" onClick={handleOpenClose}>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Cerrar Caja
            </Button>
          ) : (
            <Button onClick={handleOpenClose}>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
              </svg>
              Abrir Caja
            </Button>
          )}
        </div>
      </header>

      <div className="p-6 space-y-6">
        <Card variant="elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Estado de Caja</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant={statusConfig.variant}>
                    {statusConfig.label}
                  </Badge>
                  {stats?.openTime && typeof stats.openTime === 'string' ? (
                    <span className="text-sm text-muted-foreground">
                      • Apertura: {formatters.time(stats.openTime)}
                    </span>
                  ) : null}
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Saldo Actual</p>
                <p className="text-3xl font-bold text-foreground">
                  {formatters.currency(typeof stats?.currentBalance === 'number' ? stats.currentBalance : 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

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
              <p className="text-sm text-muted-foreground">Movimientos</p>
              <p className="text-2xl font-bold text-foreground">{typeof stats?.movementsCount === 'number' ? stats.movementsCount : 0}</p>
            </CardContent>
          </Card>
        </div>

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
      </div>
    </>
  );
}
