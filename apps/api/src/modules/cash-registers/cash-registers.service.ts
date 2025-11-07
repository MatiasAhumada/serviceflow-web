import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CashRegister } from '../../entities';

@Injectable()
export class CashRegistersService {
  constructor(
    @InjectRepository(CashRegister)
    private cashRegistersRepository: Repository<CashRegister>,
  ) {}

  async findAll(): Promise<CashRegister[]> {
    return this.cashRegistersRepository.find({
      relations: ['company', 'user', 'opener', 'closer', 'sales'],
    });
  }

  async findOne(id: string): Promise<CashRegister | null> {
    return this.cashRegistersRepository.findOne({
      where: { id },
      relations: ['company', 'user', 'opener', 'closer', 'sales'],
    });
  }

  async create(cashRegisterData: Partial<CashRegister>): Promise<CashRegister> {
    const cashRegister = this.cashRegistersRepository.create(cashRegisterData);
    return this.cashRegistersRepository.save(cashRegister);
  }

  async update(id: string, cashRegisterData: Partial<CashRegister>): Promise<CashRegister | null> {
    await this.cashRegistersRepository.update(id, cashRegisterData);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.cashRegistersRepository.delete(id);
  }
}