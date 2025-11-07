import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceOrder } from '../../entities';

@Injectable()
export class ServiceOrdersService {
  constructor(
    @InjectRepository(ServiceOrder)
    private serviceOrdersRepository: Repository<ServiceOrder>,
  ) {}

  async findAll(): Promise<ServiceOrder[]> {
    return this.serviceOrdersRepository.find({
      relations: ['customer', 'technician', 'items', 'warranty'],
    });
  }

  async findOne(id: string): Promise<ServiceOrder | null> {
    return this.serviceOrdersRepository.findOne({
      where: { id },
      relations: ['customer', 'technician', 'items', 'warranty'],
    });
  }

  async findByCompany(companyId: string): Promise<ServiceOrder[]> {
    return this.serviceOrdersRepository.find({
      where: { companyId },
      relations: ['customer', 'technician', 'items'],
    });
  }

  async create(serviceOrderData: Partial<ServiceOrder>): Promise<ServiceOrder> {
    const serviceOrder = this.serviceOrdersRepository.create(serviceOrderData);
    return this.serviceOrdersRepository.save(serviceOrder);
  }

  async update(id: string, serviceOrderData: Partial<ServiceOrder>): Promise<ServiceOrder | null> {
    await this.serviceOrdersRepository.update(id, serviceOrderData);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.serviceOrdersRepository.delete(id);
  }
}