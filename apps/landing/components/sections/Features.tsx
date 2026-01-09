"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { ShoppingCart, Package, Wrench, Users, BarChart3, CreditCard } from "lucide-react";

const features = [
  {
    icon: ShoppingCart,
    title: "Punto de Venta",
    description: "Sistema POS completo con facturación electrónica y múltiples métodos de pago integrados.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Package,
    title: "Control de Inventario",
    description: "Gestiona tu stock en tiempo real con alertas automáticas de reposición y control total.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Wrench,
    title: "Órdenes de Servicio",
    description: "Administra reparaciones y servicios técnicos con seguimiento completo del proceso.",
    gradient: "from-orange-500 to-red-500",
  },
  {
    icon: Users,
    title: "Gestión de Clientes",
    description: "Base de datos completa con historial de compras, datos fiscales y preferencias.",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: BarChart3,
    title: "Reportes y Análisis",
    description: "Dashboards intuitivos con métricas en tiempo real para decisiones inteligentes.",
    gradient: "from-indigo-500 to-blue-500",
  },
  {
    icon: CreditCard,
    title: "Cajas Registradoras",
    description: "Control de múltiples cajas con apertura, cierre y movimientos de efectivo.",
    gradient: "from-yellow-500 to-orange-500",
  },
];

export function Features() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Todo lo que necesitas para{" "}
            <span className="bg-gradient-to-r from-[#10B981] to-[#2563EB] bg-clip-text text-transparent">
              hacer crecer tu negocio
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Herramientas profesionales diseñadas para optimizar cada aspecto de tu operación
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} hover className="group border-2 hover:border-[#10B981]/50 transition-all duration-300">
                <CardHeader>
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
