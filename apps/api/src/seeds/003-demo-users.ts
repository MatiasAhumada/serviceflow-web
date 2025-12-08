import { DataSource } from 'typeorm';
import { User, UserType } from '../entities';
import * as bcrypt from 'bcrypt';

export async function seedDemoUsers(dataSource: DataSource) {
  const userRepo = dataSource.getRepository(User);
  const userTypeRepo = dataSource.getRepository(UserType);

  const vendedorType = await userTypeRepo.findOne({ where: { code: 'vendedor' } });
  const tecnicoType = await userTypeRepo.findOne({ where: { code: 'tecnico' } });
  const comercioType = await userTypeRepo.findOne({ where: { code: 'admin' } });

  if (!vendedorType || !tecnicoType || !comercioType) {
    console.error('❌ User types not found');
    return;
  }

  const superAdminType = await userTypeRepo.findOne({ where: { code: 'super_admin' } });
  const cajeroType = await userTypeRepo.findOne({ where: { code: 'cajero' } });

  if (!vendedorType || !tecnicoType || !comercioType || !superAdminType || !cajeroType) {
    console.error('❌ User types not found');
    return;
  }

  const demoUsers = [
    {
      email: 'superadmin@serviceflow.com',
      name: 'Super Admin',
      passwordHash: await bcrypt.hash('123456', 10),
      userType: superAdminType,
    },
    {
      email: 'admin@serviceflow.com',
      name: 'Admin Demo',
      passwordHash: await bcrypt.hash('123456', 10),
      userType: comercioType,
    },
    {
      email: 'vendedor@serviceflow.com',
      name: 'Vendedor Demo',
      passwordHash: await bcrypt.hash('123456', 10),
      userType: vendedorType,
    },
    {
      email: 'cajero@serviceflow.com',
      name: 'Cajero Demo',
      passwordHash: await bcrypt.hash('123456', 10),
      userType: cajeroType,
    },
    {
      email: 'tecnico@serviceflow.com',
      name: 'Técnico Demo',
      passwordHash: await bcrypt.hash('123456', 10),
      userType: tecnicoType,
    },
  ];

  for (const userData of demoUsers) {
    const exists = await userRepo.findOne({ where: { email: userData.email } });
    if (!exists) {
      await userRepo.save(userData);
      console.log(`✅ Demo user created: ${userData.name}`);
    }
  }
}
