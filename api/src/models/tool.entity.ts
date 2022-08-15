import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Project } from './project.entity';

@Entity()
export class Tool {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  image: string;

  @Column()
  level: string;

  @ManyToMany(() => Project, (project) => project.skills)
  projects: Project[];
}
