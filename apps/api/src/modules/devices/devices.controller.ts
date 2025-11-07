import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { DevicesService } from './devices.service';
import { Device } from '../../entities';

@ApiTags('Technical Services')
@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all devices' })
  findAll(): Promise<Device[]> {
    return this.devicesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get device by id' })
  findOne(@Param('id') id: string): Promise<Device | null> {
    return this.devicesService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create device' })
  create(@Body() deviceData: Partial<Device>): Promise<Device> {
    return this.devicesService.create(deviceData);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update device' })
  update(@Param('id') id: string, @Body() deviceData: Partial<Device>): Promise<Device | null> {
    return this.devicesService.update(id, deviceData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete device' })
  remove(@Param('id') id: string): Promise<void> {
    return this.devicesService.remove(id);
  }
}