// Global type definitions
export * from "./next-auth.d";

export interface Customer {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  notes?: string;
  taxCondition?: string;
  documentType?: string;
  documentNumber?: string;
  companyId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCustomerDto {
  name: string;
  phone?: string;
  email?: string;
  notes?: string;
  taxCondition?: string;
  documentType?: string;
  documentNumber?: string;
}

export interface UpdateCustomerDto {
  name?: string;
  phone?: string;
  email?: string;
  notes?: string;
  taxCondition?: string;
  documentType?: string;
  documentNumber?: string;
}

export interface Product {
  id: string;
  name: string;
  sku?: string;
  category?: string;
  price: number;
  cost?: number;
  stockQuantity: number;
  reorderLevel?: number;
  isSparePart: boolean;
  companyId: string;
  suppliers?: Supplier[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductDto {
  name: string;
  sku?: string;
  category?: string;
  price: number;
  cost?: number;
  stockQuantity?: number;
  reorderLevel?: number;
  isSparePart?: boolean;
  supplierId?: string;
}

export interface UpdateProductDto {
  name?: string;
  sku?: string;
  category?: string;
  price?: number;
  cost?: number;
  stockQuantity?: number;
  reorderLevel?: number;
  isSparePart?: boolean;
  supplierId?: string;
}

export interface Supplier {
  id: string;
  name: string;
  contactInfo?: string;
  phone?: string;
  email?: string;
  companyId: string;
  products?: Product[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateSupplierDto {
  name: string;
  contactInfo?: string;
  phone?: string;
  email?: string;
}

export interface UpdateSupplierDto {
  name?: string;
  contactInfo?: string;
  phone?: string;
  email?: string;
}

export interface Sale {
  id: string;
  companyId: string;
  customerId: string;
  sellerId: string;
  cashRegisterId?: string;
  saleNumber: string;
  date: string;
  total: number;
  discount: number;
  paymentMethod: string;
  status: string;
  customer?: Customer;
  seller?: Record<string, unknown>;
  items: SaleItem[];
  cardDetail?: CardDetail;
  receipt?: { id: string };
  createdAt: string;
  updatedAt: string;
}

export interface SaleItem {
  id: string;
  saleId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  product?: Product;
}

export interface CardDetail {
  cardBrand: string;
  cardType: string;
  lastFourDigits: string;
  installments: number;
}

export interface CreateSaleDto {
  customerId: string;
  cashRegisterId?: string;
  paymentMethod: string;
  items: CreateSaleItemDto[];
  cardDetail?: CardDetail;
  discount?: number;
  date?: string;
}

export interface CreateSaleItemDto {
  productId: string;
  quantity: number;
  unitPrice: number;
}

export interface UpdateSaleDto {
  items?: CreateSaleItemDto[];
  discount?: number;
}

export interface CashRegister {
  id: string;
  companyId: string;
  name: string;
  currentBalance: number;
  status: string;
  userId?: string;
  user?: { id: string; name: string };
  openedBy?: string;
  closedBy?: string;
  openTime?: string;
  closeTime?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ServiceOrder {
  id: string;
  serviceNumber: string;
  customerId: string;
  technicianId?: string;
  customer?: { name: string };
  technician?: { name: string };
  entryDate: string;
  expectedDelivery?: string;
  status: string;
  companyId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ServiceOrderStats {
  received: number;
  inProgress: number;
  completed: number;
  delivered: number;
  total: number;
}

export interface Receipt {
  id: string;
  companyId: string;
  saleId: string;
  customerId: string;
  sellerId: string;
  technicianId?: string;
  receiptNumber: string;
  date: string;
  subtotal: number;
  discount: number;
  total: number;
  paymentMethod: string;
  pdfPath?: string;
  company?: Record<string, unknown>;
  sale?: Sale;
  customer?: Customer;
  seller?: Record<string, unknown>;
  technician?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface CreateReceiptDto {
  saleId: string;
  technicianId?: string;
}

export interface PaymentOrder {
  id: string;
  companyId: string;
  saleId: string;
  cashierId?: string;
  cashRegisterId?: string;
  orderNumber: string;
  amount: number;
  status: string;
  completedAt?: string;
  sale?: Sale;
  cashier?: Record<string, unknown>;
  cashRegister?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface CompletePaymentOrderDto {
  cashRegisterId?: string;
}
