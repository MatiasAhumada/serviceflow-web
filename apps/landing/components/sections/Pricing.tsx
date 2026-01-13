"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Check, Zap } from "lucide-react";
import { plansService } from "@/services/plans.service";
import { formatPlanForDisplay } from "@/utils/formatters";
import { motion } from "framer-motion";
import { APP_ROUTES } from "@/constants/routes";

interface DisplayPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular: boolean;
}

export function Pricing() {
  const [plans, setPlans] = useState<DisplayPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const data = await plansService.getAll();
        const formattedPlans = data.map(formatPlanForDisplay);
        setPlans(formattedPlans);
      } catch (error) {
        console.error("Error al cargar planes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  if (loading) {
    return (
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#10B981] mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[#10B981]/5 to-background" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Planes que se adaptan a{" "}
            <span className="bg-gradient-to-r from-[#10B981] to-[#2563EB] bg-clip-text text-transparent">
              tu negocio
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Comienza gratis y escala cuando lo necesites. Sin sorpresas.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              hover
              className={`h-full flex flex-col ${plan.popular ? "border-2 border-[#10B981] relative shadow-2xl shadow-[#10B981]/20 md:-translate-y-4" : "border-2"}`}
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
                <CardDescription className="text-base">
                  {plan.description}
                </CardDescription>
                <div className="mt-6">
                  <span className="text-5xl font-bold bg-gradient-to-r from-[#10B981] to-[#2563EB] bg-clip-text text-transparent">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground text-lg">
                    {plan.period}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 flex flex-col flex-1">
                <ul className="space-y-4 flex-1">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#10B981]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-[#10B981]" />
                      </div>
                      <span className="text-sm leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
                <a href={APP_ROUTES.REGISTER_TRIAL}>
                  <Button
                    variant={plan.popular ? "gradient" : "outline"}
                    className="w-full"
                    size="lg"
                  >
                    {plan.popular ? "Comenzar ahora" : "Seleccionar plan"}
                  </Button>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16 space-y-3">
          <p className="text-base font-medium text-foreground">
            Comienza gratis y prueba el plan que se adapte a vos durante 5 días
          </p>
          <p className="text-sm text-muted-foreground">
            Sin tarjeta de crédito requerida • Cancela en cualquier momento
          </p>
        </div>

        <div className="mt-20 max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-[#10B981]/10 to-[#2563EB]/10 rounded-2xl p-8 border border-[#10B981]/20">
            <h3 className="text-2xl font-bold text-center mb-6">
              Métodos de Pago
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#10B981]/20 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-[#10B981]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M2 5h20v4H2V5zm0 6h20v8H2v-8zm4 5h4v2H6v-2z" />
                  </svg>
                </div>
                <h4 className="font-semibold mb-2">Tarjeta Crédito/Débito</h4>
                <p className="text-sm text-muted-foreground">
                  Pago seguro con Mercado Pago
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#2563EB]/20 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-[#2563EB]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 18c-3.86-.93-7-5.43-7-10V8.3l7-3.11 7 3.11V10c0 4.57-3.14 9.07-7 10z" />
                  </svg>
                </div>
                <h4 className="font-semibold mb-2">Transferencia Bancaria</h4>
                <p className="text-sm text-muted-foreground">
                  Pago directo a cuenta
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#10B981]/20 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-[#10B981]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z" />
                  </svg>
                </div>
                <h4 className="font-semibold mb-2">Efectivo</h4>
                <p className="text-sm text-muted-foreground">Solo en Tucumán</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
