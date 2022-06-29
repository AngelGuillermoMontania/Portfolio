import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Reference {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    link: string

    @Column()
    name: string

    @Column()
    message: string

    @Column()
    image: string

}