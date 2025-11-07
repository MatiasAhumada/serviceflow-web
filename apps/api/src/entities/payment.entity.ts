import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Subscription } from './subscription.entity';
import { PAYMENT_STATUS, PAYMENT_METHOD } from '@serviceflow/shared';

@Entity('payments')
export class Payment extends BaseEntity {
  @Column({ name: 'subscription_id' })
  subscriptionId: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column({ default: 'ARS' })
  currency: string;

  @Column({
    type: 'enum',
    enum: PAYMENT_METHOD,
  })
  method: string;

  @Column({
    type: 'enum',
    enum: PAYMENT_STATUS,
    default: PAYMENT_STATUS.PENDING,
  })
  status: string;

  @Column({ name: 'paid_at', nullable: true })
  paidAt: Date;

  @ManyToOne(() => Subscription, (subscription) => subscription.payments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'subscription_id' })
  subscription: Subscription;
}