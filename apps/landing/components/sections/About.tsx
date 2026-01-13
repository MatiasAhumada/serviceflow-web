"use client";

import { motion } from "framer-motion";
import { Shield, Zap, Users, TrendingUp } from "lucide-react";

const benefits = [
  {
    icon: Shield,
    title: "Seguridad y Confiabilidad",
    description:
      "Protege la información de tu negocio con encriptación de datos, backups automáticos diarios y cumplimiento de normativas argentinas. Tus datos están seguros en servidores certificados con disponibilidad del 99.9%.",
  },
  {
    icon: Zap,
    title: "Velocidad y Eficiencia",
    description:
      "Reduce el tiempo de atención al cliente hasta un 60% con nuestro sistema de punto de venta optimizado. Procesa transacciones en segundos, genera facturas electrónicas AFIP instantáneamente y mantén tu inventario actualizado en tiempo real.",
  },
  {
    icon: Users,
    title: "Fácil de Usar",
    description:
      "Interfaz intuitiva diseñada para que cualquier miembro de tu equipo pueda operarla sin capacitación extensa. Accede desde cualquier dispositivo con conexión a internet: computadora, tablet o smartphone.",
  },
  {
    icon: TrendingUp,
    title: "Crece con tu Negocio",
    description:
      "Sistema escalable que se adapta desde pequeños emprendimientos hasta empresas con múltiples sucursales. Agrega usuarios, productos y funcionalidades según tus necesidades sin cambiar de plataforma.",
  },
];

export function About() {
  return (
    <section className="py-24 relative overflow-hidden bg-muted/30">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            ¿Por qué elegir{" "}
            <span className="bg-gradient-to-r from-[#10B981] to-[#2563EB] bg-clip-text text-transparent">
              ServiceFlow?
            </span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            ServiceFlow es la solución integral de gestión empresarial diseñada
            específicamente para negocios argentinos. Combinamos tecnología de
            punta con simplicidad de uso para ayudarte a administrar ventas,
            controlar inventario, gestionar órdenes de servicio técnico y
            mantener relaciones sólidas con tus clientes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-background rounded-xl p-8 shadow-lg border border-border hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#10B981] to-[#2563EB] flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 max-w-4xl mx-auto bg-background rounded-xl p-8 shadow-lg border border-border"
        >
          <h3 className="text-2xl font-bold mb-4 text-center">
            Funcionalidades Principales
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-muted-foreground">
            <div>
              <h4 className="font-semibold text-foreground mb-2">
                Gestión de Ventas
              </h4>
              <p className="text-sm leading-relaxed">
                Sistema completo de punto de venta con facturación electrónica
                AFIP integrada. Procesa ventas con múltiples métodos de pago,
                aplica descuentos y promociones, genera comprobantes fiscales
                válidos y mantén un registro detallado de todas tus
                transacciones comerciales.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">
                Control de Inventario
              </h4>
              <p className="text-sm leading-relaxed">
                Administra tu stock de manera eficiente con alertas automáticas
                de reposición, seguimiento de lotes y fechas de vencimiento,
                control de múltiples depósitos, reportes de rotación de
                productos y análisis de rentabilidad por artículo.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">
                Órdenes de Servicio Técnico
              </h4>
              <p className="text-sm leading-relaxed">
                Gestiona reparaciones y servicios técnicos desde el ingreso
                hasta la entrega. Asigna técnicos, registra diagnósticos,
                controla repuestos utilizados, envía notificaciones automáticas
                a clientes y mantén un historial completo de cada trabajo
                realizado.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">
                CRM y Clientes
              </h4>
              <p className="text-sm leading-relaxed">
                Base de datos centralizada de clientes con información fiscal
                completa, historial de compras y servicios, cuentas corrientes,
                segmentación para marketing y herramientas para fidelización y
                retención de clientes.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
