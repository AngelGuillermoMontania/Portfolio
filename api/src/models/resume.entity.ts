import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Resume {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    spanish: string

    @Column()
    english: string

}