import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SubscriptionsService } from './subscriptions.service';
import { Subscription } from '../../entities';

@ApiTags('Plans & Subscriptions')
@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all subscriptions' })
  findAll(): Promise<Subscription[]> {
    return this.subscriptionsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get subscription by id' })
  findOne(@Param('id') id: string): Promise<Subscription | null> {
    return this.subscriptionsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create subscription' })
  create(@Body() subscriptionData: Partial<Subscription>): Promise<Subscription> {
    return this.subscriptionsService.create(subscriptionData);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update subscription' })
  update(@Param('id') id: string, @Body() subscriptionData: Partial<Subscription>): Promise<Subscription | null> {
    return this.subscriptionsService.update(id, subscriptionData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete subscription' })
  remove(@Param('id') id: string): Promise<void> {
    return this.subscriptionsService.remove(id);
  }
}