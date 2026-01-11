import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Supplier } from '../../entities';
import { CreateSupplierDto, UpdateSupplierDto, QuerySupplierDto } from './dto';

@Injectable()
export class SuppliersService {
  constructor(
    @InjectRepository(Supplier)
    private suppliersRepository: Repository<Supplier>,
  ) {}

  async getStats(companyId: string) {
    const total = await this.suppliersRepository.count({
      where: { companyId },
    });
    return { total };
  }

  async findAll(query: QuerySupplierDto): Promise<Supplier[]> {
    const { companyId, search } = query;
    const where: Record<string, unknown> = {};

    if (companyId) {
      where.companyId = companyId;
    }

    if (search) {
      return this.suppliersRepository
        .createQueryBuilder('supplier')
        .leftJoinAndSelect('supplier.products', 'product')
        .where('supplier.companyId = :companyId', { companyId })
        .andWhere(
          '(supplier.name ILIKE :search OR supplier.email ILIKE :search OR supplier.phone ILIKE :search)',
          { search: `%${search}%` },
        )
        .orderBy('supplier.createdAt', 'DESC')
        .getMany();
    }

    return this.suppliersRepository.find({
      where,
      relations: ['products'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string, companyId: string): Promise<Supplier> {
    const supplier = await this.suppliersRepository.findOne({
      where: { id, companyId },
      relations: ['products'],
    });

    if (!supplier) {
      throw new NotFoundException('Proveedor no encontrado');
    }

    return supplier;
  }

  async create(createSupplierDto: CreateSupplierDto): Promise<Supplier> {
    const supplier = this.suppliersRepository.create(createSupplierDto);
    return this.suppliersRepository.save(supplier);
  }

  async update(
    id: string,
    companyId: string,
    updateSupplierDto: UpdateSupplierDto,
  ): Promise<Supplier> {
    const supplier = await this.findOne(id, companyId);
    Object.assign(supplier, updateSupplierDto);
    return this.suppliersRepository.save(supplier);
  }

  async remove(id: string, companyId: string): Promise<void> {
    const supplier = await this.findOne(id, companyId);
    await this.suppliersRepository.remove(supplier);
  }
}
