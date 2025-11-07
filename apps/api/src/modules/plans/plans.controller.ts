import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PlansService } from './plans.service';
import { Plan } from '../../entities';

@ApiTags('Plans & Subscriptions')
@Controller('plans')
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  @Get()
  @ApiOperation({ summary: 'Get all plans' })
  findAll(): Promise<Plan[]> {
    return this.plansService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get plan by id' })
  findOne(@Param('id') id: string): Promise<Plan | null> {
    return this.plansService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create plan' })
  create(@Body() planData: Partial<Plan>): Promise<Plan> {
    return this.plansService.create(planData);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update plan' })
  update(@Param('id') id: string, @Body() planData: Partial<Plan>): Promise<Plan> {
    return this.plansService.update(id, planData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete plan' })
  remove(@Param('id') id: string): Promise<void> {
    return this.plansService.remove(id);
  }
}