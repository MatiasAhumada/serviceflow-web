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
