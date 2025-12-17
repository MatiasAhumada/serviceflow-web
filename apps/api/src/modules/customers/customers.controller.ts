import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CustomersService } from './customers.service';
import { CreateCustomerDto, UpdateCustomerDto, QueryCustomerDto } from './dto';
import { Customer } from '../../entities';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('Customers')
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get('stats')
  @ApiOperation({ summary: 'Get customer statistics' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Statistics retrieved successfully' })
  getStats(@CurrentUser() user: { companyId: string }) {
    return this.customersService.getStats(user.companyId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all customers with filters' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Customers retrieved successfully' })
  findAll(
    @CurrentUser() user: { companyId: string },
    @Query() query: QueryCustomerDto,
  ): Promise<Customer[]> {
    return this.customersService.findAll({ ...query, companyId: user.companyId });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get customer by id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Customer retrieved successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Customer not found' })
  findOne(
    @CurrentUser() user: { companyId: string },
    @Param('id') id: string,
  ): Promise<Customer> {
    return this.customersService.findOne(id, user.companyId);
  }

  @Post()
  @ApiOperation({ summary: 'Create customer' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Customer created successfully' })
  create(
    @CurrentUser() user: { companyId: string },
    @Body() createCustomerDto: CreateCustomerDto,
  ): Promise<Customer> {
    return this.customersService.create({ ...createCustomerDto, companyId: user.companyId });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update customer' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Customer updated successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Customer not found' })
  update(
    @CurrentUser() user: { companyId: string },
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customer> {
    return this.customersService.update(id, user.companyId, updateCustomerDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete customer' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Customer deleted successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Customer not found' })
  remove(
    @CurrentUser() user: { companyId: string },
    @Param('id') id: string,
  ): Promise<void> {
    return this.customersService.remove(id, user.companyId);
  }
}