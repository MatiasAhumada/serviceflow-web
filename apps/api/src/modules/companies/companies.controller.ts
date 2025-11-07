import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CompaniesService } from './companies.service';
import { Company } from '../../entities';

@ApiTags('Companies')
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all companies' })
  findAll(): Promise<Company[]> {
    return this.companiesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get company by id' })
  findOne(@Param('id') id: string): Promise<Company | null> {
    return this.companiesService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create company' })
  create(@Body() companyData: Partial<Company>): Promise<Company> {
    return this.companiesService.create(companyData);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update company' })
  update(@Param('id') id: string, @Body() companyData: Partial<Company>): Promise<Company> {
    return this.companiesService.update(id, companyData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete company' })
  remove(@Param('id') id: string): Promise<void> {
    return this.companiesService.remove(id);
  }
}