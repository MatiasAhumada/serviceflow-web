"use client";

import { Card, CardHeader, CardTitle, CardContent, Badge } from "@/components/ui";
import { Icon } from "@/components/common";
import { useSession } from "next-auth/react";
import { usePlanFeatures } from "@/hooks";

export default function Home() {
  const { data: session } = useSession();
  const { hasFeature } = usePlanFeatures();

  return (
    <>
        {/* Header */}
        <header className="bg-background border-b border-border px-4 sm:px-6 py-4 pb-7">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-xl sm:text-2xl font-bold text-[#111827] dark:text-white">Dashboard</h1>
              <p className="text-xs sm:text-sm text-[#10B981] font-medium">Panel de control principal</p>
            </div>
          </div>
          <div className="flex items-center justify-end gap-3 -mt-12">
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#10B981]/10 border border-[#10B981]/20">
                <div className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-[#10B981]">En línea</span>
              </div>
              <div className="text-right hidden md:block">
                <p className="text-sm font-medium text-[#111827] dark:text-white">{session?.user?.name}</p>
                <p className="text-xs text-[#10B981] font-medium">Administrador</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Órdenes/Ventas según plan */}
            <Card variant="stats">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {hasFeature("workOrders") ? "Órdenes Activas" : "Ventas del Mes"}
                    </p>
                    <p className="text-2xl font-bold text-foreground">24</p>
                  </div>
                  <Icon variant="primary" size="lg">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  </Icon>
                </div>
                <div className="mt-4 flex items-center">
                  <Badge variant="success" size="sm">+12%</Badge>
                  <span className="text-muted-foreground text-sm ml-2">vs mes anterior</span>
                </div>
              </CardContent>
            </Card>

            {/* Completadas */}
            <Card variant="stats">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {hasFeature("repairs") ? "Reparaciones" : "Ventas"} Completadas
                    </p>
                    <p className="text-2xl font-bold text-foreground">156</p>
                  </div>
                  <Icon variant="secondary" size="lg">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </Icon>
                </div>
                <div className="mt-4 flex items-center">
                  <Badge variant="success" size="sm">+8%</Badge>
                  <span className="text-muted-foreground text-sm ml-2">vs mes anterior</span>
                </div>
              </CardContent>
            </Card>

            {/* Ingresos */}
            <Card variant="stats">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Ingresos</p>
                    <p className="text-2xl font-bold text-foreground">$45,230</p>
                  </div>
                  <Icon variant="accent" size="lg">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </Icon>
                </div>
                <div className="mt-4 flex items-center">
                  <Badge variant="accent" size="sm">+23%</Badge>
                  <span className="text-muted-foreground text-sm ml-2">vs mes anterior</span>
                </div>
              </CardContent>
            </Card>

            {/* Clientes o Stock */}
            <Card variant="stats">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {hasFeature("stock") ? "Productos en Stock" : "Clientes"}
                    </p>
                    <p className="text-2xl font-bold text-foreground">89</p>
                  </div>
                  <Icon variant="destructive" size="lg">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {hasFeature("stock") ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      )}
                    </svg>
                  </Icon>
                </div>
                <div className="mt-4 flex items-center">
                  <Badge variant="success" size="sm">+5%</Badge>
                  <span className="text-muted-foreground text-sm ml-2">vs mes anterior</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Actividad Reciente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {hasFeature("repairs") && (
                  <>
                    <div className="flex items-center gap-4">
                      <Icon variant="success">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </Icon>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">Orden #1234 completada</p>
                        <p className="text-xs text-muted-foreground">Reparación de laptop - Cliente: Juan Pérez</p>
                      </div>
                      <Badge variant="outline" size="sm">Hace 2 min</Badge>
                    </div>
                    <div className="flex items-center gap-4">
                      <Icon variant="primary">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </Icon>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">Nueva orden creada #1235</p>
                        <p className="text-xs text-muted-foreground">Servicio de mantenimiento - Cliente: María García</p>
                      </div>
                      <Badge variant="outline" size="sm">Hace 15 min</Badge>
                    </div>
                    <div className="flex items-center gap-4">
                      <Icon variant="accent">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </Icon>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">Orden #1233 en progreso</p>
                        <p className="text-xs text-muted-foreground">Instalación de software - Cliente: Carlos López</p>
                      </div>
                      <Badge variant="outline" size="sm">Hace 1 hora</Badge>
                    </div>
                  </>
                )}
                {hasFeature("sales") && !hasFeature("repairs") && (
                  <>
                    <div className="flex items-center gap-4">
                      <Icon variant="success">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </Icon>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">Venta #1234 completada</p>
                        <p className="text-xs text-muted-foreground">3 productos - Cliente: Juan Pérez - $12,500</p>
                      </div>
                      <Badge variant="outline" size="sm">Hace 2 min</Badge>
                    </div>
                    <div className="flex items-center gap-4">
                      <Icon variant="primary">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </Icon>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">Nueva venta registrada #1235</p>
                        <p className="text-xs text-muted-foreground">5 productos - Cliente: María García - $8,300</p>
                      </div>
                      <Badge variant="outline" size="sm">Hace 15 min</Badge>
                    </div>
                    <div className="flex items-center gap-4">
                      <Icon variant="accent">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </Icon>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">Stock actualizado</p>
                        <p className="text-xs text-muted-foreground">15 productos agregados al inventario</p>
                      </div>
                      <Badge variant="outline" size="sm">Hace 1 hora</Badge>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
    </>
  );
}
