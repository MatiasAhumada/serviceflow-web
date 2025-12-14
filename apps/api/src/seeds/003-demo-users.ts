import { DataSource } from 'typeorm';
import { User, UserType, Company, Subscription, Plan, SystemAdmin, Address } from '../entities';
import * as bcrypt from 'bcrypt';
import { SUBSCRIPTION_STATUS, SUBSCRIBER_TYPE } from '../constants';

export async function seedDemoUsers(dataSource: DataSource) {
  const userRepo = dataSource.getRepository(User);
  const userTypeRepo = dataSource.getRepository(UserType);
  const companyRepo = dataSource.getRepository(Company);
  const subscriptionRepo = dataSource.getRepository(Subscription);
  const planRepo = dataSource.getRepository(Plan);
  const systemAdminRepo = dataSource.getRepository(SystemAdmin);
  const addressRepo = dataSource.getRepository(Address);

  const systemAdmin = await systemAdminRepo.findOne({ where: { email: 'admin@serviceflow.com' } });
  if (!systemAdmin) {
    console.error('❌ System Admin not found');
    return;
  }

  const adminType = await userTypeRepo.findOne({ where: { code: 'admin' } });
  const vendedorType = await userTypeRepo.findOne({ where: { code: 'vendedor' } });
  const tecnicoType = await userTypeRepo.findOne({ where: { code: 'tecnico' } });
  const cajeroType = await userTypeRepo.findOne({ where: { code: 'cajero' } });

  if (!adminType || !vendedorType || !tecnicoType || !cajeroType) {
    console.error('❌ User types not found');
    return;
  }

  const companyPlan = await planRepo.findOne({ where: { slug: 'company-standard' } });
  const vendorPlan = await planRepo.findOne({ where: { slug: 'vendor-basic' } });
  const techPlan = await planRepo.findOne({ where: { slug: 'technician-basic' } });

  if (!companyPlan || !vendorPlan || !techPlan) {
    console.error('❌ Plans not found');
    return;
  }

  // 1. Crear Admin de Compañía
  let adminUser = await userRepo.findOne({ where: { email: 'admin@empresa.com' } });
  if (!adminUser) {
    adminUser = userRepo.create({
      email: 'admin@empresa.com',
      name: 'Admin Empresa',
      passwordHash: await bcrypt.hash('123456', 10),
      userType: adminType,
    });
    adminUser = await userRepo.save(adminUser);
    console.log(`✅ Admin user created: ${adminUser.name}`);
  }

  // 2. Crear Dirección de Compañía
  let companyAddress = await addressRepo.findOne({ where: { street: 'Av. Principal 123' } });
  if (!companyAddress) {
    companyAddress = addressRepo.create({
      street: 'Av. Principal 123',
      city: 'San Miguel de Tucumán',
      state: 'Tucumán',
      stateCode: 'T',
      country: 'Argentina',
      countryCode: 'AR',
    });
    companyAddress = await addressRepo.save(companyAddress);
  }

  // 3. Crear Compañía
  let company = await companyRepo.findOne({ where: { name: 'Empresa Demo' } });
  if (!company) {
    company = companyRepo.create({
      name: 'Empresa Demo',
      cuit: '20-12345678-9',
      address: companyAddress,
      email: 'contacto@empresa.com',
      phone: '+54 9 381 123-4567',
      owner: adminUser,
    });
    company = await companyRepo.save(company);
    console.log(`✅ Company created: ${company.name}`);
  }

  // 4. Crear Suscripción de Compañía
  const companySubExists = await subscriptionRepo.findOne({ where: { companyId: company.id } });
  if (!companySubExists) {
    const companySub = subscriptionRepo.create({
      subscriberType: SUBSCRIBER_TYPE.COMPANY,
      company: company,
      plan: companyPlan,
      startDate: new Date(),
      endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      status: SUBSCRIPTION_STATUS.ACTIVE,
      autoRenew: true,
      createdBy: systemAdmin,
    });
    await subscriptionRepo.save(companySub);
    console.log(`✅ Company subscription created`);
  }

  // 5. Actualizar Admin con Compañía
  adminUser.company = company;
  await userRepo.save(adminUser);

  // 6. Crear Vendedores de Compañía
  const vendedores = [
    { email: 'vendedor1@empresa.com', name: 'Vendedor Uno' },
    { email: 'vendedor2@empresa.com', name: 'Vendedor Dos' },
  ];

  for (const vendedorData of vendedores) {
    const exists = await userRepo.findOne({ where: { email: vendedorData.email } });
    if (!exists) {
      const vendedor = userRepo.create({
        email: vendedorData.email,
        name: vendedorData.name,
        passwordHash: await bcrypt.hash('123456', 10),
        userType: vendedorType,
        company: company,
      });
      await userRepo.save(vendedor);
      console.log(`✅ Vendedor created: ${vendedor.name}`);
    }
  }

  // 7. Crear Técnicos de Compañía
  const tecnicos = [
    { email: 'tecnico1@empresa.com', name: 'Técnico Uno' },
    { email: 'tecnico2@empresa.com', name: 'Técnico Dos' },
    { email: 'tecnico3@empresa.com', name: 'Técnico Tres' },
  ];

  for (const tecnicoData of tecnicos) {
    const exists = await userRepo.findOne({ where: { email: tecnicoData.email } });
    if (!exists) {
      const tecnico = userRepo.create({
        email: tecnicoData.email,
        name: tecnicoData.name,
        passwordHash: await bcrypt.hash('123456', 10),
        userType: tecnicoType,
        company: company,
      });
      await userRepo.save(tecnico);
      console.log(`✅ Técnico created: ${tecnico.name}`);
    }
  }

  // 8. Crear Cajero de Compañía
  const cajeroExists = await userRepo.findOne({ where: { email: 'cajero@empresa.com' } });
  if (!cajeroExists) {
    const cajero = userRepo.create({
      email: 'cajero@empresa.com',
      name: 'Cajero Empresa',
      passwordHash: await bcrypt.hash('123456', 10),
      userType: cajeroType,
      company: company,
    });
    await userRepo.save(cajero);
    console.log(`✅ Cajero created: ${cajero.name}`);
  }

  // 9. Crear Vendedor Individual
  let vendedorIndividual = await userRepo.findOne({ where: { email: 'vendedor.individual@gmail.com' } });
  if (!vendedorIndividual) {
    vendedorIndividual = userRepo.create({
      email: 'vendedor.individual@gmail.com',
      name: 'Vendedor Individual',
      passwordHash: await bcrypt.hash('123456', 10),
      userType: vendedorType,
    });
    vendedorIndividual = await userRepo.save(vendedorIndividual);
    console.log(`✅ Vendedor Individual created`);

    const vendorSub = subscriptionRepo.create({
      subscriberType: SUBSCRIBER_TYPE.USER,
      user: vendedorIndividual,
      plan: vendorPlan,
      startDate: new Date(),
      endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      status: SUBSCRIPTION_STATUS.ACTIVE,
      autoRenew: true,
      createdBy: systemAdmin,
    });
    await subscriptionRepo.save(vendorSub);
    console.log(`✅ Vendedor Individual subscription created`);
  }

  // 10. Crear Técnico Individual
  let tecnicoIndividual = await userRepo.findOne({ where: { email: 'tecnico.individual@gmail.com' } });
  if (!tecnicoIndividual) {
    tecnicoIndividual = userRepo.create({
      email: 'tecnico.individual@gmail.com',
      name: 'Técnico Individual',
      passwordHash: await bcrypt.hash('123456', 10),
      userType: tecnicoType,
    });
    tecnicoIndividual = await userRepo.save(tecnicoIndividual);
    console.log(`✅ Técnico Individual created`);

    const techSub = subscriptionRepo.create({
      subscriberType: SUBSCRIBER_TYPE.USER,
      user: tecnicoIndividual,
      plan: techPlan,
      startDate: new Date(),
      endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      status: SUBSCRIPTION_STATUS.ACTIVE,
      autoRenew: true,
      createdBy: systemAdmin,
    });
    await subscriptionRepo.save(techSub);
    console.log(`✅ Técnico Individual subscription created`);
  }

  console.log('\n📋 USUARIOS DE PRUEBA:');
  console.log('========================');
  console.log('\n🏢 EMPRESA DEMO:');
  console.log('  Admin: admin@empresa.com / 123456');
  console.log('  Vendedor 1: vendedor1@empresa.com / 123456');
  console.log('  Vendedor 2: vendedor2@empresa.com / 123456');
  console.log('  Técnico 1: tecnico1@empresa.com / 123456');
  console.log('  Técnico 2: tecnico2@empresa.com / 123456');
  console.log('  Técnico 3: tecnico3@empresa.com / 123456');
  console.log('  Cajero: cajero@empresa.com / 123456');
  console.log('\n👤 USUARIOS INDIVIDUALES:');
  console.log('  Vendedor: vendedor.individual@gmail.com / 123456');
  console.log('  Técnico: tecnico.individual@gmail.com / 123456');
  console.log('========================\n');
}
