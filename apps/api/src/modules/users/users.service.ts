import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getStats(companyId: string) {
    const users = await this.usersRepository.find({
      where: { company: { id: companyId } },
      relations: ['userType'],
    });

    const roleCount = users.reduce((acc, user) => {
      const roleName = user.userType?.name || 'Sin rol';
      acc[roleName] = (acc[roleName] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      total: users.length,
      active: users.filter(u => u.status === 'active').length,
      inactive: users.filter(u => u.status === 'inactive').length,
      byRole: roleCount,
    };
  }

  async findAll(companyId: string, role?: string): Promise<User[]> {
    const query = this.usersRepository.createQueryBuilder('user')
      .leftJoinAndSelect('user.company', 'company')
      .leftJoinAndSelect('user.userType', 'userType')
      .where('company.id = :companyId', { companyId });

    if (role) {
      query.andWhere('userType.name = :role', { role });
    }

    return query.getMany();
  }

  async findOne(id: string, companyId: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id, company: { id: companyId } },
      relations: ['company', 'userType', 'subscription'],
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { email },
      relations: ['userType', 'company', 'role'],
    });
  }

  async updateLastLogin(id: string): Promise<void> {
    await this.usersRepository.update(id, { lastLogin: new Date() });
  }

  async create(userData: {
    email: string;
    name: string;
    passwordHash: string;
    userTypeCode: string;
    companyId?: string;
  }): Promise<User> {
    const userType = await this.usersRepository.manager.findOne('UserType', {
      where: { code: userData.userTypeCode },
    });

    if (!userType) {
      throw new Error('Invalid user type');
    }

    const user = this.usersRepository.create({
      email: userData.email,
      name: userData.name,
      passwordHash: userData.passwordHash,
      userType,
      company: userData.companyId ? { id: userData.companyId } as any : null,
    });

    return this.usersRepository.save(user);
  }

  async update(id: string, userData: Partial<User>, companyId: string): Promise<User> {
    const user = await this.findOne(id, companyId);
    Object.assign(user, userData);
    return this.usersRepository.save(user);
  }

  async remove(id: string, companyId: string): Promise<void> {
    const user = await this.findOne(id, companyId);
    await this.usersRepository.remove(user);
  }
}