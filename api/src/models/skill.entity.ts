import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Project } from './project.entity';

@Entity()
export class Skill {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string

  @Column("simple-array")
  image: string[]

  @Column()
  nivel: string

  @ManyToMany(() => Project, (project) => project.skills)
  projects: Project[]
  
}