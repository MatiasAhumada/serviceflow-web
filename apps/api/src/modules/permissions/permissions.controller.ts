import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PermissionsService } from './permissions.service';
import { Permission } from '../../entities';

@ApiTags('Roles & Permissions')
@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all permissions' })
  findAll(): Promise<Permission[]> {
    return this.permissionsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get permission by id' })
  findOne(@Param('id') id: string): Promise<Permission | null> {
    return this.permissionsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create permission' })
  create(@Body() permissionData: Partial<Permission>): Promise<Permission> {
    return this.permissionsService.create(permissionData);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update permission' })
  update(@Param('id') id: string, @Body() permissionData: Partial<Permission>): Promise<Permission> {
    return this.permissionsService.update(id, permissionData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete permission' })
  remove(@Param('id') id: string): Promise<void> {
    return this.permissionsService.remove(id);
  }
}