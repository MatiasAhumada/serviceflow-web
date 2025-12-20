export enum USER_STATUS {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
}

export enum PLAN_TYPE {
  VENDOR = 'vendor',
  TECHNICIAN = 'technician',
  COMPANY = 'company',
}

export enum CASH_REGISTER_STATUS {
  OPEN = 'open',
  CLOSED = 'closed',
}

export enum SERVICE_STATUS {
  RECEIVED = 'received',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

export enum SUBSCRIPTION_STATUS {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  CANCELLED = 'cancelled',
  EXPIRED = 'expired',
}

export enum SUBSCRIBER_TYPE {
  USER = 'user',
  COMPANY = 'company',
}

export enum MOVEMENT_TYPE {
  INCOME = 'income',
  EXPENSE = 'expense',
  ADJUSTMENT = 'adjustment',
}
