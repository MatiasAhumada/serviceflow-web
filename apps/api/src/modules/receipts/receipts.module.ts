import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Receipt, Sale, Company, Customer, User } from '../../entities';
import { ReceiptsService } from './receipts.service';
import { ReceiptsController } from './receipts.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Receipt, Sale, Company, Customer, User])],
  controllers: [ReceiptsController],
  providers: [ReceiptsService],
  exports: [ReceiptsService],
})
export class ReceiptsModule {}
