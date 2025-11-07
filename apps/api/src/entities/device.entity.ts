import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Customer } from './customer.entity';

@Entity('devices')
export class Device extends BaseEntity {
  @Column({ name: 'customer_id' })
  customerId: string;

  @Column({ nullable: true })
  brand: string;

  @Column({ nullable: true })
  model: string;

  @Column({ name: 'serial_number', nullable: true })
  serialNumber: string;

  @Column({ nullable: true })
  type: string;

  @Column({ nullable: true })
  notes: string;

  @ManyToOne(() => Customer, (customer) => customer.devices)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;
}