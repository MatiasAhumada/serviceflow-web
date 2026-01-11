"use client";

import { useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Badge,
} from "@/components/ui";
import { GenericModal } from "@/components/common";
import { ClientHandler } from "@/lib/client-handler";

interface Repair {
  id: string;
  orderNumber: string;
  device: string;
  repair: string;
  parts: string;
  labor: number;
  partsCost: number;
  total: number;
  status: string;
}

export default function RepairsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<
    "create" | "update" | "delete" | "view"
  >("create");
  const [selectedRepair, setSelectedRepair] = useState<Repair | null>(null);

  // Evitar warning de variable no usada
  void selectedRepair;

  const repairs: Repair[] = [
    {
      id: "1",
      orderNumber: "OT-001",
      device: "Laptop HP",
      repair: "Cambio de disco duro",
      parts: "Disco SSD 500GB",
      labor: 2000,
      partsCost: 8000,
      total: 10000,
      status: "completed",
    },
    {
      id: "2",
      orderNumber: "OT-002",
      device: "PC Desktop",
      repair: "Limpieza y optimización",
      parts: "Pasta térmica",
      labor: 1500,
      partsCost: 200,
      total: 1700,
      status: "in_progress",
    },
    {
      id: "3",
      orderNumber: "OT-003",
      device: "Impresora",
      repair: "Cambio de cabezal",
      parts: "Cabezal HP",
      labor: 1000,
      partsCost: 3500,
      total: 4500,
      status: "completed",
    },
  ];

  return (
    <>
      {/* Header */}
      <header className="bg-background border-b border-border px-4 sm:px-6 py-4 pb-7">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl font-bold text-[#111827] dark:text-white">
              Reparaciones
            </h1>
            <p className="text-xs sm:text-sm text-[#10B981] font-medium">
              Detalle de reparaciones realizadas
            </p>
          </div>
        </div>
      </header>

      <div className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card variant="stats">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Reparaciones Hoy</p>
              <p className="text-2xl font-bold text-foreground">5</p>
            </CardContent>
          </Card>
          <Card variant="stats">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">En Proceso</p>
              <p className="text-2xl font-bold text-foreground">
                {repairs.filter((r) => r.status === "in_progress").length}
              </p>
            </CardContent>
          </Card>
          <Card variant="stats">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Completadas Mes</p>
              <p className="text-2xl font-bold text-foreground">38</p>
            </CardContent>
          </Card>
          <Card variant="stats">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Ingresos Mes</p>
              <p className="text-2xl font-bold text-foreground">$156,200</p>
            </CardContent>
          </Card>
        </div>

        {/* Repairs List */}
        <Card>
          <CardHeader>
            <CardTitle>Reparaciones Recientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {repairs.map((repair) => (
                <div
                  key={repair.id}
                  className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-foreground">
                          {repair.orderNumber}
                        </p>
                        <Badge
                          variant={
                            repair.status === "completed"
                              ? "success"
                              : "default"
                          }
                          size="sm"
                        >
                          {repair.status === "completed"
                            ? "Completada"
                            : "En Proceso"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {repair.device}
                      </p>
                    </div>
                    <p className="text-lg font-bold text-foreground">
                      ${repair.total.toLocaleString()}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Reparación:</span>
                      <span className="text-foreground">{repair.repair}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Repuestos:</span>
                      <span className="text-foreground">
                        {repair.parts} - ${repair.partsCost.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Mano de obra:
                      </span>
                      <span className="text-foreground">
                        ${repair.labor.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-border flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedRepair(repair);
                        setModalMode("view");
                        setIsModalOpen(true);
                      }}
                    >
                      Ver Detalles
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedRepair(repair);
                        setModalMode("update");
                        setIsModalOpen(true);
                      }}
                    >
                      Editar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        {/* Modal */}
        <GenericModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedRepair(null);
          }}
          onConfirm={async () => {
            if (modalMode === "update") {
              ClientHandler.success("Reparación actualizada correctamente");
            }
            setIsModalOpen(false);
            setSelectedRepair(null);
          }}
          mode={modalMode}
          title={
            modalMode === "update"
              ? "Editar Reparación"
              : "Detalles de la Reparación"
          }
        >
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Detalles de la reparación aquí
            </p>
          </div>
        </GenericModal>
      </div>
    </>
  );
}
