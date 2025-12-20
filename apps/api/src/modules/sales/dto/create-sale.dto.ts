import { IsString, IsEnum, IsArray, ValidateNested, IsOptional, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PAYMENT_METHOD } from '../../../constants';
import { CreateSaleItemDto } from './create-sale-item.dto';
import { CardDetailDto } from './card-detail.dto';

export class CreateSaleDto {
  @ApiProperty()
  @IsString()
  customerId: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  cashRegisterId?: string;

  @ApiProperty({ enum: PAYMENT_METHOD })
  @IsEnum(PAYMENT_METHOD)
  paymentMethod: string;

  @ApiProperty({ type: [CreateSaleItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSaleItemDto)
  items: CreateSaleItemDto[];

  @ApiPropertyOptional({ type: CardDetailDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => CardDetailDto)
  cardDetail?: CardDetailDto;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  date?: string;

  companyId: string;
  sellerId: string;
}
