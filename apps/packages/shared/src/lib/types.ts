import type {
  PlanType,
  UserStatus,
  SubscriptionStatus,
  PaymentStatus,
  SaleStatus,
  ServiceStatus,
  CashRegisterStatus,
  PaymentMethod,
  SubscriberType,
} from "./constants";

// Base Entity
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// System Admin
export interface SystemAdmin extends BaseEntity {
  name: string;
  email: string;
}

// Plan
export interface Plan extends BaseEntity {
  name: string;
  slug: string;
  price: number;
  description?: string;
  baseUserSeats: number;
  features: Record<string, any>;
}

// Company
export interface Company extends BaseEntity {
  name: string;
  cuit?: string;
  address?: string;
  email?: string;
  phone?: string;
  ownerUserId?: string;
  subscriptionId?: string;
}

// User
export interface User extends BaseEntity {
  companyId?: string;
  name: string;
  email: string;
  passwordHash: string;
  planType: PlanType;
  status: UserStatus;
  roleId?: string;
  subscriptionId?: string;
  lastLogin?: Date;
}

// Role
export interface Role extends BaseEntity {
  companyId: string;
  name: string;
  description?: string;
}

// Permission
export interface Permission extends BaseEntity {
  code: string;
  description?: string;
}

// Subscription
export interface Subscription extends BaseEntity {
  subscriberType: SubscriberType;
  companyId?: string;
  userId?: string;
  planId: string;
  startDate: Date;
  endDate: Date;
  status: SubscriptionStatus;
  autoRenew: boolean;
  createdBy: string;
}

// Subscription Seat
export interface SubscriptionSeat extends BaseEntity {
  subscriptionId: string;
  roleName: string;
  quantity: number;
  pricePerSeat: number;
}

// Payment
export interface Payment extends BaseEntity {
  subscriptionId: string;
  amount: number;
  currency: string;
  method: PaymentMethod;
  status: PaymentStatus;
  paidAt?: Date;
}

// Customer
export interface Customer extends BaseEntity {
  companyId?: string;
  userId?: string;
  name: string;
  phone?: string;
  email?: string;
  address?: string;
  notes?: string;
}

// Supplier
export interface Supplier extends BaseEntity {
  companyId?: string;
  userId?: string;
  name: string;
  contactInfo?: string;
  phone?: string;
  email?: string;
}

// Product
export interface Product extends BaseEntity {
  companyId?: string;
  userId?: string;
  name: string;
  sku?: string;
  category?: string;
  price: number;
  cost?: number;
  stockQuantity: number;
  reorderLevel?: number;
}

// Cash Register
export interface CashRegister extends BaseEntity {
  companyId?: string;
  userId?: string;
  name: string;
  currentBalance: number;
  status: CashRegisterStatus;
  openedBy?: string;
  closedBy?: string;
  openTime?: Date;
  closeTime?: Date;
}

// Sale
export interface Sale extends BaseEntity {
  companyId?: string;
  userId?: string;
  customerId: string;
  sellerId: string;
  cashRegisterId?: string;
  saleNumber: string;
  date: Date;
  total: number;
  paymentMethod: PaymentMethod;
  status: SaleStatus;
}

// Sale Item
export interface SaleItem extends BaseEntity {
  saleId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

// Service Order
export interface ServiceOrder extends BaseEntity {
  companyId?: string;
  userId?: string;
  customerId: string;
  technicianId: string;
  serviceNumber: string;
  status: ServiceStatus;
  entryDate: Date;
  expectedDelivery?: Date;
  deliveryDate?: Date;
  totalCost?: number;
  paymentStatus?: PaymentStatus;
  notes?: string;
}

// Service Item
export interface ServiceItem extends BaseEntity {
  serviceOrderId: string;
  description: string;
  laborCost?: number;
  partCost?: number;
  total: number;
}

// Device
export interface Device extends BaseEntity {
  customerId: string;
  brand?: string;
  model?: string;
  serialNumber?: string;
  type?: string;
  notes?: string;
}

// Warranty
export interface Warranty extends BaseEntity {
  serviceOrderId: string;
  warrantyPeriodDays: number;
  startDate: Date;
  endDate: Date;
  notes?: string;
}

// Join Tables
export interface RolePermission {
  roleId: string;
  permissionId: string;
}

export interface SupplierProduct {
  supplierId: string;
  productId: string;
  supplierSku?: string;
  leadTime?: number;
  price?: number;
}