import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Warranty, ServiceOrder } from '../../entities';
import { WarrantiesService } from './warranties.service';
import { WarrantiesController } from './warranties.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Warranty, ServiceOrder])],
  controllers: [WarrantiesController],
  providers: [WarrantiesService],
  exports: [WarrantiesService],
})
export class WarrantiesModule {}