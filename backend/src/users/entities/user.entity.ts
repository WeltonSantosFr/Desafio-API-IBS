import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Relation } from 'typeorm';
import { Address } from '../../address/entities/address.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  gender: string;

  @Column({type: 'date'})
  birthDate: Date;

  @Column()
  maritalStatus: string;

  @OneToMany(() => Address, address => address.user)
  addresses?: Relation<Address>;
}