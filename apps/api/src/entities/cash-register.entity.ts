import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Company } from './company.entity';
import { User } from './user.entity';
import { Sale } from './sale.entity';
import { CASH_REGISTER_STATUS } from '@serviceflow/shared';

@Entity('cash_registers')
export class CashRegister extends BaseEntity {
  @Column({ name: 'company_id', nullable: true })
  companyId: string;

  @Column({ name: 'user_id', nullable: true })
  userId: string;

  @Column()
  name: string;

  @Column('decimal', { name: 'current_balance', precision: 10, scale: 2, default: 0 })
  currentBalance: number;

  @Column({
    type: 'enum',
    enum: CASH_REGISTER_STATUS,
    default: CASH_REGISTER_STATUS.CLOSED,
  })
  status: string;

  @Column({ name: 'opened_by', nullable: true })
  openedBy: string;

  @Column({ name: 'closed_by', nullable: true })
  closedBy: string;

  @Column({ name: 'open_time', nullable: true })
  openTime: Date;

  @Column({ name: 'close_time', nullable: true })
  closeTime: Date;

  @ManyToOne(() => Company, { nullable: true })
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'opened_by' })
  opener: User;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'closed_by' })
  closer: User;

  @OneToMany(() => Sale, (sale) => sale.cashRegister)
  sales: Sale[];
}