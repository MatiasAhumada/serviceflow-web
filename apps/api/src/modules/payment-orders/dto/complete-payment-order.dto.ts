import { IsString, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CompletePaymentOrderDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  cashRegisterId?: string;
}
