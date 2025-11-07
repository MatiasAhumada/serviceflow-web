import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from '../../entities';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private permissionsRepository: Repository<Permission>,
  ) {}

  async findAll(): Promise<Permission[]> {
    return this.permissionsRepository.find();
  }

  async findOne(id: string): Promise<Permission | null> {
    return this.permissionsRepository.findOne({ where: { id } });
  }

  async findByCode(code: string): Promise<Permission | null> {
    return this.permissionsRepository.findOne({ where: { code } });
  }

  async create(permissionData: Partial<Permission>): Promise<Permission> {
    const permission = this.permissionsRepository.create(permissionData);
    return this.permissionsRepository.save(permission);
  }

  async update(id: string, permissionData: Partial<Permission>): Promise<Permission> {
    await this.permissionsRepository.update(id, permissionData);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.permissionsRepository.delete(id);
  }
}