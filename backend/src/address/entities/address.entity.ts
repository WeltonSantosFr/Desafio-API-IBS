import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Relation, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Address {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  cep: string;

  @Column()
  address: string;

  @Column()
  number: string;

  @Column({nullable:true})
  complement: string;

  @Column()
  district: string;

  @Column()
  state: string;

  @Column()
  city: string;

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @ManyToOne(() => User, user => user.addresses)
  user: Relation<User>;

}