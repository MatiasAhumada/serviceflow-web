import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from '../../entities';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private paymentsRepository: Repository<Payment>,
  ) {}

  async findAll(): Promise<Payment[]> {
    return this.paymentsRepository.find({ relations: ['subscription'] });
  }

  async findOne(id: string): Promise<Payment | null> {
    return this.paymentsRepository.findOne({
      where: { id },
      relations: ['subscription'],
    });
  }

  async create(paymentData: Partial<Payment>): Promise<Payment> {
    const payment = this.paymentsRepository.create(paymentData);
    return this.paymentsRepository.save(payment);
  }

  async update(id: string, paymentData: Partial<Payment>): Promise<Payment | null> {
    await this.paymentsRepository.update(id, paymentData);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.paymentsRepository.delete(id);
  }
}