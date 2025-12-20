import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { CashRegister } from './cash-register.entity';
import { User } from './user.entity';
import { Company } from './company.entity';
import { MOVEMENT_TYPE } from '../constants';

@Entity('cash_movements')
export class CashMovement extends BaseEntity {
  @Column({ name: 'sale_id', nullable: true })
  saleId: string;

  @Column({ name: 'cash_register_id' })
  cashRegisterId: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'company_id', nullable: true })
  companyId: string;

  @Column({
    type: 'enum',
    enum: MOVEMENT_TYPE,
  })
  type: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column()
  concept: string;

  @Column({ nullable: true })
  notes: string;

  @Column()
  date: Date;

  @ManyToOne(() => CashRegister)
  @JoinColumn({ name: 'cash_register_id' })
  cashRegister: CashRegister;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Company, { nullable: true })
  @JoinColumn({ name: 'company_id' })
  company: Company;
}
