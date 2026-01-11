import { DataSource } from 'typeorm';
import { SystemAdmin, Plan, Permission } from '../entities';
import { PLAN_TYPE } from '../constants';

export async function seedInitialData(dataSource: DataSource) {
  const systemAdminRepo = dataSource.getRepository(SystemAdmin);
  const planRepo = dataSource.getRepository(Plan);
  const permissionRepo = dataSource.getRepository(Permission);

  // Create System Admin
  const adminExists = await systemAdminRepo.findOne({
    where: { email: 'admin@serviceflow.com' },
  });
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
      name: 'Plan Vendedor',
      slug: 'vendor-basic',
      price: 60000,
      description:
        'Perfecto para emprendedores y comercios que buscan digitalizar sus ventas',
      baseUserSeats: 1,
      popular: false,
      featureList: [
        '1 usuario incluido',
        'Gestión de hasta 500 productos',
        'Clientes ilimitados',
        'Ventas y facturación digital',
        'Recibos profesionales en PDF',
        'Estadísticas de ventas en tiempo real',
        'Configuración fiscal personalizada',
        'Personalización de marca en recibos',
      ],
      features: {
        users: 1,
        products: 500,
        customers: -1,
        sales: true,
        serviceOrders: false,
        reports: 'basic',
        salesStats: true,
        pdfReceipts: true,
        fiscalConfig: true,
        receiptImageConfig: true,
      },
    },
    {
      name: 'Plan Taller Técnico',
      slug: 'technician-basic',
      price: 80000,
      description:
        'Diseñado para talleres que necesitan gestionar reparaciones y servicios técnicos',
      baseUserSeats: 3,
      popular: true,
      featureList: [
        'Hasta 3 usuarios simultáneos',
        'Órdenes de servicio completas',
        'Gestión ilimitada de clientes',
        'Control de stock de repuestos',
        'Seguimiento de reparaciones',
        'Análisis de gastos y rentabilidad',
        'Reportes avanzados de gestión',
        'Panel de control de costos',
      ],
      features: {
        users: 3,
        customers: -1,
        serviceOrders: true,
        reports: 'advanced',
        repairStats: true,
        expenseStats: true,
        expensePanel: true,
        partsStock: true,
      },
    },
    {
      name: 'Plan Empresa',
      slug: 'company-standard',
      price: 150000,
      description:
        'La solución integral para empresas que buscan optimizar todas sus operaciones',
      baseUserSeats: 7,
      popular: false,
      featureList: [
        '7 usuarios con roles específicos',
        '1 Admin + 1 Cajero + 2 Vendedores + 3 Técnicos',
        'Productos y servicios ilimitados',
        'Control total de inventario',
        'Base de clientes sin límites',
        'Paneles personalizados por rol',
        'Dashboard ejecutivo para administración',
        'Comprobantes y documentación completa',
        'Configuración empresarial avanzada',
        'Estadísticas y KPIs en tiempo real',
      ],
      features: {
        users: 7,
        userRoles: { cashier: 1, seller: 2, technician: 3, admin: 1 },
        products: -1,
        customers: -1,
        serviceOrders: -1,
        stockControl: true,
        roleSpecificPanels: true,
        adminPanel: true,
        paymentReceipts: true,
        serviceReceipts: true,
        companyConfig: true,
        companyStats: true,
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
    {
      code: 'manage_cash_register',
      description: 'Gestionar caja registradora',
    },
    { code: 'view_cash_register', description: 'Ver caja registradora' },
    { code: 'manage_inventory', description: 'Gestionar inventario' },
    { code: 'view_inventory', description: 'Ver inventario' },
    { code: 'view_reports', description: 'Ver reportes' },
    { code: 'manage_company', description: 'Gestionar empresa' },
    { code: 'manage_roles', description: 'Gestionar roles y permisos' },
  ];

  for (const permData of permissions) {
    const exists = await permissionRepo.findOne({
      where: { code: permData.code },
    });
    if (!exists) {
      const permission = permissionRepo.create(permData);
      await permissionRepo.save(permission);
      console.log(`✅ Permission created: ${permData.code}`);
    }
  }

  console.log('🎉 Initial data seeded successfully!');
}
