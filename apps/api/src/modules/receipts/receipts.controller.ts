import { Controller, Get, Post, Body, Param, Delete, HttpStatus, HttpCode, Res } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import type { Response } from 'express';
import { ReceiptsService } from './receipts.service';
import { CreateReceiptDto } from './dto';
import { Receipt } from '../../entities';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import * as path from 'path';

@ApiTags('Receipts')
@Controller('receipts')
export class ReceiptsController {
  constructor(private readonly receiptsService: ReceiptsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all receipts' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Receipts retrieved successfully' })
  findAll(@CurrentUser() user: { companyId: string }): Promise<Receipt[]> {
    return this.receiptsService.findAll(user.companyId);
  }

  @Get('sale/:saleId')
  @ApiOperation({ summary: 'Get receipt by sale id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Receipt retrieved successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Receipt not found' })
  findBySale(
    @CurrentUser() user: { companyId: string },
    @Param('saleId') saleId: string,
  ): Promise<Receipt> {
    return this.receiptsService.findBySale(saleId, user.companyId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get receipt by id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Receipt retrieved successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Receipt not found' })
  findOne(
    @CurrentUser() user: { companyId: string },
    @Param('id') id: string,
  ): Promise<Receipt> {
    return this.receiptsService.findOne(id, user.companyId);
  }

  @Get(':id/pdf')
  @ApiOperation({ summary: 'Download receipt PDF' })
  @ApiResponse({ status: HttpStatus.OK, description: 'PDF downloaded successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Receipt not found' })
  async downloadPDF(
    @CurrentUser() user: { companyId: string },
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    const receipt = await this.receiptsService.findOne(id, user.companyId);
    const filePath = path.join(process.cwd(), receipt.pdfPath);
    res.download(filePath, `factura-${receipt.receiptNumber}.pdf`);
  }

  @Post()
  @ApiOperation({ summary: 'Create receipt' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Receipt created successfully' })
  create(
    @CurrentUser() user: { companyId: string },
    @Body() createReceiptDto: CreateReceiptDto,
  ): Promise<Receipt> {
    return this.receiptsService.create({
      ...createReceiptDto,
      companyId: user.companyId,
    });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete receipt' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Receipt deleted successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Receipt not found' })
  remove(
    @CurrentUser() user: { companyId: string },
    @Param('id') id: string,
  ): Promise<void> {
    return this.receiptsService.remove(id, user.companyId);
  }
}
