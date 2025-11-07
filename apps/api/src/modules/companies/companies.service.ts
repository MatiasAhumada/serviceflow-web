import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from '../../entities';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private companiesRepository: Repository<Company>,
  ) {}

  async findAll(): Promise<Company[]> {
    return this.companiesRepository.find({
      relations: ['owner', 'subscription', 'users'],
    });
  }

  async findOne(id: string): Promise<Company | null> {
    return this.companiesRepository.findOne({
      where: { id },
      relations: ['owner', 'subscription', 'users', 'roles'],
    });
  }

  async create(companyData: Partial<Company>): Promise<Company> {
    const company = this.companiesRepository.create(companyData);
    return this.companiesRepository.save(company);
  }

  async update(id: string, companyData: Partial<Company>): Promise<Company> {
    await this.companiesRepository.update(id, companyData);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.companiesRepository.delete(id);
  }
}