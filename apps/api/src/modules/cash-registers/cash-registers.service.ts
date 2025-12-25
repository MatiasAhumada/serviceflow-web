import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CashRegister, CashMovement } from '../../entities';
import { CASH_REGISTER_STATUS } from '../../constants';

@Injectable()
export class CashRegistersService {
  constructor(
    @InjectRepository(CashRegister)
    private cashRegistersRepository: Repository<CashRegister>,
    @InjectRepository(CashMovement)
    private cashMovementsRepository: Repository<CashMovement>,
  ) {}

  async getStats(companyId: string) {
    const openRegister = await this.cashRegistersRepository.findOne({
      where: { companyId, status: CASH_REGISTER_STATUS.OPEN },
      relations: ['movements'],
    });

    if (!openRegister) {
      return {
        isOpen: false,
        currentBalance: 0,
        totalIncome: 0,
        totalExpense: 0,
        movementsCount: 0,
      };
    }

    const movements = await this.cashMovementsRepository.find({
      where: { cashRegisterId: openRegister.id, companyId },
    });

    const totalIncome = movements
      .filter((m) => m.type === 'income')
      .reduce((sum, m) => sum + Number(m.amount), 0);

    const totalExpense = movements
      .filter((m) => m.type === 'expense')
      .reduce((sum, m) => sum + Number(m.amount), 0);

    return {
      isOpen: true,
      cashRegisterId: openRegister.id,
      cashRegisterName: openRegister.name,
      openTime: openRegister.openTime,
      currentBalance: totalIncome - totalExpense,
      totalIncome,
      totalExpense,
      movementsCount: movements.length,
    };
  }

  async getMovements(companyId: string) {
    const openRegister = await this.cashRegistersRepository.findOne({
      where: { companyId, status: CASH_REGISTER_STATUS.OPEN },
    });

    if (!openRegister) {
      return [];
    }

    return this.cashMovementsRepository.find({
      where: { cashRegisterId: openRegister.id, companyId },
      relations: ['user'],
      order: { date: 'DESC' },
    });
  }

  async findAll(companyId: string): Promise<CashRegister[]> {
    return this.cashRegistersRepository.find({
      where: { companyId },
      relations: ['opener', 'closer'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string, companyId: string): Promise<CashRegister> {
    const cashRegister = await this.cashRegistersRepository.findOne({
      where: { id, companyId },
      relations: ['opener', 'closer', 'movements', 'movements.user'],
    });

    if (!cashRegister) {
      throw new NotFoundException('Caja no encontrada');
    }

    return cashRegister;
  }

  async create(cashRegisterData: Partial<CashRegister>): Promise<CashRegister> {
    const cashRegister = this.cashRegistersRepository.create({
      ...cashRegisterData,
      status: CASH_REGISTER_STATUS.CLOSED,
      currentBalance: 0,
    });
    return this.cashRegistersRepository.save(cashRegister);
  }

  async open(id: string, companyId: string, userId: string): Promise<CashRegister> {
    const cashRegister = await this.findOne(id, companyId);

    if (cashRegister.status === CASH_REGISTER_STATUS.OPEN) {
      throw new BadRequestException('La caja ya está abierta');
    }

    const openRegister = await this.cashRegistersRepository.findOne({
      where: { companyId, status: CASH_REGISTER_STATUS.OPEN },
    });

    if (openRegister) {
      throw new BadRequestException('Ya existe una caja abierta');
    }

    cashRegister.status = CASH_REGISTER_STATUS.OPEN;
    cashRegister.openedBy = userId;
    cashRegister.openTime = new Date();
    cashRegister.closeTime = undefined;
    cashRegister.closedBy = undefined;

    return this.cashRegistersRepository.save(cashRegister);
  }

  async close(id: string, companyId: string, userId: string): Promise<CashRegister> {
    const cashRegister = await this.findOne(id, companyId);

    if (cashRegister.status === CASH_REGISTER_STATUS.CLOSED) {
      throw new BadRequestException('La caja ya está cerrada');
    }

    cashRegister.status = CASH_REGISTER_STATUS.CLOSED;
    cashRegister.closedBy = userId;
    cashRegister.closeTime = new Date();

    return this.cashRegistersRepository.save(cashRegister);
  }

  async update(id: string, cashRegisterData: Partial<CashRegister>, companyId: string): Promise<CashRegister> {
    const cashRegister = await this.findOne(id, companyId);
    Object.assign(cashRegister, cashRegisterData);
    return this.cashRegistersRepository.save(cashRegister);
  }

  async remove(id: string, companyId: string): Promise<void> {
    const cashRegister = await this.findOne(id, companyId);
    await this.cashRegistersRepository.remove(cashRegister);
  }
}