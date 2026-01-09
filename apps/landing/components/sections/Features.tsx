"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { ShoppingCart, Package, Wrench, Users, BarChart3, CreditCard } from "lucide-react";

const features = [
  {
    icon: ShoppingCart,
    title: "Punto de Venta",
    description: "Sistema POS completo con gestión de ventas, facturación y múltiples métodos de pago.",
  },
  {
    icon: Package,
    title: "Control de Inventario",
    description: "Gestiona tu stock en tiempo real con alertas de reposición y control de productos.",
  },
  {
    icon: Wrench,
    title: "Órdenes de Servicio",
    description: "Administra reparaciones y servicios técnicos con seguimiento completo.",
  },
  {
    icon: Users,
    title: "Gestión de Clientes",
    description: "Base de datos completa con historial de compras y datos fiscales.",
  },
  {
    icon: BarChart3,
    title: "Reportes y Análisis",
    description: "Dashboards intuitivos con métricas clave para tomar mejores decisiones.",
  },
  {
    icon: CreditCard,
    title: "Cajas Registradoras",
    description: "Control de múltiples cajas con apertura, cierre y movimientos de efectivo.",
  },
];

export function Features() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Todo lo que necesitas en{" "}
            <span className="gradient-text">un solo lugar</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Herramientas profesionales diseñadas para hacer crecer tu negocio
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} hover className="group">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
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
