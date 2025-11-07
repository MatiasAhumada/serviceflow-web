// Plan Types
export const PLAN_TYPE = {
  VENDOR: "vendor",
  TECHNICIAN: "technician",
  COMPANY: "company",
} as const;

// User Status
export const USER_STATUS = {
  ACTIVE: "active",
  BLOCKED: "blocked",
  PENDING: "pending",
} as const;

// Subscription Status
export const SUBSCRIPTION_STATUS = {
  ACTIVE: "active",
  EXPIRED: "expired",
  TRIAL: "trial",
  CANCELLED: "cancelled",
} as const;

// Payment Status
export const PAYMENT_STATUS = {
  PAID: "paid",
  PENDING: "pending",
  FAILED: "failed",
} as const;

// Sale Status
export const SALE_STATUS = {
  COMPLETED: "completed",
  PENDING: "pending",
  CANCELED: "canceled",
} as const;

// Service Status
export const SERVICE_STATUS = {
  RECEIVED: "received",
  IN_PROGRESS: "in_progress",
  COMPLETED: "completed",
  DELIVERED: "delivered",
} as const;

// Cash Register Status
export const CASH_REGISTER_STATUS = {
  OPEN: "open",
  CLOSED: "closed",
} as const;

// Payment Methods
export const PAYMENT_METHOD = {
  CARD: "card",
  TRANSFER: "transfer",
  CASH: "cash",
} as const;

// Subscriber Types
export const SUBSCRIBER_TYPE = {
  COMPANY: "company",
  USER: "user",
} as const;

// Labels
export const PLAN_TYPE_LABELS = {
  [PLAN_TYPE.VENDOR]: "Vendedor",
  [PLAN_TYPE.TECHNICIAN]: "Técnico",
  [PLAN_TYPE.COMPANY]: "Empresa",
} as const;

export const USER_STATUS_LABELS = {
  [USER_STATUS.ACTIVE]: "Activo",
  [USER_STATUS.BLOCKED]: "Bloqueado",
  [USER_STATUS.PENDING]: "Pendiente",
} as const;

export const SUBSCRIPTION_STATUS_LABELS = {
  [SUBSCRIPTION_STATUS.ACTIVE]: "Activa",
  [SUBSCRIPTION_STATUS.EXPIRED]: "Expirada",
  [SUBSCRIPTION_STATUS.TRIAL]: "Prueba",
  [SUBSCRIPTION_STATUS.CANCELLED]: "Cancelada",
} as const;

export const PAYMENT_STATUS_LABELS = {
  [PAYMENT_STATUS.PAID]: "Pagado",
  [PAYMENT_STATUS.PENDING]: "Pendiente",
  [PAYMENT_STATUS.FAILED]: "Fallido",
} as const;

export const SALE_STATUS_LABELS = {
  [SALE_STATUS.COMPLETED]: "Completada",
  [SALE_STATUS.PENDING]: "Pendiente",
  [SALE_STATUS.CANCELED]: "Cancelada",
} as const;

export const SERVICE_STATUS_LABELS = {
  [SERVICE_STATUS.RECEIVED]: "Recibido",
  [SERVICE_STATUS.IN_PROGRESS]: "En progreso",
  [SERVICE_STATUS.COMPLETED]: "Completado",
  [SERVICE_STATUS.DELIVERED]: "Entregado",
} as const;

// Types
export type PlanType = typeof PLAN_TYPE[keyof typeof PLAN_TYPE];
export type UserStatus = typeof USER_STATUS[keyof typeof USER_STATUS];
export type SubscriptionStatus = typeof SUBSCRIPTION_STATUS[keyof typeof SUBSCRIPTION_STATUS];
export type PaymentStatus = typeof PAYMENT_STATUS[keyof typeof PAYMENT_STATUS];
export type SaleStatus = typeof SALE_STATUS[keyof typeof SALE_STATUS];
export type ServiceStatus = typeof SERVICE_STATUS[keyof typeof SERVICE_STATUS];
export type CashRegisterStatus = typeof CASH_REGISTER_STATUS[keyof typeof CASH_REGISTER_STATUS];
export type PaymentMethod = typeof PAYMENT_METHOD[keyof typeof PAYMENT_METHOD];
export type SubscriberType = typeof SUBSCRIBER_TYPE[keyof typeof SUBSCRIBER_TYPE];