import { Controller, Get, Post, Body, Param, Patch, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SalesService } from './sales.service';
import { CreateSaleDto, QuerySaleDto } from './dto';
import { Sale } from '../../entities';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('Sales')
@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Get('stats')
  @ApiOperation({ summary: 'Get sales statistics' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Statistics retrieved successfully' })
  getStats(@CurrentUser() user: { companyId: string; userId: string }) {
    return this.salesService.getStats(user.companyId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all sales with filters' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Sales retrieved successfully' })
  findAll(
    @CurrentUser() user: { companyId: string },
    @Query() query: QuerySaleDto,
  ): Promise<Sale[]> {
    return this.salesService.findAll({ ...query, companyId: user.companyId });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get sale by id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Sale retrieved successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Sale not found' })
  findOne(
    @CurrentUser() user: { companyId: string },
    @Param('id') id: string,
  ): Promise<Sale> {
    return this.salesService.findOne(id, user.companyId);
  }

  @Post()
  @ApiOperation({ summary: 'Create sale' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Sale created successfully' })
  create(
    @CurrentUser() user: { companyId: string; userId: string },
    @Body() createSaleDto: CreateSaleDto,
  ): Promise<Sale> {
    return this.salesService.create({
      ...createSaleDto,
      companyId: user.companyId,
      sellerId: user.userId,
    });
  }

  @Patch(':id/cancel')
  @ApiOperation({ summary: 'Cancel sale' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Sale cancelled successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Sale not found' })
  cancel(
    @CurrentUser() user: { companyId: string },
    @Param('id') id: string,
  ): Promise<Sale> {
    return this.salesService.cancel(id, user.companyId);
  }
}
