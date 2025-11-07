import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sale } from '../../entities';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale)
    private salesRepository: Repository<Sale>,
  ) {}

  async findAll(): Promise<Sale[]> {
    return this.salesRepository.find({
      relations: ['customer', 'seller', 'cashRegister', 'items', 'items.product'],
    });
  }

  async findOne(id: string): Promise<Sale | null> {
    return this.salesRepository.findOne({
      where: { id },
      relations: ['customer', 'seller', 'cashRegister', 'items', 'items.product'],
    });
  }

  async findByCompany(companyId: string): Promise<Sale[]> {
    return this.salesRepository.find({
      where: { companyId },
      relations: ['customer', 'seller', 'items', 'items.product'],
    });
  }

  async create(saleData: Partial<Sale>): Promise<Sale> {
    const sale = this.salesRepository.create(saleData);
    return this.salesRepository.save(sale);
  }

  async update(id: string, saleData: Partial<Sale>): Promise<Sale> {
    await this.salesRepository.update(id, saleData);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.salesRepository.delete(id);
  }
}