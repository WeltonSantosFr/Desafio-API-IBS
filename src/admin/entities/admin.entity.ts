import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';


@Entity()
export class Admin {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    fullName: string;

    @Column()
    jobTitle: string;

    @Column()
    phone: string;

    @CreateDateColumn()
    createdAt: Date;
}
