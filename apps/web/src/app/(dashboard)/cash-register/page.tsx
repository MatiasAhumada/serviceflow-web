"use client";

import { useState } from "react";
import { Button, Card, CardHeader, CardTitle, CardContent, Badge } from "@/components/ui";
import { ClientHandler } from "@/lib/client-handler";

export default function CashRegisterPage() {
  const [isOpen, setIsOpen] = useState(true);

  const movements = [
    { id: "1", type: "income", concept: "Venta #V-001", amount: 12500, time: "10:30", user: "Admin" },
    { id: "2", type: "income", concept: "Venta #V-002", amount: 8300, time: "11:15", user: "Admin" },
    { id: "3", type: "expense", concept: "Compra repuestos", amount: 5000, time: "12:00", user: "Admin" },
    { id: "4", type: "income", concept: "Venta #V-003", amount: 15000, time: "14:30", user: "Admin" },
  ];

  const totalIncome = movements.filter(m => m.type === "income").reduce((acc, m) => acc + m.amount, 0);
  const totalExpense = movements.filter(m => m.type === "expense").reduce((acc, m) => acc + m.amount, 0);
  const balance = totalIncome - totalExpense;

  return (
    <>
      {/* Header */}
      <header className="bg-background border-b border-border px-4 sm:px-6 py-4 pb-7">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl font-bold text-[#111827] dark:text-white">Caja</h1>
            <p className="text-xs sm:text-sm text-[#10B981] font-medium">Gestiona los movimientos de caja</p>
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 -mt-12">
          {isOpen ? (
            <Button variant="destructive" onClick={() => ClientHandler.warning("Cerrar caja")}>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Cerrar Caja
            </Button>
          ) : (
            <Button onClick={() => ClientHandler.success("Abrir caja")}>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
              </svg>
              Abrir Caja
            </Button>
          )}
        </div>
      </header>

      <div className="p-6 space-y-6">

      {/* Status */}
      <Card variant="elevated">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Estado de Caja</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant={isOpen ? "success" : "destructive"}>
                  {isOpen ? "Abierta" : "Cerrada"}
                </Badge>
                <span className="text-sm text-muted-foreground">• Apertura: 08:00 AM</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Saldo Actual</p>
              <p className="text-3xl font-bold text-foreground">${balance.toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card variant="stats">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Ingresos</p>
            <p className="text-2xl font-bold text-green-600">${totalIncome.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card variant="stats">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Egresos</p>
            <p className="text-2xl font-bold text-red-600">${totalExpense.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card variant="stats">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Movimientos</p>
            <p className="text-2xl font-bold text-foreground">{movements.length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Movements */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Movimientos del Día</CardTitle>
            <Button variant="outline" size="sm" onClick={() => ClientHandler.info("Registrar movimiento")}>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Nuevo Movimiento
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {movements.map((movement) => (
              <div key={movement.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
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
                    <p className="text-sm text-muted-foreground">{movement.time} • {movement.user}</p>
                  </div>
                </div>
                <p className={`text-lg font-bold ${movement.type === "income" ? "text-green-600" : "text-red-600"}`}>
                  {movement.type === "income" ? "+" : "-"}${movement.amount.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      </div>
    </>
  );
}
