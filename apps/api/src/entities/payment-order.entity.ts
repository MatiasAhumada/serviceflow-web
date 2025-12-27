import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Company } from './company.entity';
import { Sale } from './sale.entity';
import { User } from './user.entity';
import { CashRegister } from './cash-register.entity';

@Entity('payment_orders')
export class PaymentOrder extends BaseEntity {
  @Column({ name: 'company_id' })
  companyId: string;

  @Column({ name: 'sale_id' })
  saleId: string;

  @Column({ name: 'cashier_id', nullable: true })
  cashierId: string;

  @Column({ name: 'cash_register_id', nullable: true })
  cashRegisterId: string;

  @Column({ name: 'order_number', unique: true })
  orderNumber: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column({
    type: 'enum',
    enum: ['pending', 'completed', 'cancelled'],
    default: 'pending',
  })
  status: string;

  @Column({ name: 'completed_at', nullable: true })
  completedAt: Date;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @ManyToOne(() => Sale)
  @JoinColumn({ name: 'sale_id' })
  sale: Sale;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'cashier_id' })
  cashier: User;

  @ManyToOne(() => CashRegister, { nullable: true })
  @JoinColumn({ name: 'cash_register_id' })
  cashRegister: CashRegister;
}
