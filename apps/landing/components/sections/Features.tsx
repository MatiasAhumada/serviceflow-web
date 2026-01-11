"use client";

import { BentoGrid, BentoGridItem } from "@/components/ui/BentoGrid";
import { ShoppingCart, Package, Wrench, Users, BarChart3, CreditCard } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: ShoppingCart,
    title: "Punto de Venta",
    description: "Sistema POS completo con facturación electrónica y múltiples métodos de pago integrados.",
    gradient: "from-blue-500 to-cyan-500",
    className: "md:col-span-2",
  },
  {
    icon: Package,
    title: "Control de Inventario",
    description: "Gestiona tu stock en tiempo real con alertas automáticas de reposición y control total.",
    gradient: "from-purple-500 to-pink-500",
    className: "md:col-span-1",
  },
  {
    icon: Wrench,
    title: "Órdenes de Servicio",
    description: "Administra reparaciones y servicios técnicos con seguimiento completo del proceso.",
    gradient: "from-orange-500 to-red-500",
    className: "md:col-span-1",
  },
  {
    icon: Users,
    title: "Gestión de Clientes",
    description: "Base de datos completa con historial de compras, datos fiscales y preferencias.",
    gradient: "from-green-500 to-emerald-500",
    className: "md:col-span-2",
  },
  {
    icon: BarChart3,
    title: "Reportes y Análisis",
    description: "Dashboards intuitivos con métricas en tiempo real para decisiones inteligentes.",
    gradient: "from-indigo-500 to-blue-500",
    className: "md:col-span-2",
  },
  {
    icon: CreditCard,
    title: "Cajas Registradoras",
    description: "Control de múltiples cajas con apertura, cierre y movimientos de efectivo.",
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
            Todo lo que necesitas para{" "}
            <span className="bg-gradient-to-r from-[#10B981] to-[#2563EB] bg-clip-text text-transparent">
              hacer crecer tu negocio
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Herramientas profesionales diseñadas para optimizar cada aspecto de tu operación
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
                  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100 relative overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-20`} />
                  </div>
                }
                icon={
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
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
