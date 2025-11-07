import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ServiceOrder } from './service-order.entity';

@Entity('service_items')
export class ServiceItem extends BaseEntity {
  @Column({ name: 'service_order_id' })
  serviceOrderId: string;

  @Column()
  description: string;

  @Column('decimal', { name: 'labor_cost', precision: 10, scale: 2, nullable: true })
  laborCost: number;

  @Column('decimal', { name: 'part_cost', precision: 10, scale: 2, nullable: true })
  partCost: number;

  @Column('decimal', { precision: 10, scale: 2 })
  total: number;

  @ManyToOne(() => ServiceOrder, (serviceOrder) => serviceOrder.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'service_order_id' })
  serviceOrder: ServiceOrder;
}