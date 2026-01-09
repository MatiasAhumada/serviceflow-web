"use client";

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Check, Zap } from "lucide-react";

const plans = [
  {
    name: "Básico",
    price: "$9.990",
    period: "/mes",
    description: "Perfecto para emprendedores",
    features: [
      "1 usuario",
      "Hasta 100 productos",
      "Ventas ilimitadas",
      "Reportes básicos",
      "Soporte por email",
    ],
    popular: false,
  },
  {
    name: "Profesional",
    price: "$19.990",
    period: "/mes",
    description: "Ideal para negocios en crecimiento",
    features: [
      "5 usuarios",
      "Productos ilimitados",
      "Ventas ilimitadas",
      "Órdenes de servicio",
      "Reportes avanzados",
      "Soporte prioritario",
      "Múltiples cajas",
    ],
    popular: true,
  },
  {
    name: "Empresarial",
    price: "$39.990",
    period: "/mes",
    description: "Para empresas establecidas",
    features: [
      "Usuarios ilimitados",
      "Todo lo del plan Profesional",
      "API personalizada",
      "Soporte 24/7",
      "Capacitación incluida",
      "Múltiples sucursales",
    ],
    popular: false,
  },
];

export function Pricing() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[#10B981]/5 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Planes que se adaptan a{" "}
            <span className="bg-gradient-to-r from-[#10B981] to-[#2563EB] bg-clip-text text-transparent">
              tu negocio
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Comienza gratis y escala cuando lo necesites. Sin sorpresas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              hover
              className={plan.popular ? "border-2 border-[#10B981] relative shadow-2xl shadow-[#10B981]/20 scale-105" : "border-2"}
            >
              {plan.popular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                  <div className="bg-gradient-to-r from-[#10B981] to-[#2563EB] text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg">
                    <Zap className="w-4 h-4" />
                    Más popular
                  </div>
                </div>
              )}
              <CardHeader className="pt-8">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription className="text-base">{plan.description}</CardDescription>
                <div className="mt-6">
                  <span className="text-5xl font-bold bg-gradient-to-r from-[#10B981] to-[#2563EB] bg-clip-text text-transparent">{plan.price}</span>
                  <span className="text-muted-foreground text-lg">{plan.period}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-4">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#10B981]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-[#10B981]" />
                      </div>
                      <span className="text-sm leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.popular ? "gradient" : "outline"}
                  className="w-full"
                  size="lg"
                >
                  {plan.popular ? "Comenzar ahora" : "Seleccionar plan"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-4">Todos los planes incluyen 14 días de prueba gratis</p>
          <p className="text-sm text-muted-foreground">Sin tarjeta de crédito requerida • Cancela cuando quieras</p>
        </div>
      </div>
    </section>
  );
}
