import {
  AllowNull,
  BelongsToMany,
  Column,
  DataType,
  Default,
  HasMany,
  IsUrl,
  Max,
  Min,
  Model,
  Table,
} from 'sequelize-typescript';
import { Image } from './image.model';
import { ProjectSkill } from './projectSkill.model';
import { ProjectTool } from './projectTool.model';
import { Skill } from './skill.model';
import { Tool } from './tool.model';

@Table({
  timestamps: false,
})
export class Project extends Model<Project> {

  @AllowNull(false)
  @Column
  name!: string;

  @AllowNull(false)
  @Column
  description: string;

  @Column(DataType.DATEONLY)
  init!: Date;

  @Column
  durationDays!: number;

  @AllowNull(false)
  @IsUrl
  @Column
  repositoryLink: string;

  @IsUrl
  @Column
  deployLink: string;

  @AllowNull(false)
  @Default(1)
  @Max(3)
  @Min(1)
  @Column
  relevance: number;

  @Column
  company: string;

  @HasMany(() => Image)
  images: Image[];

  @BelongsToMany(() => Skill, () => ProjectSkill)
  skills: Skill[]

  @BelongsToMany(() => Tool, () => ProjectTool)
  tools: Tool[]
}
