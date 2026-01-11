import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Company } from './company.entity';
import { User } from './user.entity';
import { Customer } from './customer.entity';
import { Sale } from './sale.entity';

@Entity('receipts')
export class Receipt extends BaseEntity {
  @Column({ name: 'company_id' })
  companyId: string;

  @Column({ name: 'sale_id' })
  saleId: string;

  @Column({ name: 'customer_id' })
  customerId: string;

  @Column({ name: 'seller_id' })
  sellerId: string;

  @Column({ name: 'technician_id', nullable: true })
  technicianId: string;

  @Column({ name: 'receipt_number', unique: true })
  receiptNumber: string;

  @Column()
  date: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  subtotal: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  discount: number;

  @Column('decimal', { precision: 10, scale: 2 })
  total: number;

  @Column({ name: 'payment_method' })
  paymentMethod: string;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @ManyToOne(() => Sale)
  @JoinColumn({ name: 'sale_id' })
  sale: Sale;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'seller_id' })
  seller: User;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'technician_id' })
  technician: User;
}
