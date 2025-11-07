import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Company } from './company.entity';
import { User } from './user.entity';
import { Sale } from './sale.entity';
import { ServiceOrder } from './service-order.entity';
import { Device } from './device.entity';

@Entity('customers')
export class Customer extends BaseEntity {
  @Column({ name: 'company_id', nullable: true })
  companyId: string;

  @Column({ name: 'user_id', nullable: true })
  userId: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  notes: string;

  @ManyToOne(() => Company, { nullable: true })
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Sale, (sale) => sale.customer)
  sales: Sale[];

  @OneToMany(() => ServiceOrder, (serviceOrder) => serviceOrder.customer)
  serviceOrders: ServiceOrder[];

  @OneToMany(() => Device, (device) => device.customer)
  devices: Device[];
}