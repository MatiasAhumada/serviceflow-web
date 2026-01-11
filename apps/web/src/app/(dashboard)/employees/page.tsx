"use client";

import { useState } from "react";
import { Card, CardContent, Badge } from "@/components/ui";
import { GenericTable, GenericModal } from "@/components/common";
import type { TableColumn, TableAction } from "@/components/common";
import { useUsers } from "@/hooks/useUsers";
import { formatters } from "@/utils/formatters.util";
import { STATUS_CONFIGS } from "@/utils/status-configs.util";

interface User {
  id: string | number;
  name: string;
  email: string;
  phone?: string;
  userType?: {
    name?: string;
  };
  status: string;
  createdAt: string;
}

export default function EmployeesPage() {
  const { users, stats, loading } = useUsers();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<
    "create" | "update" | "delete" | "view"
  >("view");
  const [selectedEmployee, setSelectedEmployee] = useState<User | null>(null);

  const columns: TableColumn<User>[] = [
    {
      key: "name",
      header: "Nombre",
      sortable: true,
      render: (user) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-sm font-bold text-primary">
              {user.name.charAt(0)}
            </span>
          </div>
          <div>
            <p className="font-medium">{user.name}</p>
            <Badge variant="outline" size="sm">
              {user.userType?.name || "Sin rol"}
            </Badge>
          </div>
        </div>
      ),
    },
    { key: "email", header: "Email", sortable: true },
    { key: "phone", header: "Teléfono", sortable: true },
    {
      key: "createdAt",
      header: "Ingreso",
      sortable: true,
      render: (user) => formatters.date(user.createdAt),
    },
    {
      key: "status",
      header: "Estado",
      align: "center",
      render: (user) => {
        const config =
          STATUS_CONFIGS.user[user.status as keyof typeof STATUS_CONFIGS.user];
        return (
          <Badge variant={config.variant} size="sm">
            {config.label}
          </Badge>
        );
      },
    },
  ];

  const actions: TableAction<User>[] = [
    {
      label: "",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
      ),
      variant: "outline",
      onClick: (user) => {
        setSelectedEmployee(user);
        setModalMode("view");
        setIsModalOpen(true);
      },
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <header className="bg-background border-b border-border px-4 sm:px-6 py-4 pb-7">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl font-bold text-[#111827] dark:text-white">
              Personal
            </h1>
            <p className="text-xs sm:text-sm text-[#10B981] font-medium">
              Gestiona tu equipo de trabajo
            </p>
          </div>
        </div>
      </header>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card variant="stats">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Total Empleados</p>
              <p className="text-2xl font-bold text-foreground">
                {typeof stats?.total === "number" ? stats.total : 0}
              </p>
            </CardContent>
          </Card>
          <Card variant="stats">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Activos</p>
              <p className="text-2xl font-bold text-green-600">
                {typeof stats?.active === "number" ? stats.active : 0}
              </p>
            </CardContent>
          </Card>
          <Card variant="stats">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Inactivos</p>
              <p className="text-2xl font-bold text-red-600">
                {typeof stats?.inactive === "number" ? stats.inactive : 0}
              </p>
            </CardContent>
          </Card>
          <Card variant="stats">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Roles</p>
              <p className="text-2xl font-bold text-foreground">
                {typeof stats?.byRole === "object" && stats.byRole
                  ? Object.keys(stats.byRole).length
                  : 0}
              </p>
            </CardContent>
          </Card>
        </div>

        <GenericTable<User>
          data={users}
          columns={columns}
          actions={actions}
          searchable
          searchPlaceholder="Buscar por nombre, email o rol..."
          emptyMessage="No hay empleados registrados"
        />

        <GenericModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedEmployee(null);
          }}
          mode={modalMode}
          title="Detalles del Empleado"
        >
          {selectedEmployee && (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Nombre</p>
                <p className="font-medium">{selectedEmployee.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{selectedEmployee.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Rol</p>
                <p className="font-medium">
                  {selectedEmployee.userType?.name || "Sin rol"}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Estado</p>
                <Badge
                  variant={
                    STATUS_CONFIGS.user[
                      selectedEmployee.status as keyof typeof STATUS_CONFIGS.user
                    ].variant
                  }
                >
                  {
                    STATUS_CONFIGS.user[
                      selectedEmployee.status as keyof typeof STATUS_CONFIGS.user
                    ].label
                  }
                </Badge>
              </div>
            </div>
          )}
        </GenericModal>
      </div>
    </>
  );
}
