"use client";

import { useState } from "react";
import { Button, Card, CardHeader, CardTitle, CardContent, Badge, Input } from "@/components/ui";
import { ClientHandler } from "@/lib/client-handler";

export default function WorkOrdersPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const orders = [
    { id: "1", orderNumber: "OT-001", date: "2024-01-15", customer: "Juan Pérez", device: "Laptop HP", issue: "No enciende", status: "in_progress", technician: "Carlos Tech" },
    { id: "2", orderNumber: "OT-002", date: "2024-01-15", customer: "María García", device: "PC Desktop", issue: "Lento", status: "received", technician: "Sin asignar" },
    { id: "3", orderNumber: "OT-003", date: "2024-01-14", customer: "Carlos López", device: "Impresora", issue: "No imprime", status: "completed", technician: "Ana Tech" },
  ];

  const statusLabels: Record<string, string> = {
    received: "Recibido",
    in_progress: "En Progreso",
    completed: "Completado",
    delivered: "Entregado",
  };

  const statusVariants: Record<string, "outline" | "default" | "success"> = {
    received: "outline",
    in_progress: "default",
    completed: "success",
    delivered: "success",
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex-1 flex justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">Órdenes de Trabajo</h1>
            <p className="text-sm text-muted-foreground">Gestiona las órdenes de reparación</p>
          </div>
        </div>
        <Button onClick={() => ClientHandler.info("Nueva orden de trabajo")} className="-mr-2">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nueva Orden
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <Input
            placeholder="Buscar por número de orden, cliente o dispositivo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card variant="stats">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Recibidas</p>
            <p className="text-2xl font-bold text-foreground">{orders.filter(o => o.status === "received").length}</p>
          </CardContent>
        </Card>
        <Card variant="stats">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">En Progreso</p>
            <p className="text-2xl font-bold text-foreground">{orders.filter(o => o.status === "in_progress").length}</p>
          </CardContent>
        </Card>
        <Card variant="stats">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Completadas</p>
            <p className="text-2xl font-bold text-foreground">{orders.filter(o => o.status === "completed").length}</p>
          </CardContent>
        </Card>
        <Card variant="stats">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Mes</p>
            <p className="text-2xl font-bold text-foreground">45</p>
          </CardContent>
        </Card>
      </div>

      {/* Orders List */}
      <Card>
        <CardHeader>
          <CardTitle>Órdenes Recientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">N° Orden</th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">Fecha</th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">Cliente</th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">Dispositivo</th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">Problema</th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">Técnico</th>
                  <th className="text-center p-3 text-sm font-medium text-muted-foreground">Estado</th>
                  <th className="text-right p-3 text-sm font-medium text-muted-foreground">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-border hover:bg-accent/50 transition-colors">
                    <td className="p-3 font-medium text-foreground">{order.orderNumber}</td>
                    <td className="p-3 text-muted-foreground">{order.date}</td>
                    <td className="p-3 text-foreground">{order.customer}</td>
                    <td className="p-3 text-muted-foreground">{order.device}</td>
                    <td className="p-3 text-muted-foreground">{order.issue}</td>
                    <td className="p-3 text-muted-foreground">{order.technician}</td>
                    <td className="p-3 text-center">
                      <Badge variant={statusVariants[order.status]} size="sm">
                        {statusLabels[order.status]}
                      </Badge>
                    </td>
                    <td className="p-3 text-right">
                      <Button variant="outline" size="sm" onClick={() => ClientHandler.info(`Ver orden ${order.orderNumber}`)}>
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
