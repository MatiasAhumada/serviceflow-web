export const SERVICE_STATUS = {
  PENDING: "pending",
  IN_PROGRESS: "in_progress", 
  COMPLETED: "completed",
  CANCELLED: "cancelled",
  DELIVERED: "delivered",
} as const;

export const SERVICE_STATUS_LABELS = {
  [SERVICE_STATUS.PENDING]: "Pendiente",
  [SERVICE_STATUS.IN_PROGRESS]: "En progreso",
  [SERVICE_STATUS.COMPLETED]: "Completado",
  [SERVICE_STATUS.CANCELLED]: "Cancelado",
  [SERVICE_STATUS.DELIVERED]: "Entregado",
} as const;

export const PAYMENT_STATUS = {
  PENDING: "pending",
  PAID: "paid",
  FAILED: "failed",
  REFUNDED: "refunded",
} as const;

export const PAYMENT_STATUS_LABELS = {
  [PAYMENT_STATUS.PENDING]: "Pendiente",
  [PAYMENT_STATUS.PAID]: "Pagado",
  [PAYMENT_STATUS.FAILED]: "Fallido",
  [PAYMENT_STATUS.REFUNDED]: "Reembolsado",
} as const;

export const SUBSCRIPTION_PLANS = {
  BASIC: "basic",
  PREMIUM: "premium",
  ENTERPRISE: "enterprise",
} as const;

export const PLAN_FEATURES = {
  [SUBSCRIPTION_PLANS.BASIC]: {
    name: "Básico",
    price: 29,
    maxOrders: 50,
    maxProducts: 100,
    hasInventory: false,
    hasReports: false,
  },
  [SUBSCRIPTION_PLANS.PREMIUM]: {
    name: "Premium", 
    price: 59,
    maxOrders: 200,
    maxProducts: 500,
    hasInventory: true,
    hasReports: true,
  },
  [SUBSCRIPTION_PLANS.ENTERPRISE]: {
    name: "Empresarial",
    price: 99,
    maxOrders: -1,
    maxProducts: -1,
    hasInventory: true,
    hasReports: true,
  },
} as const;

export type ServiceStatus = typeof SERVICE_STATUS[keyof typeof SERVICE_STATUS];
export type PaymentStatus = typeof PAYMENT_STATUS[keyof typeof PAYMENT_STATUS];
export type SubscriptionPlan = typeof SUBSCRIPTION_PLANS[keyof typeof SUBSCRIPTION_PLANS];