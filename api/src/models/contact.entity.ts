import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Contact {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    linkedin: string

    @Column()
    mobile: number

    @Column()
    twitter: string

    @Column()
    github: string

    @Column()
    email: string

}