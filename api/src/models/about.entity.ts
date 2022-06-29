import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class About {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({nullable: false})
    title: string

    @Column({nullable: false})
    description: string

    @Column({nullable: false})
    location: string

}