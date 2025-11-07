import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ServiceOrder } from './service-order.entity';

@Entity('warranties')
export class Warranty extends BaseEntity {
  @Column({ name: 'service_order_id' })
  serviceOrderId: string;

  @Column({ name: 'warranty_period_days' })
  warrantyPeriodDays: number;

  @Column({ name: 'start_date' })
  startDate: Date;

  @Column({ name: 'end_date' })
  endDate: Date;

  @Column({ nullable: true })
  notes: string;

  @OneToOne(() => ServiceOrder, (serviceOrder) => serviceOrder.warranty, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'service_order_id' })
  serviceOrder: ServiceOrder;
}