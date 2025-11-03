"use client";

import { useState } from "react";
import { useApp } from "@/contexts";
import { Button, Sidebar, UserMenu, Card, CardHeader, CardTitle, CardContent, Badge, Icon } from "@/components/ui";
import { useSession, signOut } from "next-auth/react";
import type { SidebarItem, UserMenuOption } from "@/components/ui";

export default function Home() {
  const { theme, toggleTheme } = useApp();
  const { data: session } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const sidebarItems: SidebarItem[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
        </svg>
      ),
      href: "/",
      active: true,
    },
    {
      id: "orders",
      label: "Órdenes",
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      href: "/orders",
      badge: "12",
    },
    {
      id: "products",
      label: "Productos",
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      href: "/products",
    },
    {
      id: "services",
      label: "Servicios",
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
        </svg>
      ),
      href: "/services",
    },
  ];

  const userMenuOptions: UserMenuOption[] = [
    {
      id: "profile",
      label: "Mi perfil",
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      onClick: () => console.log("Profile"),
    },
    {
      id: "settings",
      label: "Configuración",
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      onClick: () => console.log("Settings"),
    },
    {
      id: "theme",
      label: theme === "light" ? "Modo oscuro" : "Modo claro",
      icon: theme === "light" ? (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      ) : (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      onClick: toggleTheme,
    },
    {
      id: "logout",
      label: "Cerrar sesión",
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
      ),
      onClick: () => signOut(),
      variant: "destructive",
    },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar
        items={sidebarItems}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        user={{
          name: session?.user?.name || "Usuario",
          email: session?.user?.email || "",
        }}
        userMenuOptions={userMenuOptions}
        footer={
          <UserMenu
            user={{
              name: session?.user?.name || "Usuario",
              email: session?.user?.email || "",
            }}
            options={userMenuOptions}
          />
        }
      />

      <main className="flex-1 transition-all duration-300">
        {/* Header */}
        <header className="bg-background border-b border-border px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-[#10B981]/30 bg-[#10B981]/10 hover:bg-[#10B981]/20 transition-colors"
              >
                <svg className="w-5 h-5 text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-[#111827] dark:text-white">Dashboard</h1>
                <p className="text-xs sm:text-sm text-[#10B981] hidden sm:block font-medium">Panel de control principal</p>
              </div>
            </div>
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
            <Card variant="stats">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted">Órdenes Activas</p>
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
                  <span className="text-muted text-sm ml-2">vs mes anterior</span>
                </div>
              </CardContent>
            </Card>

            <Card variant="stats">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted">Completadas</p>
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
                  <span className="text-muted text-sm ml-2">vs mes anterior</span>
                </div>
              </CardContent>
            </Card>

            <Card variant="stats">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted">Ingresos</p>
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
                  <span className="text-muted text-sm ml-2">vs mes anterior</span>
                </div>
              </CardContent>
            </Card>

            <Card variant="stats">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted">Clientes</p>
                    <p className="text-2xl font-bold text-foreground">89</p>
                  </div>
                  <Icon variant="destructive" size="lg">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </Icon>
                </div>
                <div className="mt-4 flex items-center">
                  <Badge variant="success" size="sm">+5%</Badge>
                  <span className="text-muted text-sm ml-2">vs mes anterior</span>
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
                <div className="flex items-center gap-4">
                  <Icon variant="success">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </Icon>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">Orden #1234 completada</p>
                    <p className="text-xs text-muted">Reparación de laptop - Cliente: Juan Pérez</p>
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
                    <p className="text-xs text-muted">Servicio de mantenimiento - Cliente: María García</p>
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
                    <p className="text-xs text-muted">Instalación de software - Cliente: Carlos López</p>
                  </div>
                  <Badge variant="outline" size="sm">Hace 1 hora</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
