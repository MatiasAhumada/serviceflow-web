"use client";

import { BentoGrid, BentoGridItem } from "@/components/ui/BentoGrid";
import {
  ShoppingCart,
  Package,
  Wrench,
  Users,
  BarChart3,
  CreditCard,
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: ShoppingCart,
    title: "Sistema de Punto de Venta",
    description:
      "Procesa transacciones rápidamente con nuestro POS intuitivo. Incluye facturación electrónica AFIP, múltiples métodos de pago y gestión de descuentos en tiempo real.",
    gradient: "from-blue-500 to-cyan-500",
    className: "md:col-span-2",
  },
  {
    icon: Package,
    title: "Inventario Inteligente",
    description:
      "Controla tu stock con precisión. Alertas automáticas de bajo inventario, seguimiento de lotes, fechas de vencimiento y reportes de rotación de productos.",
    gradient: "from-purple-500 to-pink-500",
    className: "md:col-span-1",
  },
  {
    icon: Wrench,
    title: "Gestión de Servicios Técnicos",
    description:
      "Administra reparaciones de principio a fin. Seguimiento de estado, asignación de técnicos, historial de trabajos y notificaciones automáticas a clientes.",
    gradient: "from-orange-500 to-red-500",
    className: "md:col-span-1",
  },
  {
    icon: Users,
    title: "CRM Completo",
    description:
      "Construye relaciones duraderas con tus clientes. Base de datos centralizada, historial de compras, datos fiscales y segmentación para campañas personalizadas.",
    gradient: "from-green-500 to-emerald-500",
    className: "md:col-span-2",
  },
  {
    icon: BarChart3,
    title: "Analytics y Reportes",
    description:
      "Toma decisiones basadas en datos reales. Dashboards personalizables, métricas de ventas, análisis de rentabilidad y proyecciones de crecimiento.",
    gradient: "from-indigo-500 to-blue-500",
    className: "md:col-span-2",
  },
  {
    icon: CreditCard,
    title: "Control de Cajas",
    description:
      "Gestiona el flujo de efectivo con transparencia. Apertura y cierre de caja, conciliación automática, registro de movimientos y auditoría completa.",
    gradient: "from-yellow-500 to-orange-500",
    className: "md:col-span-1",
  },
];

export function Features() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Funcionalidades que{" "}
            <span className="bg-gradient-to-r from-[#10B981] to-[#2563EB] bg-clip-text text-transparent">
              impulsan tu negocio
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Herramientas profesionales diseñadas para optimizar cada aspecto de
            tu operación diaria
          </p>
        </motion.div>

        <BentoGrid>
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <BentoGridItem
                key={index}
                title={feature.title}
                description={feature.description}
                className={feature.className}
                header={
                  <div className="flex flex-1 w-full h-full max-h-[4rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100 relative overflow-hidden">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-20`}
                    />
                  </div>
                }
                icon={
                  <div
                    className={`w-10 h-10 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                }
              />
            );
          })}
        </BentoGrid>
      </div>
    </section>
  );
}
