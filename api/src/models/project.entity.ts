import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Skill } from './skill.entity';
import { Tool } from './tool.entity';

export enum Relevance {
  low = '1',
  medium = '2',
  higth = '3',
}

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column('simple-array')
  image: string[];

  @Column({ nullable: true })
  init: Date;

  @Column({ nullable: true })
  durationDays: number;

  @Column()
  repositoryLink: string;

  @Column({ nullable: true })
  deployLink: string;

  @Column({
    type: 'enum',
    enum: Relevance,
    default: Relevance.low,
  })
  relevance: Relevance;

  @Column({ nullable: true })
  company: string;

  @Column({
    default: true,
  })
  isActive: boolean;

  @ManyToMany(() => Skill, (skill) => skill.projects)
  @JoinTable()
  skills: Skill[];

  @ManyToMany(() => Tool, (tool) => tool.projects)
  @JoinTable()
  tools: Tool[];
}
