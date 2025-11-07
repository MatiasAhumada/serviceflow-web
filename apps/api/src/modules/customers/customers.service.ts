import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '../../entities';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>,
  ) {}

  async findAll(): Promise<Customer[]> {
    return this.customersRepository.find({
      relations: ['company', 'user', 'sales', 'serviceOrders', 'devices'],
    });
  }

  async findOne(id: string): Promise<Customer | null> {
    return this.customersRepository.findOne({
      where: { id },
      relations: ['company', 'user', 'sales', 'serviceOrders', 'devices'],
    });
  }

  async findByCompany(companyId: string): Promise<Customer[]> {
    return this.customersRepository.find({
      where: { companyId },
      relations: ['sales', 'serviceOrders', 'devices'],
    });
  }

  async create(customerData: Partial<Customer>): Promise<Customer> {
    const customer = this.customersRepository.create(customerData);
    return this.customersRepository.save(customer);
  }

  async update(id: string, customerData: Partial<Customer>): Promise<Customer | null> {
    await this.customersRepository.update(id, customerData);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.customersRepository.delete(id);
  }
}