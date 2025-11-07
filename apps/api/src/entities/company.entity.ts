import { Entity, Column, OneToMany, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { Role } from './role.entity';
import { Subscription } from './subscription.entity';
import { SystemAdmin } from './system-admin.entity';

@Entity('companies')
export class Company extends BaseEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  cuit: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ name: 'owner_user_id', nullable: true })
  ownerUserId: string;

  @Column({ name: 'subscription_id', nullable: true })
  subscriptionId: string;

  @Column({ name: 'created_by', nullable: true })
  createdById: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'owner_user_id' })
  owner: User;

  @OneToOne(() => Subscription, { nullable: true })
  @JoinColumn({ name: 'subscription_id' })
  subscription: Subscription;

  @ManyToOne(() => SystemAdmin, (admin) => admin.companies, { nullable: true })
  @JoinColumn({ name: 'created_by' })
  createdBy: SystemAdmin;

  @OneToMany(() => User, (user) => user.company)
  users: User[];

  @OneToMany(() => Role, (role) => role.company)
  roles: Role[];
}