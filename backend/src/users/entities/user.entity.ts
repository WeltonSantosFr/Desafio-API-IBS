import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Relation, CreateDateColumn, UpdateDateColumn } from 'typeorm';
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

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @OneToMany(() => Address, address => address.user)
  addresses?: Relation<Address>;
}