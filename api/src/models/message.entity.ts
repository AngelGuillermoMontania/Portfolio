import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Message {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    title: string

    @Column()
    body: string

    @Column()
    email: string

}