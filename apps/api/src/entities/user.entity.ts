import { Entity, Column, ManyToOne, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Company } from './company.entity';
import { Role } from './role.entity';
import { Subscription } from './subscription.entity';
import { PLAN_TYPE, USER_STATUS } from '@serviceflow/shared';

@Entity('users')
export class User extends BaseEntity {
  @Column({ name: 'company_id', nullable: true })
  companyId: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ name: 'password_hash' })
  passwordHash: string;

  @Column({ 
    name: 'plan_type',
    type: 'enum',
    enum: PLAN_TYPE,
  })
  planType: string;

  @Column({
    type: 'enum',
    enum: USER_STATUS,
    default: USER_STATUS.ACTIVE,
  })
  status: string;

  @Column({ name: 'role_id', nullable: true })
  roleId: string;

  @Column({ name: 'subscription_id', nullable: true })
  subscriptionId: string;

  @Column({ name: 'last_login', nullable: true })
  lastLogin: Date;

  @ManyToOne(() => Company, (company) => company.users, { nullable: true })
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @ManyToOne(() => Role, { nullable: true })
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @OneToOne(() => Subscription, { nullable: true })
  @JoinColumn({ name: 'subscription_id' })
  subscription: Subscription;

  @OneToMany(() => Company, (company) => company.owner)
  ownedCompanies: Company[];
}