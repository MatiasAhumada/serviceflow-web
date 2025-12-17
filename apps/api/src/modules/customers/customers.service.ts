import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike, MoreThanOrEqual } from 'typeorm';
import { Customer } from '../../entities';
import { CreateCustomerDto, UpdateCustomerDto, QueryCustomerDto } from './dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>,
  ) {}

  async getStats(companyId: string) {
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const [total, newThisMonth] = await Promise.all([
      this.customersRepository.count({ where: { companyId } }),
      this.customersRepository.count({
        where: {
          companyId,
          createdAt: MoreThanOrEqual(firstDayOfMonth),
        },
      }),
    ]);

    return { total, active: total, newThisMonth };
  }

  async findAll(query: QueryCustomerDto): Promise<Customer[]> {
    const { companyId, search } = query;
    const where: Record<string, unknown> = {};

    if (companyId) {
      where.companyId = companyId;
    }

    if (search) {
      return this.customersRepository.find({
        where: [
          { ...where, name: ILike(`%${search}%`) },
          { ...where, email: ILike(`%${search}%`) },
          { ...where, phone: ILike(`%${search}%`) },
        ],
        relations: ['address'],
        order: { createdAt: 'DESC' },
      });
    }

    return this.customersRepository.find({
      where,
      relations: ['address'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string, companyId: string): Promise<Customer> {
    const customer = await this.customersRepository.findOne({
      where: { id, companyId },
      relations: ['address', 'sales', 'serviceOrders', 'devices'],
    });

    if (!customer) {
      throw new NotFoundException('Cliente no encontrado');
    }

    return customer;
  }

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const customer = this.customersRepository.create(createCustomerDto);
    return this.customersRepository.save(customer);
  }

  async update(id: string, companyId: string, updateCustomerDto: UpdateCustomerDto): Promise<Customer> {
    const customer = await this.findOne(id, companyId);
    Object.assign(customer, updateCustomerDto);
    return this.customersRepository.save(customer);
  }

  async remove(id: string, companyId: string): Promise<void> {
    const customer = await this.findOne(id, companyId);
    await this.customersRepository.remove(customer);
  }
}