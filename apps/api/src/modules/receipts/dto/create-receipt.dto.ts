import { IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateReceiptDto {
  @ApiProperty()
  @IsString()
  saleId: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  technicianId?: string;

  companyId: string;
}
