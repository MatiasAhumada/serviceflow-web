import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Plan } from './plan.entity';
import { Company } from './company.entity';
import { User } from './user.entity';
import { SystemAdmin } from './system-admin.entity';
import { SubscriptionSeat } from './subscription-seat.entity';
import { Payment } from './payment.entity';
import { SUBSCRIPTION_STATUS, SUBSCRIBER_TYPE } from '@serviceflow/shared';

@Entity('subscriptions')
export class Subscription extends BaseEntity {
  @Column({
    name: 'subscriber_type',
    type: 'enum',
    enum: SUBSCRIBER_TYPE,
  })
  subscriberType: string;

  @Column({ name: 'company_id', nullable: true })
  companyId: string;

  @Column({ name: 'user_id', nullable: true })
  userId: string;

  @Column({ name: 'plan_id' })
  planId: string;

  @Column({ name: 'start_date' })
  startDate: Date;

  @Column({ name: 'end_date' })
  endDate: Date;

  @Column({
    type: 'enum',
    enum: SUBSCRIPTION_STATUS,
    default: SUBSCRIPTION_STATUS.ACTIVE,
  })
  status: string;

  @Column({ name: 'auto_renew', default: true })
  autoRenew: boolean;

  @Column({ name: 'created_by' })
  createdById: string;

  @ManyToOne(() => Plan, (plan) => plan.subscriptions)
  @JoinColumn({ name: 'plan_id' })
  plan: Plan;

  @ManyToOne(() => Company, { nullable: true })
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => SystemAdmin, (admin) => admin.subscriptions)
  @JoinColumn({ name: 'created_by' })
  createdBy: SystemAdmin;

  @OneToMany(() => SubscriptionSeat, (seat) => seat.subscription)
  seats: SubscriptionSeat[];

  @OneToMany(() => Payment, (payment) => payment.subscription)
  payments: Payment[];
}