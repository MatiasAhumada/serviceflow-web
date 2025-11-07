import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Company } from './company.entity';
import { Subscription } from './subscription.entity';

@Entity('system_admin')
export class SystemAdmin extends BaseEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @OneToMany(() => Company, (company) => company.createdBy)
  companies: Company[];

  @OneToMany(() => Subscription, (subscription) => subscription.createdBy)
  subscriptions: Subscription[];
}