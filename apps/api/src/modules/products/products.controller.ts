import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { Product } from '../../entities';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Permissions } from '../auth/decorators/permissions.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('Products & Inventory')
@Controller('products')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('JWT-auth')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @Permissions('view_products')
  findAll(@Query('companyId') companyId?: string): Promise<Product[]> {
    return companyId ? this.productsService.findByCompany(companyId) : this.productsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get product by id' })
  findOne(@Param('id') id: string): Promise<Product | null> {
    return this.productsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create product' })
  @Permissions('manage_products')
  create(@Body() productData: Partial<Product>, @CurrentUser() user: any): Promise<Product> {
    return this.productsService.create(productData);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update product' })
  @Permissions('manage_products')
  update(@Param('id') id: string, @Body() productData: Partial<Product>): Promise<Product | null> {
    return this.productsService.update(id, productData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete product' })
  @Permissions('manage_products')
  remove(@Param('id') id: string): Promise<void> {
    return this.productsService.remove(id);
  }
}