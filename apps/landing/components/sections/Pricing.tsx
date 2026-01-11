"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Check, Zap } from "lucide-react";
import { plansService } from "@/services/plans.service";
import { formatPlanForDisplay } from "@/utils/formatters";
import { motion } from "framer-motion";

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
            Planes que se adaptan a <span className="bg-gradient-to-r from-[#10B981] to-[#2563EB] bg-clip-text text-transparent">tu negocio</span>
          </h2>
          <p className="text-xl text-muted-foreground">Comienza gratis y escala cuando lo necesites. Sin sorpresas.</p>
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
                <CardDescription className="text-base">{plan.description}</CardDescription>
                <div className="mt-6">
                  <span className="text-5xl font-bold bg-gradient-to-r from-[#10B981] to-[#2563EB] bg-clip-text text-transparent">{plan.price}</span>
                  <span className="text-muted-foreground text-lg">{plan.period}</span>
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
                <Button variant={plan.popular ? "gradient" : "outline"} className="w-full" size="lg">
                  {plan.popular ? "Comenzar ahora" : "Seleccionar plan"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-4">Todos los planes incluyen 5 días de prueba gratis</p>
          <p className="text-sm text-muted-foreground">Sin tarjeta de crédito requerida • Cancela cuando quieras</p>
        </div>
      </div>
    </section>
  );
}
