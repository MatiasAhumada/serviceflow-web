import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Query,
  HttpCode,
  HttpStatus,
  Delete,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SalesService } from './sales.service';
import { CreateSaleDto, QuerySaleDto, UpdateSaleDto } from './dto';
import { Sale } from '../../entities';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('Sales')
@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Get('stats')
  @ApiOperation({ summary: 'Get sales statistics' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Statistics retrieved successfully',
  })
  getStats(@CurrentUser() user: { companyId: string; userId: string }) {
    return this.salesService.getStats(user.companyId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all sales with filters' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Sales retrieved successfully',
  })
  findAll(
    @CurrentUser() user: { companyId: string },
    @Query() query: QuerySaleDto,
  ): Promise<Sale[]> {
    return this.salesService.findAll({ ...query, companyId: user.companyId });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get sale by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Sale retrieved successfully',
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Sale not found' })
  findOne(
    @CurrentUser() user: { companyId: string },
    @Param('id') id: string,
  ): Promise<Sale> {
    return this.salesService.findOne(id, user.companyId);
  }

  @Post()
  @ApiOperation({ summary: 'Create sale' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Sale created successfully',
  })
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

  @Put(':id')
  @ApiOperation({ summary: 'Update sale' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Sale updated successfully',
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Sale not found' })
  update(
    @CurrentUser() user: { companyId: string },
    @Param('id') id: string,
    @Body() updateSaleDto: UpdateSaleDto,
  ): Promise<Sale> {
    return this.salesService.update(id, updateSaleDto, user.companyId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete sale' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Sale deleted successfully',
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Sale not found' })
  remove(
    @CurrentUser() user: { companyId: string },
    @Param('id') id: string,
  ): Promise<void> {
    return this.salesService.remove(id, user.companyId);
  }

  @Patch(':id/cancel')
  @ApiOperation({ summary: 'Cancel sale' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Sale cancelled successfully',
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Sale not found' })
  cancel(
    @CurrentUser() user: { companyId: string },
    @Param('id') id: string,
  ): Promise<Sale> {
    return this.salesService.cancel(id, user.companyId);
  }
}
