import { Plan } from "@/services/plans.service";

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
  }).format(price);
};

export const formatPlanFeatures = (
  features: Record<string, unknown>,
): string[] => {
  const featuresList: string[] = [];

  if (features.users) {
    const users = features.users as number;
    featuresList.push(
      users === -1
        ? "Usuarios ilimitados"
        : `${users} usuario${users > 1 ? "s" : ""}`,
    );
  }

  if (features.products) {
    const products = features.products as number;
    featuresList.push(
      products === -1 ? "Productos ilimitados" : `Hasta ${products} productos`,
    );
  }

  if (features.sales) {
    featuresList.push("Ventas ilimitadas");
  }

  if (features.serviceOrders) {
    featuresList.push("Órdenes de servicio");
  }

  if (features.reports) {
    const reportType = features.reports as string;
    featuresList.push(
      reportType === "advanced" ? "Reportes avanzados" : "Reportes básicos",
    );
  }

  if (features.support) {
    const supportType = features.support as string;
    const supportMap: Record<string, string> = {
      email: "Soporte por email",
      priority: "Soporte prioritario",
      "24/7": "Soporte 24/7",
    };
    featuresList.push(supportMap[supportType] || "Soporte");
  }

  if (features.cashRegisters) {
    featuresList.push("Múltiples cajas");
  }

  if (features.api) {
    featuresList.push("API personalizada");
  }

  if (features.training) {
    featuresList.push("Capacitación incluida");
  }

  if (features.branches) {
    featuresList.push("Múltiples sucursales");
  }

  return featuresList;
};

export const isPopularPlan = (slug: string): boolean => {
  return slug === "professional" || slug === "profesional";
};

export const formatPlanForDisplay = (plan: Plan) => {
  const features =
    plan.featureList && plan.featureList.length > 0
      ? plan.featureList
      : formatPlanFeatures(plan.features);

  return {
    id: plan.id,
    name: plan.name,
    price: formatPrice(plan.price),
    period: "/mes",
    description: plan.description || "",
    features,
    popular: plan.popular || isPopularPlan(plan.slug),
  };
};
