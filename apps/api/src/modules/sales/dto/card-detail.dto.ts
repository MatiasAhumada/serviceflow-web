import {
  IsString,
  IsEnum,
  IsOptional,
  IsNumber,
  Min,
  Max,
  Length,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CARD_BRAND, CARD_TYPE } from '../../../constants';

export class CardDetailDto {
  @ApiProperty({ enum: CARD_BRAND })
  @IsEnum(CARD_BRAND)
  cardBrand: string;

  @ApiProperty({ enum: CARD_TYPE })
  @IsEnum(CARD_TYPE)
  cardType: string;

  @ApiProperty()
  @IsString()
  @Length(4, 4)
  lastFourDigits: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(12)
  installments?: number;
}
