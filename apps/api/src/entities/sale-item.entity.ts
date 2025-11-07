import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Sale } from './sale.entity';
import { Product } from './product.entity';

@Entity('sale_items')
export class SaleItem extends BaseEntity {
  @Column({ name: 'sale_id' })
  saleId: string;

  @Column({ name: 'product_id' })
  productId: string;

  @Column()
  quantity: number;

  @Column('decimal', { name: 'unit_price', precision: 10, scale: 2 })
  unitPrice: number;

  @Column('decimal', { precision: 10, scale: 2 })
  subtotal: number;

  @ManyToOne(() => Sale, (sale) => sale.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'sale_id' })
  sale: Sale;

  @ManyToOne(() => Product, (product) => product.saleItems)
  @JoinColumn({ name: 'product_id' })
  product: Product;
}