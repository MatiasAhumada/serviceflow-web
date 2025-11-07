import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ServiceOrdersService } from './service-orders.service';
import { ServiceOrder } from '../../entities';

@ApiTags('Technical Services')
@Controller('service-orders')
export class ServiceOrdersController {
  constructor(private readonly serviceOrdersService: ServiceOrdersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all service orders' })
  findAll(@Query('companyId') companyId?: string): Promise<ServiceOrder[]> {
    return companyId ? this.serviceOrdersService.findByCompany(companyId) : this.serviceOrdersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get service order by id' })
  findOne(@Param('id') id: string): Promise<ServiceOrder | null> {
    return this.serviceOrdersService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create service order' })
  create(@Body() serviceOrderData: Partial<ServiceOrder>): Promise<ServiceOrder> {
    return this.serviceOrdersService.create(serviceOrderData);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update service order' })
  update(@Param('id') id: string, @Body() serviceOrderData: Partial<ServiceOrder>): Promise<ServiceOrder | null> {
    return this.serviceOrdersService.update(id, serviceOrderData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete service order' })
  remove(@Param('id') id: string): Promise<void> {
    return this.serviceOrdersService.remove(id);
  }
}