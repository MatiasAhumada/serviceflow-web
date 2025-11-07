import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Device } from '../../entities';

@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(Device)
    private devicesRepository: Repository<Device>,
  ) {}

  async findAll(): Promise<Device[]> {
    return this.devicesRepository.find({ relations: ['customer'] });
  }

  async findOne(id: string): Promise<Device | null> {
    return this.devicesRepository.findOne({
      where: { id },
      relations: ['customer'],
    });
  }

  async create(deviceData: Partial<Device>): Promise<Device> {
    const device = this.devicesRepository.create(deviceData);
    return this.devicesRepository.save(device);
  }

  async update(id: string, deviceData: Partial<Device>): Promise<Device | null> {
    await this.devicesRepository.update(id, deviceData);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.devicesRepository.delete(id);
  }
}