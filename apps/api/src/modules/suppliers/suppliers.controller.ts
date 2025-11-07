import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SuppliersService } from './suppliers.service';
import { Supplier } from '../../entities';

@ApiTags('Customers & Suppliers')
@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all suppliers' })
  findAll(): Promise<Supplier[]> {
    return this.suppliersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get supplier by id' })
  findOne(@Param('id') id: string): Promise<Supplier | null> {
    return this.suppliersService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create supplier' })
  create(@Body() supplierData: Partial<Supplier>): Promise<Supplier> {
    return this.suppliersService.create(supplierData);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update supplier' })
  update(@Param('id') id: string, @Body() supplierData: Partial<Supplier>): Promise<Supplier | null> {
    return this.suppliersService.update(id, supplierData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete supplier' })
  remove(@Param('id') id: string): Promise<void> {
    return this.suppliersService.remove(id);
  }
}