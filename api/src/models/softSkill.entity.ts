import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SoftSkill {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  image: string;
}
