import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ServiceOrdersService } from './service-orders.service';
import { ServiceOrder } from '../../entities';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('Service Orders')
@Controller('service-orders')
export class ServiceOrdersController {
  constructor(private readonly serviceOrdersService: ServiceOrdersService) {}

  @Get('stats')
  @ApiOperation({ summary: 'Get service orders statistics' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Statistics retrieved successfully',
  })
  getStats(@CurrentUser() user: { companyId: string }) {
    return this.serviceOrdersService.getStats(user.companyId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all service orders' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Service orders retrieved successfully',
  })
  findAll(@CurrentUser() user: { companyId: string }): Promise<ServiceOrder[]> {
    return this.serviceOrdersService.findAll(user.companyId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get service order by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Service order retrieved successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Service order not found',
  })
  findOne(
    @CurrentUser() user: { companyId: string },
    @Param('id') id: string,
  ): Promise<ServiceOrder> {
    return this.serviceOrdersService.findOne(id, user.companyId);
  }

  @Post()
  @ApiOperation({ summary: 'Create service order' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Service order created successfully',
  })
  create(
    @CurrentUser() user: { companyId: string; userId: string },
    @Body() serviceOrderData: Partial<ServiceOrder>,
  ): Promise<ServiceOrder> {
    return this.serviceOrdersService.create({
      ...serviceOrderData,
      companyId: user.companyId,
      userId: user.userId,
      receivedById: user.userId,
    });
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update service order status' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Status updated successfully',
  })
  updateStatus(
    @CurrentUser() user: { companyId: string },
    @Param('id') id: string,
    @Body() body: { status: string; notes?: string },
  ): Promise<ServiceOrder> {
    return this.serviceOrdersService.updateStatus(
      id,
      body.status,
      user.companyId,
      body.notes,
    );
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update service order' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Service order updated successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Service order not found',
  })
  update(
    @CurrentUser() user: { companyId: string },
    @Param('id') id: string,
    @Body() serviceOrderData: Partial<ServiceOrder>,
  ): Promise<ServiceOrder> {
    return this.serviceOrdersService.update(
      id,
      serviceOrderData,
      user.companyId,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete service order' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Service order deleted successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Service order not found',
  })
  remove(
    @CurrentUser() user: { companyId: string },
    @Param('id') id: string,
  ): Promise<void> {
    return this.serviceOrdersService.remove(id, user.companyId);
  }
}
