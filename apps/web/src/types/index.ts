// Global type definitions
export * from "./next-auth.d";

export interface Customer {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  notes?: string;
  companyId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCustomerDto {
  name: string;
  phone?: string;
  email?: string;
  notes?: string;
}

export interface UpdateCustomerDto {
  name?: string;
  phone?: string;
  email?: string;
  notes?: string;
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
  seller?: any;
  items: SaleItem[];
  cardDetail?: CardDetail;
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
