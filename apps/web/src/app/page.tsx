"use client";

import { useState } from "react";
import Image from "next/image";
import { useApp } from "@/contexts";
import { Button, Sidebar, UserMenu } from "@serviceflow/ui";
import { useSession, signOut } from "next-auth/react";
import type { SidebarItem, UserMenuOption } from "@serviceflow/ui";

export default function Home() {
  const { theme, toggleTheme } = useApp();
  const { data: session } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const sidebarItems: SidebarItem[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: "📊",
      href: "/",
      active: true
    },
    {
      id: "orders",
      label: "Órdenes",
      icon: "📝",
      href: "/orders"
    },
    {
      id: "products",
      label: "Productos",
      icon: "📦",
      href: "/products"
    },
    {
      id: "services",
      label: "Servicios",
      icon: "🔧",
      href: "/services"
    }
  ];

  const userMenuOptions: UserMenuOption[] = [
    {
      id: "profile",
      label: "Mi perfil",
      icon: "👤",
      onClick: () => console.log("Profile")
    },
    {
      id: "theme",
      label: theme === "light" ? "Modo oscuro" : "Modo claro",
      icon: theme === "light" ? "🌙" : "☀️",
      onClick: toggleTheme
    },
    {
      id: "logout",
      label: "Cerrar sesión",
      icon: "🚪",
      onClick: () => signOut(),
      variant: "destructive"
    }
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar
        items={sidebarItems}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        header={null}
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
      
      <main className={`flex-1 p-8 transition-all duration-300 ${
        sidebarOpen ? "lg:ml-64" : "lg:ml-16"
      }`}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-6 mb-8">
            <div className="flex items-center gap-4">
              <Image 
                src="/assets/logo-principal.png" 
                alt="ServiceFlow" 
                width={180}
                height={56}
                className="h-14 w-auto drop-shadow-md mix-blend-multiply dark:mix-blend-screen"
                priority
              />
            </div>
            <div className="h-8 w-px bg-[#E2E8F0] dark:bg-[#334155]"></div>
            <h1 className="text-3xl font-bold text-[#111827] dark:text-[#F8FAFC]">Dashboard</h1>
          </div>
          
          <div className="grid gap-4">
            <div className="p-6 border border-border rounded-lg">
              <h2 className="text-xl font-semibold mb-2">Bienvenido, {session?.user?.name}</h2>
              <p className="text-muted">Plan: {session?.user?.plan}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
