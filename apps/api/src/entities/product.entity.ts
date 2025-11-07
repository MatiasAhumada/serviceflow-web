import { Entity, Column, ManyToOne, JoinColumn, OneToMany, ManyToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Company } from './company.entity';
import { User } from './user.entity';
import { Supplier } from './supplier.entity';
import { SaleItem } from './sale-item.entity';

@Entity('products')
export class Product extends BaseEntity {
  @Column({ name: 'company_id', nullable: true })
  companyId: string;

  @Column({ name: 'user_id', nullable: true })
  userId: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  sku: string;

  @Column({ nullable: true })
  category: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  cost: number;

  @Column({ name: 'stock_quantity', default: 0 })
  stockQuantity: number;

  @Column({ name: 'reorder_level', nullable: true })
  reorderLevel: number;

  @ManyToOne(() => Company, { nullable: true })
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToMany(() => Supplier, (supplier) => supplier.products)
  suppliers: Supplier[];

  @OneToMany(() => SaleItem, (saleItem) => saleItem.product)
  saleItems: SaleItem[];
}