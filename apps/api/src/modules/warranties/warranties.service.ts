import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Warranty } from '../../entities';

@Injectable()
export class WarrantiesService {
  constructor(
    @InjectRepository(Warranty)
    private warrantiesRepository: Repository<Warranty>,
  ) {}

  async findAll(): Promise<Warranty[]> {
    return this.warrantiesRepository.find({ relations: ['serviceOrder'] });
  }

  async findOne(id: string): Promise<Warranty | null> {
    return this.warrantiesRepository.findOne({
      where: { id },
      relations: ['serviceOrder'],
    });
  }

  async create(warrantyData: Partial<Warranty>): Promise<Warranty> {
    const warranty = this.warrantiesRepository.create(warrantyData);
    return this.warrantiesRepository.save(warranty);
  }

  async update(id: string, warrantyData: Partial<Warranty>): Promise<Warranty> {
    await this.warrantiesRepository.update(id, warrantyData);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.warrantiesRepository.delete(id);
  }
}