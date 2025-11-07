import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from '../../entities';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(Subscription)
    private subscriptionsRepository: Repository<Subscription>,
  ) {}

  async findAll(): Promise<Subscription[]> {
    return this.subscriptionsRepository.find({
      relations: ['plan', 'company', 'user', 'seats', 'payments'],
    });
  }

  async findOne(id: string): Promise<Subscription | null> {
    return this.subscriptionsRepository.findOne({
      where: { id },
      relations: ['plan', 'company', 'user', 'seats', 'payments'],
    });
  }

  async create(subscriptionData: Partial<Subscription>): Promise<Subscription> {
    const subscription = this.subscriptionsRepository.create(subscriptionData);
    return this.subscriptionsRepository.save(subscription);
  }

  async update(id: string, subscriptionData: Partial<Subscription>): Promise<Subscription | null> {
    await this.subscriptionsRepository.update(id, subscriptionData);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.subscriptionsRepository.delete(id);
  }
}