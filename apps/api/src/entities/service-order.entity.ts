import { Entity, Column, ManyToOne, JoinColumn, OneToMany, OneToOne, Index } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Company } from './company.entity';
import { User } from './user.entity';
import { Customer } from './customer.entity';
import { ServiceItem } from './service-item.entity';
import { Warranty } from './warranty.entity';
import { SERVICE_STATUS, PAYMENT_STATUS } from '@serviceflow/shared';

@Entity('service_orders')
@Index(['companyId', 'serviceNumber'], { unique: true })
export class ServiceOrder extends BaseEntity {
  @Column({ name: 'company_id', nullable: true })
  companyId: string;

  @Column({ name: 'user_id', nullable: true })
  userId: string;

  @Column({ name: 'customer_id' })
  customerId: string;

  @Column({ name: 'technician_id' })
  technicianId: string;

  @Column({ name: 'service_number' })
  serviceNumber: string;

  @Column({
    type: 'enum',
    enum: SERVICE_STATUS,
    default: SERVICE_STATUS.RECEIVED,
  })
  status: string;

  @Column({ name: 'entry_date' })
  entryDate: Date;

  @Column({ name: 'expected_delivery', nullable: true })
  expectedDelivery: Date;

  @Column({ name: 'delivery_date', nullable: true })
  deliveryDate: Date;

  @Column('decimal', { name: 'total_cost', precision: 10, scale: 2, nullable: true })
  totalCost: number;

  @Column({
    name: 'payment_status',
    type: 'enum',
    enum: PAYMENT_STATUS,
    nullable: true,
  })
  paymentStatus: string;

  @Column({ nullable: true })
  notes: string;

  @ManyToOne(() => Company, { nullable: true })
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'technician_id' })
  technician: User;

  @OneToMany(() => ServiceItem, (serviceItem) => serviceItem.serviceOrder, { cascade: true })
  items: ServiceItem[];

  @OneToOne(() => Warranty, (warranty) => warranty.serviceOrder, { cascade: true })
  warranty: Warranty;
}