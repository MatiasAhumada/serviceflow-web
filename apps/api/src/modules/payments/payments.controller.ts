import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { Payment } from '../../entities';

@ApiTags('Plans & Subscriptions')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all payments' })
  findAll(): Promise<Payment[]> {
    return this.paymentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get payment by id' })
  findOne(@Param('id') id: string): Promise<Payment | null> {
    return this.paymentsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create payment' })
  create(@Body() paymentData: Partial<Payment>): Promise<Payment> {
    return this.paymentsService.create(paymentData);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update payment' })
  update(@Param('id') id: string, @Body() paymentData: Partial<Payment>): Promise<Payment> {
    return this.paymentsService.update(id, paymentData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete payment' })
  remove(@Param('id') id: string): Promise<void> {
    return this.paymentsService.remove(id);
  }
}