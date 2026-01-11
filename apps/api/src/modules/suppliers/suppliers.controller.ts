import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SuppliersService } from './suppliers.service';
import { CreateSupplierDto, UpdateSupplierDto, QuerySupplierDto } from './dto';
import { Supplier } from '../../entities';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('Suppliers')
@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @Get('stats')
  @ApiOperation({ summary: 'Get supplier statistics' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Statistics retrieved successfully',
  })
  getStats(@CurrentUser() user: { companyId: string }) {
    return this.suppliersService.getStats(user.companyId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all suppliers with filters' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Suppliers retrieved successfully',
  })
  findAll(
    @CurrentUser() user: { companyId: string },
    @Query() query: QuerySupplierDto,
  ): Promise<Supplier[]> {
    return this.suppliersService.findAll({
      ...query,
      companyId: user.companyId,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get supplier by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Supplier retrieved successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Supplier not found',
  })
  findOne(
    @CurrentUser() user: { companyId: string },
    @Param('id') id: string,
  ): Promise<Supplier> {
    return this.suppliersService.findOne(id, user.companyId);
  }

  @Post()
  @ApiOperation({ summary: 'Create supplier' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Supplier created successfully',
  })
  create(
    @CurrentUser() user: { companyId: string },
    @Body() createSupplierDto: CreateSupplierDto,
  ): Promise<Supplier> {
    return this.suppliersService.create({
      ...createSupplierDto,
      companyId: user.companyId,
    });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update supplier' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Supplier updated successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Supplier not found',
  })
  update(
    @CurrentUser() user: { companyId: string },
    @Param('id') id: string,
    @Body() updateSupplierDto: UpdateSupplierDto,
  ): Promise<Supplier> {
    return this.suppliersService.update(id, user.companyId, updateSupplierDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete supplier' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Supplier deleted successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Supplier not found',
  })
  remove(
    @CurrentUser() user: { companyId: string },
    @Param('id') id: string,
  ): Promise<void> {
    return this.suppliersService.remove(id, user.companyId);
  }
}
