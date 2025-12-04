"use client";

import { useState } from "react";
import { Button, Card, CardHeader, CardTitle, CardContent, Badge, Input } from "@/components/ui";
import { ClientHandler } from "@/lib/client-handler";

export default function EmployeesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const employees = [
    { id: "1", name: "Carlos Técnico", email: "carlos@serviceflow.com", role: "Técnico", phone: "1234567890", status: "active", joinDate: "2023-01-15" },
    { id: "2", name: "Ana Vendedora", email: "ana@serviceflow.com", role: "Vendedor", phone: "0987654321", status: "active", joinDate: "2023-03-20" },
    { id: "3", name: "Luis Cajero", email: "luis@serviceflow.com", role: "Cajero", phone: "1122334455", status: "active", joinDate: "2023-06-10" },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex-1 flex justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">Personal</h1>
            <p className="text-sm text-muted-foreground">Gestiona tu equipo de trabajo</p>
          </div>
        </div>
        <Button onClick={() => ClientHandler.info("Agregar nuevo empleado")} className="-mr-2">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nuevo Empleado
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <Input
            placeholder="Buscar por nombre, email o rol..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card variant="stats">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Empleados</p>
            <p className="text-2xl font-bold text-foreground">{employees.length}</p>
          </CardContent>
        </Card>
        <Card variant="stats">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Activos</p>
            <p className="text-2xl font-bold text-foreground">{employees.filter(e => e.status === "active").length}</p>
          </CardContent>
        </Card>
        <Card variant="stats">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Roles Asignados</p>
            <p className="text-2xl font-bold text-foreground">{new Set(employees.map(e => e.role)).size}</p>
          </CardContent>
        </Card>
      </div>

      {/* Employees List */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Empleados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {employees.map((employee) => (
              <div key={employee.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-lg font-bold text-primary">{employee.name.charAt(0)}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-foreground">{employee.name}</p>
                      <Badge variant="outline" size="sm">{employee.role}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{employee.email} • {employee.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Ingreso</p>
                    <p className="text-sm font-medium text-foreground">{employee.joinDate}</p>
                  </div>
                  <Badge variant="success" size="sm">Activo</Badge>
                  <Button variant="outline" size="sm" onClick={() => ClientHandler.info(`Ver detalles de ${employee.name}`)}>
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
