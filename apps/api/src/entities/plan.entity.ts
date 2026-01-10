import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Subscription } from './subscription.entity';

@Entity('plans')
export class Plan extends BaseEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ nullable: true })
  description: string;

  @Column({ name: 'base_user_seats', default: 1 })
  baseUserSeats: number;

  @Column('jsonb', { default: {} })
  features: Record<string, unknown>;

  @Column({ default: false })
  popular: boolean;

  @Column({ name: 'feature_list', type: 'jsonb', default: [] })
  featureList: string[];

  @OneToMany(() => Subscription, (subscription) => subscription.plan)
  subscriptions: Subscription[];
}