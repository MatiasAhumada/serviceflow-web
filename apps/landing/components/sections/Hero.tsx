"use client";

import { Button } from "@/components/ui/Button";
import { SpotlightBackground } from "@/components/ui/SpotlightBackground";
import { GridBackground } from "@/components/ui/GridBackground";
import { ArrowRight, Zap, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { APP_ROUTES } from "@/constants/routes";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <GridBackground />
      <SpotlightBackground />

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#10B981]/10 to-[#2563EB]/10 border border-[#10B981]/20 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 text-[#10B981]" />
            <span className="text-sm font-medium bg-gradient-to-r from-[#10B981] to-[#2563EB] bg-clip-text text-transparent">
              La solución completa para tu negocio
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold leading-tight"
          >
            Transforma tu negocio con{" "}
            <span className="bg-gradient-to-r from-[#10B981] to-[#2563EB] bg-clip-text text-transparent">
              ServiceFlow
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            Gestiona ventas, inventario, órdenes de servicio y más desde una
            plataforma intuitiva y poderosa.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
          >
            <a href={APP_ROUTES.REGISTER_TRIAL}>
              <Button
                variant="gradient"
                size="lg"
                className="group shadow-2xl shadow-[#10B981]/20"
              >
                Comenzar gratis*
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="pt-8 space-y-4"
          >
            <p className="text-xs text-muted-foreground max-w-2xl mx-auto">
              * Prueba gratuita de 5 días en el plan que elijas. Sin tarjeta de crédito requerida.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                <span>Acceso completo durante el trial</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                <span>Múltiples métodos de pago</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                <span>Soporte técnico incluido</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
