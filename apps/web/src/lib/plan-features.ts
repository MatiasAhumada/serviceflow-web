export type UserRole = 'admin' | 'vendedor' | 'tecnico' | 'cajero';

export interface RoleFeatures {
  products: boolean;
  sales: boolean;
  workOrders: boolean;
  repairs: boolean;
  stock: boolean;
  employees: boolean;
  reports: boolean;
  cashRegister: boolean;
}

const roleFeatures: Record<UserRole, RoleFeatures> = {
  admin: {
    products: true,
    sales: true,
    workOrders: true,
    repairs: true,
    stock: true,
    employees: true,
    reports: true,
    cashRegister: true,
  },
  vendedor: {
    products: true,
    sales: true,
    workOrders: true,
    repairs: false,
    stock: true,
    employees: false,
    reports: false,
    cashRegister: false,
  },
  tecnico: {
    products: false,
    sales: false,
    workOrders: true,
    repairs: true,
    stock: false,
    employees: false,
    reports: false,
    cashRegister: false,
  },
  cajero: {
    products: false,
    sales: true,
    workOrders: false,
    repairs: false,
    stock: false,
    employees: false,
    reports: false,
    cashRegister: true,
  },
};

export function getRoleFeatures(role: UserRole): RoleFeatures {
  return roleFeatures[role] || roleFeatures.vendedor;
}

export function hasRoleFeature(role: UserRole, feature: keyof RoleFeatures): boolean {
  return getRoleFeatures(role)[feature];
}
