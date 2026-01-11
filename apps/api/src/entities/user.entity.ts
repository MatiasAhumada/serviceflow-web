import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Company } from './company.entity';
import { Role } from './role.entity';
import { Subscription } from './subscription.entity';
import { UserType } from './user-type.entity';
import { USER_STATUS } from '../constants';

@Entity('users')
export class User extends BaseEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ name: 'password_hash' })
  passwordHash: string;

  @Column({
    type: 'enum',
    enum: USER_STATUS,
    default: USER_STATUS.ACTIVE,
  })
  status: string;

  @Column({ name: 'last_login', nullable: true })
  lastLogin: Date;

  @ManyToOne(() => Company, (company) => company.users, { nullable: true })
  company: Company;

  @ManyToOne(() => UserType, { eager: true })
  userType: UserType;

  @ManyToOne(() => Role, { nullable: true, eager: true })
  role: Role;

  @OneToOne(() => Subscription, { nullable: true })
  subscription: Subscription;

  @OneToMany(() => Company, (company) => company.owner)
  ownedCompanies: Company[];
}
