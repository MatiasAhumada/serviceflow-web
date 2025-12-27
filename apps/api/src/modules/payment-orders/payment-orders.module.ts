import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentOrder, Sale, CashMovement } from '../../entities';
import { PaymentOrdersService } from './payment-orders.service';
import { PaymentOrdersController } from './payment-orders.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentOrder, Sale, CashMovement])],
  controllers: [PaymentOrdersController],
  providers: [PaymentOrdersService],
  exports: [PaymentOrdersService],
})
export class PaymentOrdersModule {}
