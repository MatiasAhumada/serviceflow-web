import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CashRegistersService } from './cash-registers.service';
import { CashRegister } from '../../entities';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('Cash Registers')
@Controller('cash-registers')
export class CashRegistersController {
  constructor(private readonly cashRegistersService: CashRegistersService) {}

  @Get('stats')
  @ApiOperation({ summary: 'Get cash register statistics' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Statistics retrieved successfully' })
  getStats(@CurrentUser() user: { companyId: string }) {
    return this.cashRegistersService.getStats(user.companyId);
  }

  @Get('movements')
  @ApiOperation({ summary: 'Get all cash movements' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Movements retrieved successfully' })
  getMovements(@CurrentUser() user: { companyId: string }) {
    return this.cashRegistersService.getMovements(user.companyId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all cash registers' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Cash registers retrieved successfully' })
  findAll(@CurrentUser() user: { companyId: string }): Promise<CashRegister[]> {
    return this.cashRegistersService.findAll(user.companyId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get cash register by id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Cash register retrieved successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Cash register not found' })
  findOne(
    @CurrentUser() user: { companyId: string },
    @Param('id') id: string,
  ): Promise<CashRegister> {
    return this.cashRegistersService.findOne(id, user.companyId);
  }

  @Post()
  @ApiOperation({ summary: 'Create cash register' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Cash register created successfully' })
  create(
    @CurrentUser() user: { companyId: string; userId: string },
    @Body() cashRegisterData: Partial<CashRegister>,
  ): Promise<CashRegister> {
    return this.cashRegistersService.create({ ...cashRegisterData, companyId: user.companyId, userId: user.userId });
  }

  @Patch(':id/open')
  @ApiOperation({ summary: 'Open cash register' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Cash register opened successfully' })
  open(
    @CurrentUser() user: { companyId: string; userId: string },
    @Param('id') id: string,
  ): Promise<CashRegister> {
    return this.cashRegistersService.open(id, user.companyId, user.userId);
  }

  @Patch(':id/close')
  @ApiOperation({ summary: 'Close cash register' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Cash register closed successfully' })
  close(
    @CurrentUser() user: { companyId: string; userId: string },
    @Param('id') id: string,
  ): Promise<CashRegister> {
    return this.cashRegistersService.close(id, user.companyId, user.userId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update cash register' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Cash register updated successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Cash register not found' })
  update(
    @CurrentUser() user: { companyId: string },
    @Param('id') id: string,
    @Body() cashRegisterData: Partial<CashRegister>,
  ): Promise<CashRegister> {
    return this.cashRegistersService.update(id, cashRegisterData, user.companyId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete cash register' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Cash register deleted successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Cash register not found' })
  remove(
    @CurrentUser() user: { companyId: string },
    @Param('id') id: string,
  ): Promise<void> {
    return this.cashRegistersService.remove(id, user.companyId);
  }
}