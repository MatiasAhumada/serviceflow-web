import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Subscription } from './subscription.entity';

@Entity('subscription_seats')
export class SubscriptionSeat extends BaseEntity {
  @Column({ name: 'subscription_id' })
  subscriptionId: string;

  @Column({ name: 'role_name' })
  roleName: string;

  @Column()
  quantity: number;

  @Column('decimal', { name: 'price_per_seat', precision: 10, scale: 2 })
  pricePerSeat: number;

  @ManyToOne(() => Subscription, (subscription) => subscription.seats, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'subscription_id' })
  subscription: Subscription;
}