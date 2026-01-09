"use client";

import { Button } from "@/components/ui/Button";
import { ArrowRight, Zap, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#10B981]/10 via-background to-[#2563EB]/10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.1),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(37,99,235,0.1),transparent_50%)]" />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#10B981]/10 to-[#2563EB]/10 border border-[#10B981]/20 backdrop-blur-sm animate-fade-in">
            <Sparkles className="w-4 h-4 text-[#10B981]" />
            <span className="text-sm font-medium bg-gradient-to-r from-[#10B981] to-[#2563EB] bg-clip-text text-transparent">
              La solución completa para tu negocio
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight animate-slide-up">
            Transforma tu negocio con{" "}
            <span className="bg-gradient-to-r from-[#10B981] to-[#2563EB] bg-clip-text text-transparent">
              ServiceFlow
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto animate-slide-up leading-relaxed">
            Gestiona ventas, inventario, órdenes de servicio y más desde una plataforma intuitiva y poderosa.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-scale-in pt-4">
            <Button variant="gradient" size="lg" className="group shadow-2xl shadow-[#10B981]/20">
              Comenzar gratis
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" className="border-2">
              Ver demo en vivo
            </Button>
          </div>

          <div className="pt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#10B981]" />
              <span>Sin tarjeta de crédito</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#10B981]" />
              <span>Configuración instantánea</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#10B981]" />
              <span>Soporte 24/7</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
