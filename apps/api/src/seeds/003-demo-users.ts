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

  const demoUsers = [
    {
      email: 'vendedor@serviceflow.com',
      name: 'Vendedor Demo',
      passwordHash: await bcrypt.hash('123456', 10),
      userType: vendedorType,
    },
    {
      email: 'taller@serviceflow.com',
      name: 'Taller Demo',
      passwordHash: await bcrypt.hash('123456', 10),
      userType: tecnicoType,
    },
    {
      email: 'comercio@serviceflow.com',
      name: 'Comercio Demo',
      passwordHash: await bcrypt.hash('123456', 10),
      userType: comercioType,
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
