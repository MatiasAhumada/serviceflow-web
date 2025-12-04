"use client";

import { useState } from "react";
import { useApp } from "@/contexts";
import { Button, Card, CardHeader, CardTitle, CardContent, Badge, Input } from "@/components/ui";
import { ClientHandler } from "@/lib/client-handler";

export default function ClientsPage() {
  const { theme } = useApp();
  const [searchTerm, setSearchTerm] = useState("");

  const clients = [
    { id: "1", name: "Juan Pérez", phone: "1234567890", email: "juan@email.com", totalPurchases: 15, totalAmount: 45000 },
    { id: "2", name: "María García", phone: "0987654321", email: "maria@email.com", totalPurchases: 8, totalAmount: 23000 },
    { id: "3", name: "Carlos López", phone: "1122334455", email: "carlos@email.com", totalPurchases: 12, totalAmount: 38000 },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex-1 flex justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">Clientes</h1>
            <p className="text-sm text-muted-foreground">Gestiona tu base de clientes</p>
          </div>
        </div>
        <Button onClick={() => ClientHandler.info("Crear nuevo cliente")} className="-mr-2">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nuevo Cliente
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <Input
            placeholder="Buscar por nombre, teléfono o email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card variant="stats">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Clientes</p>
            <p className="text-2xl font-bold text-foreground">{clients.length}</p>
          </CardContent>
        </Card>
        <Card variant="stats">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Clientes Activos</p>
            <p className="text-2xl font-bold text-foreground">{clients.length}</p>
          </CardContent>
        </Card>
        <Card variant="stats">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Nuevos este mes</p>
            <p className="text-2xl font-bold text-foreground">5</p>
          </CardContent>
        </Card>
      </div>

      {/* Clients List */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Clientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {clients.map((client) => (
              <div key={client.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-lg font-bold text-primary">{client.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{client.name}</p>
                    <p className="text-sm text-muted-foreground">{client.phone} • {client.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Compras</p>
                    <p className="font-medium text-foreground">{client.totalPurchases}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Total</p>
                    <p className="font-medium text-foreground">${client.totalAmount.toLocaleString()}</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => ClientHandler.info(`Ver detalles de ${client.name}`)}>
                    Ver
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
