import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Sale } from './sale.entity';
import { CARD_BRAND, CARD_TYPE } from '../constants';

@Entity('sale_card_details')
export class SaleCardDetail extends BaseEntity {
  @Column({ name: 'sale_id' })
  saleId: string;

  @Column({
    name: 'card_brand',
    type: 'enum',
    enum: CARD_BRAND,
  })
  cardBrand: string;

  @Column({
    name: 'card_type',
    type: 'enum',
    enum: CARD_TYPE,
  })
  cardType: string;

  @Column({ name: 'last_four_digits', length: 4 })
  lastFourDigits: string;

  @Column({ nullable: true })
  installments: number;

  @ManyToOne(() => Sale, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'sale_id' })
  sale: Sale;
}
