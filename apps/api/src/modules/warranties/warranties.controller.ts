import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { WarrantiesService } from './warranties.service';
import { Warranty } from '../../entities';

@ApiTags('Technical Services')
@Controller('warranties')
export class WarrantiesController {
  constructor(private readonly warrantiesService: WarrantiesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all warranties' })
  findAll(): Promise<Warranty[]> {
    return this.warrantiesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get warranty by id' })
  findOne(@Param('id') id: string): Promise<Warranty | null> {
    return this.warrantiesService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create warranty' })
  create(@Body() warrantyData: Partial<Warranty>): Promise<Warranty> {
    return this.warrantiesService.create(warrantyData);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update warranty' })
  update(@Param('id') id: string, @Body() warrantyData: Partial<Warranty>): Promise<Warranty | null> {
    return this.warrantiesService.update(id, warrantyData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete warranty' })
  remove(@Param('id') id: string): Promise<void> {
    return this.warrantiesService.remove(id);
  }
}