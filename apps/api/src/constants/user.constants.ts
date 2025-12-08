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

export enum PAYMENT_STATUS {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
  REFUNDED = 'refunded',
}

export enum PAYMENT_METHOD {
  CREDIT_CARD = 'credit_card',
  DEBIT_CARD = 'debit_card',
  BANK_TRANSFER = 'bank_transfer',
  CASH = 'cash',
}

export enum CASH_REGISTER_STATUS {
  OPEN = 'open',
  CLOSED = 'closed',
}

export enum SALE_STATUS {
  PENDING = 'pending',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
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
