import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CashRegistersService } from './cash-registers.service';
import { CashRegister } from '../../entities';

@ApiTags('Sales & Cash Register')
@Controller('cash-registers')
export class CashRegistersController {
  constructor(private readonly cashRegistersService: CashRegistersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all cash registers' })
  findAll(): Promise<CashRegister[]> {
    return this.cashRegistersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get cash register by id' })
  findOne(@Param('id') id: string): Promise<CashRegister | null> {
    return this.cashRegistersService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create cash register' })
  create(@Body() cashRegisterData: Partial<CashRegister>): Promise<CashRegister> {
    return this.cashRegistersService.create(cashRegisterData);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update cash register' })
  update(@Param('id') id: string, @Body() cashRegisterData: Partial<CashRegister>): Promise<CashRegister | null> {
    return this.cashRegistersService.update(id, cashRegisterData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete cash register' })
  remove(@Param('id') id: string): Promise<void> {
    return this.cashRegistersService.remove(id);
  }
}