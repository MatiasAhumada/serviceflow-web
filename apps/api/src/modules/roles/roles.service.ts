import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../../entities';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) {}

  async findAll(): Promise<Role[]> {
    return this.rolesRepository.find({ relations: ['company', 'permissions'] });
  }

  async findOne(id: string): Promise<Role | null> {
    return this.rolesRepository.findOne({
      where: { id },
      relations: ['company', 'permissions', 'users'],
    });
  }

  async findByCompany(companyId: string): Promise<Role[]> {
    return this.rolesRepository.find({
      where: { companyId },
      relations: ['permissions'],
    });
  }

  async create(roleData: Partial<Role>): Promise<Role> {
    const role = this.rolesRepository.create(roleData);
    return this.rolesRepository.save(role);
  }

  async update(id: string, roleData: Partial<Role>): Promise<Role | null> {
    await this.rolesRepository.update(id, roleData);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.rolesRepository.delete(id);
  }
}