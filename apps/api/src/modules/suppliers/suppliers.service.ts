import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Supplier } from '../../entities';

@Injectable()
export class SuppliersService {
  constructor(
    @InjectRepository(Supplier)
    private suppliersRepository: Repository<Supplier>,
  ) {}

  async findAll(): Promise<Supplier[]> {
    return this.suppliersRepository.find({ relations: ['company', 'user', 'products'] });
  }

  async findOne(id: string): Promise<Supplier | null> {
    return this.suppliersRepository.findOne({
      where: { id },
      relations: ['company', 'user', 'products'],
    });
  }

  async create(supplierData: Partial<Supplier>): Promise<Supplier> {
    const supplier = this.suppliersRepository.create(supplierData);
    return this.suppliersRepository.save(supplier);
  }

  async update(id: string, supplierData: Partial<Supplier>): Promise<Supplier> {
    await this.suppliersRepository.update(id, supplierData);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.suppliersRepository.delete(id);
  }
}