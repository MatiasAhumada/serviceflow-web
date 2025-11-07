import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CustomersService } from './customers.service';
import { Customer } from '../../entities';

@ApiTags('Customers & Suppliers')
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all customers' })
  findAll(@Query('companyId') companyId?: string): Promise<Customer[]> {
    return companyId ? this.customersService.findByCompany(companyId) : this.customersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get customer by id' })
  findOne(@Param('id') id: string): Promise<Customer | null> {
    return this.customersService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create customer' })
  create(@Body() customerData: Partial<Customer>): Promise<Customer> {
    return this.customersService.create(customerData);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update customer' })
  update(@Param('id') id: string, @Body() customerData: Partial<Customer>): Promise<Customer> {
    return this.customersService.update(id, customerData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete customer' })
  remove(@Param('id') id: string): Promise<void> {
    return this.customersService.remove(id);
  }
}