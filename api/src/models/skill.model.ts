import {
  AllowNull,
  BelongsToMany,
  Column,
  Model,
  Table,
} from 'sequelize-typescript';
import { Project } from './project.model';
import { ProjectSkill } from './projectSkill.model';

@Table({
  timestamps: false,
})
export class Skill extends Model<Skill> {

  @AllowNull(false)
  @Column
  name: string

  @AllowNull(false)
  @Column
  image: string

  @AllowNull(false)
  @Column
  nivel: string

  @BelongsToMany(() => Project, () => ProjectSkill)
  projects: Project[];
  
}