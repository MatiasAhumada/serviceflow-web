import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { RolesService } from './roles.service';
import { Role } from '../../entities';

@ApiTags('Roles & Permissions')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all roles' })
  findAll(@Query('companyId') companyId?: string): Promise<Role[]> {
    return companyId ? this.rolesService.findByCompany(companyId) : this.rolesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get role by id' })
  findOne(@Param('id') id: string): Promise<Role | null> {
    return this.rolesService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create role' })
  create(@Body() roleData: Partial<Role>): Promise<Role> {
    return this.rolesService.create(roleData);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update role' })
  update(@Param('id') id: string, @Body() roleData: Partial<Role>): Promise<Role | null> {
    return this.rolesService.update(id, roleData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete role' })
  remove(@Param('id') id: string): Promise<void> {
    return this.rolesService.remove(id);
  }
}