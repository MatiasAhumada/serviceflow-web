import { DataSource } from 'typeorm';
import { UserType } from '../entities';

export async function seedUserTypes(dataSource: DataSource) {
  const userTypeRepo = dataSource.getRepository(UserType);

  const userTypes = [
    {
      code: 'super_admin',
      name: 'Super Administrador',
      description: 'Acceso total al sistema',
      isActive: true,
    },
    {
      code: 'admin',
      name: 'Administrador',
      description: 'Administrador de empresa',
      isActive: true,
    },
    {
      code: 'vendedor',
      name: 'Vendedor',
      description: 'Usuario con permisos de ventas',
      isActive: true,
    },
    {
      code: 'cajero',
      name: 'Cajero',
      description: 'Usuario con permisos de caja',
      isActive: true,
    },
    {
      code: 'tecnico',
      name: 'Técnico',
      description: 'Usuario con permisos de servicio técnico',
      isActive: true,
    },
  ];

  for (const userType of userTypes) {
    const exists = await userTypeRepo.findOne({ where: { code: userType.code } });
    if (!exists) {
      await userTypeRepo.save(userType);
      console.log(`✅ UserType created: ${userType.name}`);
    }
  }
}
