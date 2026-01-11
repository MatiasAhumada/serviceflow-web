import {
  Controller,
  Get,
  Patch,
  Param,
  Body,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PaymentOrdersService } from './payment-orders.service';
import { CompletePaymentOrderDto } from './dto';
import { PaymentOrder } from '../../entities';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('Payment Orders')
@Controller('payment-orders')
export class PaymentOrdersController {
  constructor(private readonly paymentOrdersService: PaymentOrdersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all payment orders' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Payment orders retrieved successfully',
  })
  findAll(@CurrentUser() user: { companyId: string }): Promise<PaymentOrder[]> {
    return this.paymentOrdersService.findAll(user.companyId);
  }

  @Get('pending')
  @ApiOperation({ summary: 'Get pending payment orders' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Pending orders retrieved successfully',
  })
  findPending(
    @CurrentUser() user: { companyId: string },
  ): Promise<PaymentOrder[]> {
    return this.paymentOrdersService.findPending(user.companyId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get payment order by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Payment order retrieved successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Payment order not found',
  })
  findOne(
    @CurrentUser() user: { companyId: string },
    @Param('id') id: string,
  ): Promise<PaymentOrder> {
    return this.paymentOrdersService.findOne(id, user.companyId);
  }

  @Patch(':id/complete')
  @ApiOperation({ summary: 'Complete payment order' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Payment order completed successfully',
  })
  complete(
    @CurrentUser() user: { companyId: string; userId: string },
    @Param('id') id: string,
    @Body() dto: CompletePaymentOrderDto,
  ): Promise<PaymentOrder> {
    return this.paymentOrdersService.complete(
      id,
      user.companyId,
      user.userId,
      dto,
    );
  }

  @Patch(':id/cancel')
  @ApiOperation({ summary: 'Cancel payment order' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Payment order cancelled successfully',
  })
  cancel(
    @CurrentUser() user: { companyId: string },
    @Param('id') id: string,
  ): Promise<PaymentOrder> {
    return this.paymentOrdersService.cancel(id, user.companyId);
  }
}
