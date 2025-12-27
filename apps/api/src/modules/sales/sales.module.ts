import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sale, SaleItem, SaleCardDetail, Customer, User, CashRegister, Product, CashMovement, PaymentOrder } from '../../entities';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Sale, SaleItem, SaleCardDetail, Customer, User, CashRegister, Product, CashMovement, PaymentOrder])],
  controllers: [SalesController],
  providers: [SalesService],
  exports: [SalesService, TypeOrmModule],
})
export class SalesModule {}