import { PLAN_TYPE, type PlanType } from "./constants";

export interface PlanFeatures {
  // Gestión de productos y ventas
  products: boolean;
  stock: boolean;
  sales: boolean;
  
  // Gestión de reparaciones
  repairs: boolean;
  workOrders: boolean;
  spareParts: boolean;
  
  // Gestión de clientes
  clients: boolean;
  
  // Gestión de personal
  employees: boolean;
  roles: boolean;
  
  // Gestión financiera
  payments: boolean;
  cashRegister: boolean;
  invoicing: boolean;
  
  // Reportes
  salesReports: boolean;
  repairReports: boolean;
  inventoryReports: boolean;
  financialReports: boolean;
}

export const PLAN_FEATURES: Record<PlanType, PlanFeatures> = {
  [PLAN_TYPE.VENDEDOR]: {
    // Ventas y productos
    products: true,
    stock: true,
    sales: true,
    
    // Reparaciones (NO)
    repairs: false,
    workOrders: false,
    spareParts: false,
    
    // Clientes
    clients: true,
    
    // Personal (NO)
    employees: false,
    roles: false,
    
    // Financiero
    payments: true,
    cashRegister: true,
    invoicing: true,
    
    // Reportes
    salesReports: true,
    repairReports: false,
    inventoryReports: true,
    financialReports: true,
  },
  
  [PLAN_TYPE.TALLER]: {
    // Ventas y productos (NO)
    products: false,
    stock: false,
    sales: false,
    
    // Reparaciones
    repairs: true,
    workOrders: true,
    spareParts: true,
    
    // Clientes
    clients: true,
    
    // Personal (NO)
    employees: false,
    roles: false,
    
    // Financiero
    payments: true,
    cashRegister: true,
    invoicing: true,
    
    // Reportes
    salesReports: false,
    repairReports: true,
    inventoryReports: true, // Para repuestos
    financialReports: true,
  },
  
  [PLAN_TYPE.COMERCIO]: {
    // Ventas y productos
    products: true,
    stock: true,
    sales: true,
    
    // Reparaciones
    repairs: true,
    workOrders: true,
    spareParts: true,
    
    // Clientes
    clients: true,
    
    // Personal
    employees: true,
    roles: true,
    
    // Financiero
    payments: true,
    cashRegister: true,
    invoicing: true,
    
    // Reportes
    salesReports: true,
    repairReports: true,
    inventoryReports: true,
    financialReports: true,
  },
};

// Helper para verificar si un plan tiene una feature
export function hasPlanFeature(planType: PlanType, feature: keyof PlanFeatures): boolean {
  return PLAN_FEATURES[planType]?.[feature] ?? false;
}

// Helper para obtener todas las features de un plan
export function getPlanFeatures(planType: PlanType): PlanFeatures {
  return PLAN_FEATURES[planType];
}
