import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plan } from '../../entities';

@Injectable()
export class PlansService {
  constructor(
    @InjectRepository(Plan)
    private plansRepository: Repository<Plan>,
  ) {}

  async findAll(): Promise<Plan[]> {
    return this.plansRepository.find();
  }

  async findOne(id: string): Promise<Plan | null> {
    return this.plansRepository.findOne({ where: { id } });
  }

  async findBySlug(slug: string): Promise<Plan | null> {
    return this.plansRepository.findOne({ where: { slug } });
  }

  async create(planData: Partial<Plan>): Promise<Plan> {
    const plan = this.plansRepository.create(planData);
    return this.plansRepository.save(plan);
  }

  async update(id: string, planData: Partial<Plan>): Promise<Plan | null> {
    await this.plansRepository.update(id, planData);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.plansRepository.delete(id);
  }
}