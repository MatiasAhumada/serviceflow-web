import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CashRegister, CashMovement, Company, User, Sale } from '../../entities';
import { CashRegistersService } from './cash-registers.service';
import { CashRegistersController } from './cash-registers.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CashRegister, CashMovement, Company, User, Sale])],
  controllers: [CashRegistersController],
  providers: [CashRegistersService],
  exports: [CashRegistersService],
})
export class CashRegistersModule {}