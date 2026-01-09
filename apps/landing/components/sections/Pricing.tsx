"use client";

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Check } from "lucide-react";

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
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Planes que se adaptan a{" "}
            <span className="gradient-text">tu negocio</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Comienza gratis y escala cuando lo necesites
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              hover
              className={plan.popular ? "border-primary border-2 relative" : ""}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="gradient-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                    Más popular
                  </span>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-success" />
                      </div>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.popular ? "gradient" : "outline"}
                  className="w-full"
                  size="lg"
                >
                  Comenzar ahora
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
