import { Entity, Column, ManyToOne, JoinColumn, OneToMany, Index } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Company } from './company.entity';
import { User } from './user.entity';
import { Customer } from './customer.entity';
import { CashRegister } from './cash-register.entity';
import { SaleItem } from './sale-item.entity';
import { SALE_STATUS, PAYMENT_METHOD } from '@serviceflow/shared';

@Entity('sales')
@Index(['companyId', 'saleNumber'], { unique: true })
export class Sale extends BaseEntity {
  @Column({ name: 'company_id', nullable: true })
  companyId: string;

  @Column({ name: 'user_id', nullable: true })
  userId: string;

  @Column({ name: 'customer_id' })
  customerId: string;

  @Column({ name: 'seller_id' })
  sellerId: string;

  @Column({ name: 'cash_register_id', nullable: true })
  cashRegisterId: string;

  @Column({ name: 'sale_number' })
  saleNumber: string;

  @Column()
  date: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  total: number;

  @Column({
    name: 'payment_method',
    type: 'enum',
    enum: PAYMENT_METHOD,
  })
  paymentMethod: string;

  @Column({
    type: 'enum',
    enum: SALE_STATUS,
    default: SALE_STATUS.PENDING,
  })
  status: string;

  @ManyToOne(() => Company, { nullable: true })
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'seller_id' })
  seller: User;

  @ManyToOne(() => CashRegister, (cashRegister) => cashRegister.sales, { nullable: true })
  @JoinColumn({ name: 'cash_register_id' })
  cashRegister: CashRegister;

  @OneToMany(() => SaleItem, (saleItem) => saleItem.sale, { cascade: true })
  items: SaleItem[];
}