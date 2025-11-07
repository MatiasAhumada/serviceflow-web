import { DataSource } from 'typeorm';
import { SystemAdmin, Plan, Permission } from '../entities';
import { PLAN_TYPE } from '@serviceflow/shared';

export async function seedInitialData(dataSource: DataSource) {
  const systemAdminRepo = dataSource.getRepository(SystemAdmin);
  const planRepo = dataSource.getRepository(Plan);
  const permissionRepo = dataSource.getRepository(Permission);

  // Create System Admin
  const adminExists = await systemAdminRepo.findOne({ where: { email: 'admin@serviceflow.com' } });
  if (!adminExists) {
    const admin = systemAdminRepo.create({
      name: 'ServiceFlow Admin',
      email: 'admin@serviceflow.com',
    });
    await systemAdminRepo.save(admin);
    console.log('✅ System Admin created');
  }

  // Create Plans
  const plans = [
    {
      name: 'Plan Vendedor Básico',
      slug: 'vendor-basic',
      price: 2900,
      description: 'Plan básico para vendedores individuales',
      baseUserSeats: 1,
      features: {
        maxCustomers: 100,
        maxProducts: 50,
        hasInventory: false,
        hasReports: false,
        hasCashRegister: true,
      },
    },
    {
      name: 'Plan Técnico Básico',
      slug: 'technician-basic',
      price: 3500,
      description: 'Plan básico para técnicos individuales',
      baseUserSeats: 1,
      features: {
        maxServiceOrders: 50,
        maxCustomers: 100,
        hasWarranties: true,
        hasReports: false,
        hasInventory: false,
      },
    },
    {
      name: 'Plan Empresa Estándar',
      slug: 'company-standard',
      price: 8900,
      description: 'Plan completo para empresas pequeñas',
      baseUserSeats: 3,
      features: {
        maxUsers: 5,
        maxCustomers: 500,
        maxProducts: 200,
        maxServiceOrders: 200,
        hasInventory: true,
        hasReports: true,
        hasCashRegister: true,
        hasWarranties: true,
      },
    },
    {
      name: 'Plan Empresa Premium',
      slug: 'company-premium',
      price: 15900,
      description: 'Plan avanzado para empresas medianas',
      baseUserSeats: 5,
      features: {
        maxUsers: 15,
        maxCustomers: -1,
        maxProducts: -1,
        maxServiceOrders: -1,
        hasInventory: true,
        hasReports: true,
        hasCashRegister: true,
        hasWarranties: true,
        hasAdvancedReports: true,
        hasMultiLocation: true,
      },
    },
  ];

  for (const planData of plans) {
    const exists = await planRepo.findOne({ where: { slug: planData.slug } });
    if (!exists) {
      const plan = planRepo.create(planData);
      await planRepo.save(plan);
      console.log(`✅ Plan created: ${planData.name}`);
    }
  }

  // Create Permissions
  const permissions = [
    { code: 'manage_users', description: 'Gestionar usuarios' },
    { code: 'view_users', description: 'Ver usuarios' },
    { code: 'manage_customers', description: 'Gestionar clientes' },
    { code: 'view_customers', description: 'Ver clientes' },
    { code: 'manage_products', description: 'Gestionar productos' },
    { code: 'view_products', description: 'Ver productos' },
    { code: 'manage_sales', description: 'Gestionar ventas' },
    { code: 'view_sales', description: 'Ver ventas' },
    { code: 'manage_services', description: 'Gestionar servicios técnicos' },
    { code: 'view_services', description: 'Ver servicios técnicos' },
    { code: 'manage_cash_register', description: 'Gestionar caja registradora' },
    { code: 'view_cash_register', description: 'Ver caja registradora' },
    { code: 'manage_inventory', description: 'Gestionar inventario' },
    { code: 'view_inventory', description: 'Ver inventario' },
    { code: 'view_reports', description: 'Ver reportes' },
    { code: 'manage_company', description: 'Gestionar empresa' },
    { code: 'manage_roles', description: 'Gestionar roles y permisos' },
  ];

  for (const permData of permissions) {
    const exists = await permissionRepo.findOne({ where: { code: permData.code } });
    if (!exists) {
      const permission = permissionRepo.create(permData);
      await permissionRepo.save(permission);
      console.log(`✅ Permission created: ${permData.code}`);
    }
  }

  console.log('🎉 Initial data seeded successfully!');
}