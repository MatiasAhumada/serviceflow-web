import { IsOptional, IsString, IsEnum } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { SALE_STATUS, PAYMENT_METHOD } from '../../../constants';

export class QuerySaleDto {
  companyId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ enum: SALE_STATUS })
  @IsOptional()
  @IsEnum(SALE_STATUS)
  status?: string;

  @ApiPropertyOptional({ enum: PAYMENT_METHOD })
  @IsOptional()
  @IsEnum(PAYMENT_METHOD)
  paymentMethod?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  customerId?: string;
}
