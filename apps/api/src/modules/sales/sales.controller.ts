import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SalesService } from './sales.service';
import { Sale } from '../../entities';

@ApiTags('Sales & Cash Register')
@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all sales' })
  findAll(@Query('companyId') companyId?: string): Promise<Sale[]> {
    return companyId ? this.salesService.findByCompany(companyId) : this.salesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get sale by id' })
  findOne(@Param('id') id: string): Promise<Sale | null> {
    return this.salesService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create sale' })
  create(@Body() saleData: Partial<Sale>): Promise<Sale> {
    return this.salesService.create(saleData);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update sale' })
  update(@Param('id') id: string, @Body() saleData: Partial<Sale>): Promise<Sale> {
    return this.salesService.update(id, saleData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete sale' })
  remove(@Param('id') id: string): Promise<void> {
    return this.salesService.remove(id);
  }
}