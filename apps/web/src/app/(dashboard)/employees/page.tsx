"use client";

import { useState } from "react";
import { Button, Card, CardHeader, CardTitle, CardContent, Badge } from "@/components/ui";
import { GenericTable, GenericModal } from "@/components/common";
import type { TableColumn, TableAction } from "@/components/common";
import { ClientHandler } from "@/lib/client-handler";

interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  phone: string;
  status: string;
  joinDate: string;
}

export default function EmployeesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "update" | "delete" | "view">("create");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const employees: Employee[] = [
    { id: "1", name: "Carlos Técnico", email: "carlos@serviceflow.com", role: "Técnico", phone: "1234567890", status: "active", joinDate: "2023-01-15" },
    { id: "2", name: "Ana Vendedora", email: "ana@serviceflow.com", role: "Vendedor", phone: "0987654321", status: "active", joinDate: "2023-03-20" },
    { id: "3", name: "Luis Cajero", email: "luis@serviceflow.com", role: "Cajero", phone: "1122334455", status: "active", joinDate: "2023-06-10" },
  ];

  const columns: TableColumn<Employee>[] = [
    {
      key: "name",
      header: "Nombre",
      sortable: true,
      render: (employee) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-sm font-bold text-primary">{employee.name.charAt(0)}</span>
          </div>
          <div>
            <p className="font-medium">{employee.name}</p>
            <Badge variant="outline" size="sm">{employee.role}</Badge>
          </div>
        </div>
      ),
    },
    { key: "email", header: "Email", sortable: true },
    { key: "phone", header: "Teléfono", sortable: true },
    { key: "joinDate", header: "Ingreso", sortable: true },
    {
      key: "status",
      header: "Estado",
      align: "center",
      render: () => <Badge variant="success" size="sm">Activo</Badge>,
    },
  ];

  const actions: TableAction<Employee>[] = [
    {
      label: "",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      variant: "outline",
      onClick: (employee) => {
        setSelectedEmployee(employee);
        setModalMode("view");
        setIsModalOpen(true);
      },
    },
    {
      label: "",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      variant: "ghost",
      onClick: (employee) => {
        setSelectedEmployee(employee);
        setModalMode("update");
        setIsModalOpen(true);
      },
    },
    {
      label: "",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      ),
      variant: "destructive",
      onClick: (employee) => {
        setSelectedEmployee(employee);
        setModalMode("delete");
        setIsModalOpen(true);
      },
    },
  ];

  const handleModalConfirm = async () => {
    if (modalMode === "create") {
      ClientHandler.success("Empleado agregado correctamente");
    } else if (modalMode === "update") {
      ClientHandler.success("Empleado actualizado correctamente");
    } else if (modalMode === "delete") {
      ClientHandler.success("Empleado eliminado correctamente");
    }
    setIsModalOpen(false);
    setSelectedEmployee(null);
  };

  return (
    <>
      {/* Header */}
      <header className="bg-background border-b border-border px-4 sm:px-6 py-4 pb-7">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl font-bold text-[#111827] dark:text-white">Personal</h1>
            <p className="text-xs sm:text-sm text-[#10B981] font-medium">Gestiona tu equipo de trabajo</p>
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 -mt-12">
          <Button onClick={() => { setModalMode("create"); setIsModalOpen(true); }}>
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Nuevo Empleado
          </Button>
        </div>
      </header>

      <div className="p-6 space-y-6">



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

      {/* Employees Table */}
      <GenericTable
        data={employees}
        columns={columns}
        actions={actions}
        searchable
        searchPlaceholder="Buscar por nombre, email o rol..."
        emptyMessage="No hay empleados registrados"
      />

      {/* Modal */}
      <GenericModal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setSelectedEmployee(null); }}
        onConfirm={handleModalConfirm}
        mode={modalMode}
        title={modalMode === "create" ? "Nuevo Empleado" : modalMode === "update" ? "Editar Empleado" : modalMode === "delete" ? "Eliminar Empleado" : "Detalles del Empleado"}
      >
        {modalMode === "delete" ? (
          <p>¿Está seguro que desea eliminar a <strong>{selectedEmployee?.name}</strong>?</p>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Formulario de empleado aquí</p>
          </div>
        )}
      </GenericModal>
      </div>
    </>
  );
}
