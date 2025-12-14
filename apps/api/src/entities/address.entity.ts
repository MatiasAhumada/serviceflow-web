import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('addresses')
export class Address extends BaseEntity {
  @Column()
  street: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  state: string;

  @Column({ name: 'state_code', nullable: true })
  stateCode: string;

  @Column({ nullable: true })
  country: string;

  @Column({ name: 'country_code', nullable: true })
  countryCode: string;

  @Column({ name: 'postal_code', nullable: true })
  postalCode: string;

  @Column({ nullable: true })
  notes: string;
}
