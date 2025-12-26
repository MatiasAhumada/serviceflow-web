export type PlanType = 'vendedor' | 'taller' | 'comercio';

export interface PlanFeatures {
  products: boolean;
  sales: boolean;
  workOrders: boolean;
  repairs: boolean;
  stock: boolean;
  employees: boolean;
  reports: boolean;
  multiUser: boolean;
}

const planFeatures: Record<PlanType, PlanFeatures> = {
  vendedor: {
    products: true,
    sales: true,
    workOrders: false,
    repairs: false,
    stock: true,
    employees: true,
    reports: false,
    multiUser: false,
  },
  taller: {
    products: false,
    sales: false,
    workOrders: true,
    repairs: true,
    stock: false,
    employees: true,
    reports: false,
    multiUser: false,
  },
  comercio: {
    products: true,
    sales: true,
    workOrders: true,
    repairs: true,
    stock: true,
    employees: true,
    reports: true,
    multiUser: true,
  },
};

export function getPlanFeatures(planType: PlanType): PlanFeatures {
  return planFeatures[planType] || planFeatures.vendedor;
}

export function hasPlanFeature(planType: PlanType, feature: keyof PlanFeatures): boolean {
  return getPlanFeatures(planType)[feature];
}
