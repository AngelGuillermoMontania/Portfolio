import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Contact {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  linkedin: string;

  @Column()
  mobile: string;

  @Column()
  twitter: string;

  @Column()
  github: string;

  @Column()
  email: string;
}
