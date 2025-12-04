"use client";

import { useState } from "react";
import { Button, Card, CardHeader, CardTitle, CardContent, Badge, Input } from "@/components/ui";
import { ClientHandler } from "@/lib/client-handler";

export default function SalesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const sales = [
    { id: "1", saleNumber: "V-001", date: "2024-01-15", customer: "Juan Pérez", items: 3, total: 12500, status: "completed", paymentMethod: "card" },
    { id: "2", saleNumber: "V-002", date: "2024-01-15", customer: "María García", items: 5, total: 8300, status: "completed", paymentMethod: "cash" },
    { id: "3", saleNumber: "V-003", date: "2024-01-16", customer: "Carlos López", items: 2, total: 15000, status: "pending", paymentMethod: "transfer" },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex-1 flex justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">Ventas</h1>
            <p className="text-sm text-muted-foreground">Registra y gestiona tus ventas</p>
          </div>
        </div>
        <Button onClick={() => ClientHandler.info("Nueva venta")} className="-mr-2">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nueva Venta
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <Input
            placeholder="Buscar por número de venta o cliente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card variant="stats">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Ventas Hoy</p>
            <p className="text-2xl font-bold text-foreground">8</p>
          </CardContent>
        </Card>
        <Card variant="stats">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Hoy</p>
            <p className="text-2xl font-bold text-foreground">$45,230</p>
          </CardContent>
        </Card>
        <Card variant="stats">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Ventas Mes</p>
            <p className="text-2xl font-bold text-foreground">156</p>
          </CardContent>
        </Card>
        <Card variant="stats">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Mes</p>
            <p className="text-2xl font-bold text-foreground">$523,450</p>
          </CardContent>
        </Card>
      </div>

      {/* Sales List */}
      <Card>
        <CardHeader>
          <CardTitle>Ventas Recientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">N° Venta</th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">Fecha</th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">Cliente</th>
                  <th className="text-right p-3 text-sm font-medium text-muted-foreground">Items</th>
                  <th className="text-right p-3 text-sm font-medium text-muted-foreground">Total</th>
                  <th className="text-center p-3 text-sm font-medium text-muted-foreground">Pago</th>
                  <th className="text-center p-3 text-sm font-medium text-muted-foreground">Estado</th>
                  <th className="text-right p-3 text-sm font-medium text-muted-foreground">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {sales.map((sale) => (
                  <tr key={sale.id} className="border-b border-border hover:bg-accent/50 transition-colors">
                    <td className="p-3 font-medium text-foreground">{sale.saleNumber}</td>
                    <td className="p-3 text-muted-foreground">{sale.date}</td>
                    <td className="p-3 text-foreground">{sale.customer}</td>
                    <td className="p-3 text-right text-muted-foreground">{sale.items}</td>
                    <td className="p-3 text-right font-medium text-foreground">${sale.total.toLocaleString()}</td>
                    <td className="p-3 text-center">
                      <Badge variant="outline" size="sm">
                        {sale.paymentMethod === "card" ? "Tarjeta" : sale.paymentMethod === "cash" ? "Efectivo" : "Transferencia"}
                      </Badge>
                    </td>
                    <td className="p-3 text-center">
                      <Badge variant={sale.status === "completed" ? "success" : "outline"} size="sm">
                        {sale.status === "completed" ? "Completada" : "Pendiente"}
                      </Badge>
                    </td>
                    <td className="p-3 text-right">
                      <Button variant="outline" size="sm" onClick={() => ClientHandler.info(`Ver venta ${sale.saleNumber}`)}>
                        Ver
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
